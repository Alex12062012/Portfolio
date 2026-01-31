// État du jeu
let gameState = {
    player: {
        username: '',
        email: '',
        money: 1000,
        portfolio: {}, // { companyId: quantity }
        hasAccount: false
    },
    day: 1,
    startDate: new Date(2026, 0, 31), // 31 janvier 2026
    stockPrices: {},
    stockHistory: {}, // Historique des prix pour graphiques
    events: [],
    articles: {
        fmtv: [],
        razed: [],
        z: []
    },
    topInvestors: [],
    selectedStock: null,
    gameTime: null, // Intervalle pour le temps du jeu
    playerInTopThree: false,
    playerMentionedAt: null // Premier seuil atteint
};

// Initialisation du jeu
function initGame() {
    // Animation d'intro
    setTimeout(() => {
        const introScreen = document.getElementById('intro-screen');
        introScreen.classList.add('fade-out');
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            
            // Charger l'état du jeu après l'intro
            loadGameState();
            initStockPrices();
            initTopInvestors();
            updateHUD();
            
            // Navigation
            document.querySelectorAll('.service-circle').forEach(circle => {
                circle.addEventListener('click', () => {
                    const service = circle.getAttribute('data-service');
                    navigateToService(service);
                });
            });
            
            // Marquer que le joueur a un compte (pas besoin d'email)
            if (!gameState.player.hasAccount) {
                gameState.player.hasAccount = true;
                gameState.player.username = 'Investisseur';
                saveGameState();
            }
            
            // Démarrer le temps du jeu
            startGameTime();
        }, 1000);
    }, 3000); // L'intro dure 3 secondes
}

// Initialiser les prix des actions
function initStockPrices() {
    COMPANIES.forEach(company => {
        if (!gameState.stockPrices[company.id]) {
            gameState.stockPrices[company.id] = {
                current: company.basePrice,
                change: 0,
                changePercent: 0,
                history: [company.basePrice]
            };
        }
    });
}

// Initialiser le classement des investisseurs
function initTopInvestors() {
    if (gameState.topInvestors.length === 0) {
        gameState.topInvestors = TOP_INVESTORS.map(investor => ({
            ...investor,
            money: investor.startingMoney
        }));
    }
}

// Système de temps (1 jour = 1 minute)
function startGameTime() {
    if (gameState.gameTime) clearInterval(gameState.gameTime);
    
    gameState.gameTime = setInterval(() => {
        gameState.day++;
        updateHUD();
        
        // Fluctuations boursières quotidiennes
        updateStockPrices();
        
        // Événements médiatiques
        if (Math.random() < 0.7) { // 70% de chance d'événement
            generateRandomEvent();
        }
        
        // Posts Z
        if (Math.random() < 0.8) {
            generateZPost();
        }
        
        // Articles FMTV (tous les 3-4 jours)
        if (gameState.day % 3 === 0 || gameState.day % 4 === 0) {
            generateFMTVArticle();
        }
        
        // Mise à jour du classement (toutes les semaines)
        if (gameState.day % 7 === 0) {
            updateTopInvestors();
        }
        
        // Vérifier les seuils du joueur
        checkPlayerMilestones();
        
        saveGameState();
    }, 60000); // 60 secondes = 1 minute
}

// Mettre à jour le HUD
function updateHUD() {
    document.getElementById('game-day').textContent = gameState.day;
    
    const currentDate = new Date(gameState.startDate);
    currentDate.setDate(currentDate.getDate() + gameState.day - 1);
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('game-date').textContent = currentDate.toLocaleDateString('fr-FR', options);
    
    document.getElementById('player-money').textContent = Math.floor(gameState.player.money);
}

// Fluctuations boursières automatiques
function updateStockPrices() {
    COMPANIES.forEach(company => {
        const stockData = gameState.stockPrices[company.id];
        
        // Fluctuation aléatoire de base (-3% à +3%)
        const baseChange = (Math.random() * 6 - 3) / 100;
        const newPrice = stockData.current * (1 + baseChange);
        
        const priceChange = newPrice - stockData.current;
        const percentChange = (priceChange / stockData.current) * 100;
        
        gameState.stockPrices[company.id] = {
            current: newPrice,
            change: priceChange,
            changePercent: percentChange,
            history: [...stockData.history.slice(-29), newPrice] // Garder 30 jours
        };
    });
    
    // Rafraîchir l'affichage si on est sur la bourse
    if (document.getElementById('bourse-screen').classList.contains('active')) {
        displayStocksList();
        if (gameState.selectedStock) {
            displayStockDetails(gameState.selectedStock);
        }
    }
}

// Générer un événement aléatoire (Razed)
function generateRandomEvent() {
    const randomCompany = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
    const templates = EVENT_TEMPLATES[randomCompany.sector];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const event = {
        title: template.title.replace('{company}', randomCompany.name),
        company: randomCompany,
        impact: template.impact,
        type: template.type,
        day: gameState.day
    };
    
    // Appliquer l'impact sur l'action
    applyEventImpact(randomCompany.id, template.impact);
    
    // Ajouter l'article Razed
    gameState.articles.razed.unshift({
        title: event.title,
        content: `Selon nos sources, ${randomCompany.name} fait face à cette situation. Les investisseurs suivent de près l'évolution de la situation.`,
        day: gameState.day,
        company: randomCompany.name
    });
    
    // Limiter à 20 articles
    if (gameState.articles.razed.length > 20) {
        gameState.articles.razed = gameState.articles.razed.slice(0, 20);
    }
    
    // Rafraîchir l'affichage si on est sur Razed
    if (document.getElementById('razed-screen').classList.contains('active')) {
        displayRazedArticles();
    }
}

// Appliquer l'impact d'un événement sur une action
function applyEventImpact(companyId, impact) {
    const stockData = gameState.stockPrices[companyId];
    const impactPercent = (Math.random() * (impact.max - impact.min) + impact.min) / 100;
    const newPrice = stockData.current * (1 + impactPercent);
    
    const priceChange = newPrice - stockData.current;
    const percentChange = (priceChange / stockData.current) * 100;
    
    gameState.stockPrices[companyId] = {
        current: newPrice,
        change: priceChange,
        changePercent: percentChange,
        history: [...stockData.history.slice(-29), newPrice]
    };
}

// Générer un post Z
function generateZPost() {
    const templates = [
        'Apparemment {company} prépare un truc de fou pour 2026 👀 #leak',
        '{company} to the moon 🚀🚀🚀',
        'Quelqu\'un a vu les derniers chiffres de {company} ? 📊',
        'Je vends tout mon {company}, cette boîte va couler',
        '{company} c\'est fini, vendez tout 💀',
        'Hot take : {company} va dominer le secteur {sector}',
        'Pourquoi personne parle de {company} ? Sous-évalué selon moi',
        'Le PDG de {company} a l\'air louche nan ? 🤔'
    ];
    
    const randomCompany = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const author = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
    
    const post = template
        .replace('{company}', randomCompany.name)
        .replace('{sector}', randomCompany.sector);
    
    gameState.articles.z.unshift({
        author: author,
        content: post,
        day: gameState.day
    });
    
    // Impact léger sur l'action (+/- 3-8%)
    if (post.includes('moon') || post.includes('prépare un truc de fou')) {
        applyEventImpact(randomCompany.id, { min: 3, max: 8 });
    } else if (post.includes('couler') || post.includes('c\'est fini')) {
        applyEventImpact(randomCompany.id, { min: -8, max: -3 });
    }
    
    // Limiter à 30 posts
    if (gameState.articles.z.length > 30) {
        gameState.articles.z = gameState.articles.z.slice(0, 30);
    }
    
    // Rafraîchir l'affichage si on est sur Z
    if (document.getElementById('social-screen').classList.contains('active')) {
        displayZFeed();
    }
}

// Générer un article FMTV
function generateFMTVArticle() {
    const types = ['ranking', 'advice', 'portfolio'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let article = {};
    
    if (type === 'ranking') {
        // Classement des investisseurs
        const topThree = [...gameState.topInvestors]
            .sort((a, b) => b.money - a.money)
            .slice(0, 3);
        
        article = {
            title: 'Top 3 des investisseurs du mois',
            content: `Voici notre classement des meilleurs investisseurs :\n\n1. ${topThree[0].name} - ${Math.floor(topThree[0].money)}€\n2. ${topThree[1].name} - ${Math.floor(topThree[1].money)}€\n3. ${topThree[2].name} - ${Math.floor(topThree[2].money)}€`,
            day: gameState.day
        };
    } else if (type === 'advice') {
        // Conseils (parfois faux)
        const sectors = Object.values(SECTORS);
        const sector = sectors[Math.floor(Math.random() * sectors.length)];
        const isGoodAdvice = Math.random() < 0.4; // 40% de bons conseils
        
        if (isGoodAdvice) {
            article = {
                title: `Nos experts recommandent d'investir dans ${sector}`,
                content: `Selon nos analystes financiers, le secteur ${sector} montre des signes de croissance prometteuse. C'est le moment d'investir.`,
                day: gameState.day
            };
            
            // Boost léger du secteur
            COMPANIES.filter(c => c.sector === sector).forEach(company => {
                applyEventImpact(company.id, { min: 5, max: 12 });
            });
        } else {
            article = {
                title: `Le secteur ${sector} est surévalué, attention`,
                content: `Nos experts alertent sur une possible bulle dans le secteur ${sector}. Nous recommandons la prudence.`,
                day: gameState.day
            };
            
            // Impact négatif léger (mais peut être faux)
            COMPANIES.filter(c => c.sector === sector).forEach(company => {
                applyEventImpact(company.id, { min: -8, max: -3 });
            });
        }
    } else {
        // Analyse de portefeuille générique
        article = {
            title: 'Comment diversifier son portefeuille ?',
            content: 'Nos experts financiers recommandent de ne jamais mettre tous ses œufs dans le même panier. La diversification est la clé du succès en bourse.',
            day: gameState.day
        };
    }
    
    gameState.articles.fmtv.unshift(article);
    
    // Limiter à 15 articles
    if (gameState.articles.fmtv.length > 15) {
        gameState.articles.fmtv = gameState.articles.fmtv.slice(0, 15);
    }
    
    // Rafraîchir l'affichage si on est sur FMTV
    if (document.getElementById('fmtv-screen').classList.contains('active')) {
        displayFMTVArticles();
    }
}

// Vérifier les jalons du joueur
function checkPlayerMilestones() {
    // Premier article à 10 000€
    if (gameState.player.money >= 10000 && !gameState.playerMentionedAt) {
        gameState.playerMentionedAt = 10000;
        
        gameState.articles.fmtv.unshift({
            title: `Jeune prodige de la finance : ${gameState.player.username} impressionne`,
            content: `${gameState.player.username} vient de franchir la barre des 10 000€ avec un portefeuille diversifié. Les analystes suivent de près cette ascension fulgurante.`,
            day: gameState.day,
            playerMention: true
        });
    }
    
    // Entrée dans le top 3
    const allInvestors = [
        ...gameState.topInvestors,
        { name: gameState.player.username, money: gameState.player.money, isPlayer: true }
    ].sort((a, b) => b.money - a.money);
    
    const playerRank = allInvestors.findIndex(inv => inv.isPlayer);
    
    if (playerRank < 3 && !gameState.playerInTopThree) {
        gameState.playerInTopThree = true;
        
        gameState.articles.fmtv.unshift({
            title: `Nouveau venu dans le top 3 ! ${gameState.player.username} bouleverse le classement`,
            content: `${gameState.player.username} vient d'entrer dans notre classement des meilleurs investisseurs avec un capital de ${Math.floor(gameState.player.money)}€. Une performance remarquable !`,
            day: gameState.day,
            playerMention: true
        });
    } else if (playerRank >= 3 && gameState.playerInTopThree) {
        gameState.playerInTopThree = false;
    }
}

// Mise à jour des NPCs (fluctuation de ±5-10%)
function updateTopInvestors() {
    gameState.topInvestors = gameState.topInvestors.map(investor => {
        const change = (Math.random() * 15 - 5) / 100; // -5% à +10%
        return {
            ...investor,
            money: Math.max(1000, investor.money * (1 + change))
        };
    });
}

// Navigation
function navigateToService(service) {
    switch(service) {
        case 'social':
            showScreen('social-screen');
            displayZFeed();
            break;
        case 'bourse':
            showScreen('bourse-screen');
            displayStocksList();
            break;
        case 'fmtv':
            showScreen('fmtv-screen');
            displayFMTVArticles();
            break;
        case 'razed':
            showScreen('razed-screen');
            displayRazedArticles();
            break;
        case 'credits':
            showScreen('credits-screen');
            break;
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goToHome() {
    showScreen('gogol-home');
}

// Affichage de la bourse
function displayStocksList() {
    const container = document.getElementById('stocks-container');
    container.innerHTML = '';
    
    COMPANIES.forEach(company => {
        const stockData = gameState.stockPrices[company.id];
        const isSelected = gameState.selectedStock === company.id;
        
        const stockItem = document.createElement('div');
        stockItem.className = `stock-item ${isSelected ? 'selected' : ''}`;
        stockItem.onclick = () => selectStock(company.id);
        
        const changeClass = stockData.changePercent >= 0 ? 'positive' : 'negative';
        const changeSymbol = stockData.changePercent >= 0 ? '+' : '';
        
        stockItem.innerHTML = `
            <div class="stock-name">${company.name}</div>
            <div class="stock-sector">${company.sector}</div>
            <div class="stock-price">
                ${stockData.current.toFixed(2)}€
                <span class="stock-change ${changeClass}">
                    ${changeSymbol}${stockData.changePercent.toFixed(2)}%
                </span>
            </div>
        `;
        
        container.appendChild(stockItem);
    });
    
    updatePortfolioDisplay();
}

function selectStock(companyId) {
    gameState.selectedStock = companyId;
    displayStocksList();
    displayStockDetails(companyId);
}

function displayStockDetails(companyId) {
    const company = COMPANIES.find(c => c.id === companyId);
    const stockData = gameState.stockPrices[companyId];
    const detailsContainer = document.getElementById('stock-details');
    
    const changeClass = stockData.changePercent >= 0 ? 'positive' : 'negative';
    const changeSymbol = stockData.changePercent >= 0 ? '+' : '';
    
    detailsContainer.innerHTML = `
        <div class="stock-detail-header">
            <div class="stock-detail-name">${company.name}</div>
            <div class="stock-detail-info">
                <strong>Secteur:</strong> ${company.sector}<br>
                <strong>PDG:</strong> ${company.ceo}<br>
                <strong>Description:</strong> ${company.description}
            </div>
        </div>
        
        <div style="margin: 1.5rem 0;">
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-success);">
                ${stockData.current.toFixed(2)}€
            </div>
            <div style="font-size: 1.2rem; color: var(--${changeClass === 'positive' ? 'accent-success' : 'accent-danger'});">
                ${changeSymbol}${stockData.change.toFixed(2)}€ (${changeSymbol}${stockData.changePercent.toFixed(2)}%)
            </div>
        </div>
        
        <div class="stock-chart">
            <canvas id="price-chart"></canvas>
        </div>
        
        <div class="stock-actions">
            <input type="number" id="quantity-input" placeholder="Quantité" min="1" value="1">
            <button class="btn-buy" onclick="buyStock(${companyId})">Acheter</button>
            <button class="btn-sell" onclick="sellStock(${companyId})">Vendre</button>
        </div>
    `;
    
    // Dessiner le graphique simple
    drawPriceChart(stockData.history);
}

function drawPriceChart(history) {
    const canvas = document.getElementById('price-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth - 32;
    canvas.height = 230;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Fond blanc
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, width, height);
    
    // Grille
    ctx.strokeStyle = '#e8e8e8';
    ctx.lineWidth = 1;
    
    // Lignes horizontales
    for (let i = 0; i <= 5; i++) {
        const y = padding + (i / 5) * (height - 2 * padding);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Lignes verticales
    for (let i = 0; i <= 6; i++) {
        const x = padding + (i / 6) * (width - 2 * padding);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
    
    // Trouver min/max
    const minPrice = Math.min(...history);
    const maxPrice = Math.max(...history);
    const priceRange = maxPrice - minPrice || 1;
    
    // Déterminer la couleur (vert si hausse, rouge si baisse)
    const firstPrice = history[0];
    const lastPrice = history[history.length - 1];
    const isPositive = lastPrice >= firstPrice;
    const lineColor = isPositive ? '#00C853' : '#D32F2F';
    const fillColor = isPositive ? 'rgba(0, 200, 83, 0.1)' : 'rgba(211, 47, 47, 0.1)';
    
    // Dessiner la ligne
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    
    history.forEach((price, index) => {
        const x = padding + (index / (history.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Remplissage sous la courbe
    const lastX = padding + (width - 2 * padding);
    const baselineY = height - padding;
    ctx.lineTo(lastX, baselineY);
    ctx.lineTo(padding, baselineY);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    // Afficher les valeurs min/max
    ctx.font = '11px JetBrains Mono';
    ctx.fillStyle = '#757575';
    ctx.textAlign = 'right';
    ctx.fillText(maxPrice.toFixed(2) + '€', padding - 5, padding + 5);
    ctx.fillText(minPrice.toFixed(2) + '€', padding - 5, height - padding + 5);
}

function buyStock(companyId) {
    const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
    const stockData = gameState.stockPrices[companyId];
    const totalCost = stockData.current * quantity;
    
    if (totalCost > gameState.player.money) {
        alert('Fonds insuffisants !');
        return;
    }
    
    gameState.player.money -= totalCost;
    
    if (!gameState.player.portfolio[companyId]) {
        gameState.player.portfolio[companyId] = 0;
    }
    gameState.player.portfolio[companyId] += quantity;
    
    updateHUD();
    updatePortfolioDisplay();
    saveGameState();
    
    alert(`Vous avez acheté ${quantity} action(s) pour ${totalCost.toFixed(2)}€`);
}

function sellStock(companyId) {
    const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
    const owned = gameState.player.portfolio[companyId] || 0;
    
    if (owned < quantity) {
        alert('Vous ne possédez pas assez d\'actions !');
        return;
    }
    
    const stockData = gameState.stockPrices[companyId];
    const totalRevenue = stockData.current * quantity;
    
    gameState.player.money += totalRevenue;
    gameState.player.portfolio[companyId] -= quantity;
    
    if (gameState.player.portfolio[companyId] === 0) {
        delete gameState.player.portfolio[companyId];
    }
    
    updateHUD();
    updatePortfolioDisplay();
    saveGameState();
    
    alert(`Vous avez vendu ${quantity} action(s) pour ${totalRevenue.toFixed(2)}€`);
}

function updatePortfolioDisplay() {
    const container = document.getElementById('portfolio-container');
    container.innerHTML = '';
    
    const portfolioEntries = Object.entries(gameState.player.portfolio);
    
    if (portfolioEntries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Aucune action détenue</p>';
        return;
    }
    
    let totalValue = 0;
    
    portfolioEntries.forEach(([companyId, quantity]) => {
        const company = COMPANIES.find(c => c.id === parseInt(companyId));
        const stockData = gameState.stockPrices[companyId];
        const value = stockData.current * quantity;
        totalValue += value;
        
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.innerHTML = `
            <div class="portfolio-stock-name">${company.name}</div>
            <div class="portfolio-quantity">${quantity} action(s)</div>
            <div class="portfolio-value" style="color: var(--accent-success);">${value.toFixed(2)}€</div>
        `;
        
        container.appendChild(item);
    });
    
    // Total
    const totalItem = document.createElement('div');
    totalItem.className = 'portfolio-item';
    totalItem.style.borderTop = '2px solid var(--border-color)';
    totalItem.style.marginTop = '1rem';
    totalItem.style.paddingTop = '1rem';
    totalItem.innerHTML = `
        <div class="portfolio-stock-name" style="font-weight: 700;">Valeur totale</div>
        <div class="portfolio-value" style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">${totalValue.toFixed(2)}€</div>
    `;
    
    container.appendChild(totalItem);
}

// Affichage des médias
function displayFMTVArticles() {
    const container = document.getElementById('fmtv-articles');
    container.innerHTML = '';
    
    if (gameState.articles.fmtv.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Aucun article pour le moment.</p>';
        return;
    }
    
    gameState.articles.fmtv.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        
        const highlightStyle = article.playerMention ? 'style="border-color: var(--accent-secondary);"' : '';
        articleDiv.setAttribute('style', article.playerMention ? 'border-color: var(--accent-secondary);' : '');
        
        articleDiv.innerHTML = `
            <div class="article-header">
                <div class="article-date">Jour ${article.day}</div>
            </div>
            <div class="article-title">${article.title}</div>
            <div class="article-content">${article.content.replace(/\n/g, '<br>')}</div>
        `;
        
        container.appendChild(articleDiv);
    });
}

function displayRazedArticles() {
    const container = document.getElementById('razed-articles');
    container.innerHTML = '';
    
    if (gameState.articles.razed.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Aucun fait divers pour le moment.</p>';
        return;
    }
    
    gameState.articles.razed.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        articleDiv.innerHTML = `
            <div class="article-header">
                <div class="article-date">Jour ${article.day}</div>
            </div>
            <div class="article-title">${article.title}</div>
            <div class="article-content">${article.content}</div>
        `;
        
        container.appendChild(articleDiv);
    });
}

function displayZFeed() {
    const container = document.getElementById('z-feed');
    container.innerHTML = '';
    
    if (gameState.articles.z.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Aucun post pour le moment.</p>';
        return;
    }
    
    gameState.articles.z.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-author">@${post.author}</div>
            <div class="post-content">${post.content}</div>
            <div class="post-time">Jour ${post.day}</div>
        `;
        
        container.appendChild(postDiv);
    });
}

// Sauvegarde
function saveGameState() {
    localStorage.setItem('financialSimulatorSave', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('financialSimulatorSave');
    if (saved) {
        const loaded = JSON.parse(saved);
        gameState = {
            ...gameState,
            ...loaded,
            gameTime: null // Ne pas charger l'intervalle
        };
    }
}

// Démarrer le jeu
window.onload = initGame;
