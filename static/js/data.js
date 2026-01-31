// Données du jeu

const SECTORS = {
    TECH: 'Technologie',
    WATER: 'Eau & Environnement',
    GAMES: 'Jeux Vidéo',
    MEDIA: 'Médias',
    FINANCE: 'Finance',
    FOOD: 'Alimentation',
    ENERGY: 'Énergie',
    TRANSPORT: 'Transport'
};

const COMPANIES = [
    // Technologie
    { id: 1, name: 'Gogol', sector: SECTORS.TECH, basePrice: 120, ceo: 'Larry Sage', description: 'Leader mondial des moteurs de recherche et services numériques.' },
    { id: 2, name: 'Macrohard', sector: SECTORS.TECH, basePrice: 280, ceo: 'Bill Doors', description: 'Géant du logiciel et des systèmes d\'exploitation.' },
    { id: 3, name: 'Nvidiot', sector: SECTORS.TECH, basePrice: 450, ceo: 'Jensen Wang', description: 'Spécialiste des processeurs graphiques et IA.' },
    { id: 4, name: 'Pomme Tech', sector: SECTORS.TECH, basePrice: 175, ceo: 'Tim Apple', description: 'Concepteur d\'appareils électroniques premium.' },
    { id: 5, name: 'ByteShort', sector: SECTORS.TECH, basePrice: 85, ceo: 'Zhang Yiming', description: 'Plateforme de réseaux sociaux et contenu vidéo.' },
    { id: 6, name: 'MétaVerse Inc', sector: SECTORS.TECH, basePrice: 210, ceo: 'Mark Zuckerbot', description: 'Réseaux sociaux et réalité virtuelle.' },

    // Eau & Environnement
    { id: 7, name: 'AquaFaux', sector: SECTORS.WATER, basePrice: 45, ceo: 'Jean Duflot', description: 'Distribution d\'eau et traitement des eaux usées.' },
    { id: 8, name: 'PlastiFlow', sector: SECTORS.WATER, basePrice: 32, ceo: 'Sophie Verdier', description: 'Recyclage de plastique et solutions écologiques.' },
    { id: 9, name: 'GreenWave', sector: SECTORS.WATER, basePrice: 28, ceo: 'Martin Eco', description: 'Technologies de purification d\'eau.' },
    { id: 10, name: 'OcéanPur', sector: SECTORS.WATER, basePrice: 52, ceo: 'Claire Marine', description: 'Nettoyage des océans et décontamination.' },
    { id: 11, name: 'HydroMax', sector: SECTORS.WATER, basePrice: 38, ceo: 'Pierre Fontaine', description: 'Infrastructure hydraulique et barrages.' },
    { id: 12, name: 'BioPlanet', sector: SECTORS.WATER, basePrice: 41, ceo: 'Emma Green', description: 'Solutions biodégradables et compostage.' },

    // Jeux Vidéo
    { id: 13, name: 'Nintendoh', sector: SECTORS.GAMES, basePrice: 95, ceo: 'Shigeru Miyamato', description: 'Consoles de jeux portables et franchises iconiques.' },
    { id: 14, name: 'Playstate', sector: SECTORS.GAMES, basePrice: 110, ceo: 'Jim Rayan', description: 'Consoles de salon et jeux exclusifs AAA.' },
    { id: 15, name: 'XCube', sector: SECTORS.GAMES, basePrice: 105, ceo: 'Phil Spencer-Smith', description: 'Gaming et cloud gaming.' },
    { id: 16, name: 'ValveOff', sector: SECTORS.GAMES, basePrice: 88, ceo: 'Gabe NewHome', description: 'Plateforme de distribution numérique de jeux.' },
    { id: 17, name: 'EpicFail Games', sector: SECTORS.GAMES, basePrice: 72, ceo: 'Tim Sweeney-Todd', description: 'Développeur et éditeur de jeux populaires.' },
    { id: 18, name: 'ActiviBliz', sector: SECTORS.GAMES, basePrice: 115, ceo: 'Bobby Kotex', description: 'Studio derrière des franchises multijoueurs massives.' },

    // Médias
    { id: 19, name: 'NetfluxTV', sector: SECTORS.MEDIA, basePrice: 145, ceo: 'Reed Hasty', description: 'Streaming vidéo et production de contenu original.' },
    { id: 20, name: 'DisneyMinus', sector: SECTORS.MEDIA, basePrice: 165, ceo: 'Bob Iger-Lite', description: 'Divertissement, parcs et franchises cinématographiques.' },
    { id: 21, name: 'YouTubeNot', sector: SECTORS.MEDIA, basePrice: 92, ceo: 'Susan Woj', description: 'Plateforme de partage vidéo communautaire.' },
    { id: 22, name: 'SpotifyNope', sector: SECTORS.MEDIA, basePrice: 78, ceo: 'Daniel Elk', description: 'Streaming musical et podcasts.' },
    { id: 23, name: 'TwitchOut', sector: SECTORS.MEDIA, basePrice: 65, ceo: 'Emmett Shear-Less', description: 'Streaming en direct pour gamers.' },
    { id: 24, name: 'SnapCrash', sector: SECTORS.MEDIA, basePrice: 55, ceo: 'Evan Spiegel-Hall', description: 'Application de messagerie et contenu éphémère.' },

    // Finance
    { id: 25, name: 'JPMorning', sector: SECTORS.FINANCE, basePrice: 195, ceo: 'Jamie Diamond', description: 'Banque d\'investissement et services financiers.' },
    { id: 26, name: 'GoldmanSacks', sector: SECTORS.FINANCE, basePrice: 220, ceo: 'David Solomon-Kane', description: 'Gestion d\'actifs et conseil financier.' },
    { id: 27, name: 'BitCrash', sector: SECTORS.FINANCE, basePrice: 35, ceo: 'CZ Nobody', description: 'Plateforme d\'échange de cryptomonnaies.' },
    { id: 28, name: 'PayPal-Away', sector: SECTORS.FINANCE, basePrice: 85, ceo: 'Dan Schulman-Berg', description: 'Paiements en ligne et solutions fintech.' },
    { id: 29, name: 'VisaMaybe', sector: SECTORS.FINANCE, basePrice: 240, ceo: 'Alfred Kelly Jr Jr', description: 'Réseau mondial de paiements par carte.' },
    { id: 30, name: 'MasterCardNot', sector: SECTORS.FINANCE, basePrice: 235, ceo: 'Michael Miebach-Off', description: 'Solutions de paiement et transactions.' },

    // Alimentation
    { id: 31, name: 'McDodo', sector: SECTORS.FOOD, basePrice: 125, ceo: 'Chris Kempczinski-Burger', description: 'Chaîne mondiale de restauration rapide.' },
    { id: 32, name: 'CocaKola', sector: SECTORS.FOOD, basePrice: 68, ceo: 'James Quincey-Water', description: 'Boissons gazeuses et jus de fruits.' },
    { id: 33, name: 'PepsiMeh', sector: SECTORS.FOOD, basePrice: 71, ceo: 'Ramon Laguarta-Fizz', description: 'Boissons et snacks salés.' },
    { id: 34, name: 'NestléNo', sector: SECTORS.FOOD, basePrice: 98, ceo: 'Mark Schneider-Fast', description: 'Produits alimentaires et nutrition.' },
    { id: 35, name: 'UnileverNever', sector: SECTORS.FOOD, basePrice: 82, ceo: 'Alan Jope-Soap', description: 'Produits de consommation et hygiène.' },
    { id: 36, name: 'KraftFake', sector: SECTORS.FOOD, basePrice: 54, ceo: 'Miguel Patricio-Cheese', description: 'Fromages et produits laitiers transformés.' },

    // Énergie
    { id: 37, name: 'TeslaFail', sector: SECTORS.ENERGY, basePrice: 320, ceo: 'Elon Tusk', description: 'Véhicules électriques et solutions énergétiques.' },
    { id: 38, name: 'ShellOut', sector: SECTORS.ENERGY, basePrice: 155, ceo: 'Wael Sawan-Oil', description: 'Pétrole, gaz et énergies renouvelables.' },
    { id: 39, name: 'BPMaybe', sector: SECTORS.ENERGY, basePrice: 142, ceo: 'Bernard Looney-Gone', description: 'Compagnie pétrolière mondiale.' },
    { id: 40, name: 'SolarFlop', sector: SECTORS.ENERGY, basePrice: 47, ceo: 'Emma Sunshine', description: 'Panneaux solaires et installations photovoltaïques.' },
    { id: 41, name: 'WindFail', sector: SECTORS.ENERGY, basePrice: 39, ceo: 'Lars Windmill', description: 'Éoliennes et énergie éolienne.' },
    { id: 42, name: 'NuclearOops', sector: SECTORS.ENERGY, basePrice: 88, ceo: 'Marie Curie-Redux', description: 'Centrales nucléaires et énergie atomique.' },

    // Transport
    { id: 43, name: 'BoeingDown', sector: SECTORS.TRANSPORT, basePrice: 178, ceo: 'Dave Calhoun-Plane', description: 'Constructeur aéronautique et défense.' },
    { id: 44, name: 'AirbusUp', sector: SECTORS.TRANSPORT, basePrice: 185, ceo: 'Guillaume Faury-Fly', description: 'Avions commerciaux et militaires.' },
    { id: 45, name: 'UberNowhere', sector: SECTORS.TRANSPORT, basePrice: 58, ceo: 'Dara Khosrowshahi-Car', description: 'VTC et livraison de repas.' },
    { id: 46, name: 'FordNot', sector: SECTORS.TRANSPORT, basePrice: 92, ceo: 'Jim Farley-Motor', description: 'Constructeur automobile traditionnel.' },
    { id: 47, name: 'ToyotaNope', sector: SECTORS.TRANSPORT, basePrice: 108, ceo: 'Akio Toyoda-San', description: 'Véhicules hybrides et automobiles.' },
    { id: 48, name: 'RenaultMaybe', sector: SECTORS.TRANSPORT, basePrice: 65, ceo: 'Luca de Meo-Vroom', description: 'Voitures électriques et alliance automobile.' }
];

// Templates d'événements par secteur
const EVENT_TEMPLATES = {
    [SECTORS.TECH]: [
        { type: 'positive', title: '{company} annonce une innovation révolutionnaire en IA', impact: { min: 15, max: 25 } },
        { type: 'positive', title: '{company} dévoile un partenariat stratégique majeur', impact: { min: 10, max: 20 } },
        { type: 'positive', title: 'Résultats exceptionnels pour {company} ce trimestre', impact: { min: 12, max: 18 } },
        { type: 'negative', title: 'Faille de sécurité massive découverte chez {company}', impact: { min: -25, max: -35 } },
        { type: 'negative', title: '{company} accusé de violation de données personnelles', impact: { min: -20, max: -30 } },
        { type: 'negative', title: 'Le PDG de {company} démissionne dans un scandale', impact: { min: -18, max: -28 } },
        { type: 'neutral', title: '{company} annonce un changement de direction stratégique', impact: { min: -5, max: 10 } },
        { type: 'neutral', title: 'Nouveau PDG nommé chez {company}', impact: { min: -8, max: 12 } }
    ],
    [SECTORS.WATER]: [
        { type: 'positive', title: '{company} remporte un contrat gouvernemental majeur', impact: { min: 15, max: 22 } },
        { type: 'positive', title: 'Nouvelle technologie de filtration développée par {company}', impact: { min: 12, max: 20 } },
        { type: 'negative', title: 'Scandale : eau contaminée distribuée par {company}', impact: { min: -30, max: -45 } },
        { type: 'negative', title: '{company} condamné pour pollution de rivières', impact: { min: -25, max: -35 } },
        { type: 'negative', title: 'Pénurie d\'eau : {company} incapable de répondre à la demande', impact: { min: -15, max: -25 } },
        { type: 'neutral', title: '{company} investit massivement dans la recherche', impact: { min: -3, max: 8 } }
    ],
    [SECTORS.GAMES]: [
        { type: 'positive', title: '{company} : nouveau jeu bat tous les records de ventes', impact: { min: 20, max: 30 } },
        { type: 'positive', title: 'Franchise culte ressuscitée par {company}', impact: { min: 15, max: 25 } },
        { type: 'positive', title: '{company} annonce une console révolutionnaire', impact: { min: 18, max: 28 } },
        { type: 'negative', title: 'Lancement catastrophique pour le dernier jeu de {company}', impact: { min: -25, max: -35 } },
        { type: 'negative', title: '{company} ferme plusieurs studios de développement', impact: { min: -20, max: -30 } },
        { type: 'negative', title: 'Accusations de crunch et mauvaises conditions chez {company}', impact: { min: -15, max: -25 } },
        { type: 'neutral', title: '{company} acquiert un studio indépendant', impact: { min: -5, max: 15 } }
    ],
    [SECTORS.MEDIA]: [
        { type: 'positive', title: '{company} : abonnements en hausse spectaculaire', impact: { min: 15, max: 25 } },
        { type: 'positive', title: 'Série originale de {company} devient phénomène mondial', impact: { min: 18, max: 28 } },
        { type: 'negative', title: '{company} perd des millions d\'abonnés', impact: { min: -25, max: -35 } },
        { type: 'negative', title: 'Censure et controverse autour d\'un contenu de {company}', impact: { min: -20, max: -30 } },
        { type: 'negative', title: '{company} augmente drastiquement ses prix', impact: { min: -15, max: -25 } },
        { type: 'neutral', title: '{company} change de modèle économique', impact: { min: -8, max: 12 } }
    ],
    [SECTORS.FINANCE]: [
        { type: 'positive', title: '{company} annonce des profits records', impact: { min: 12, max: 20 } },
        { type: 'positive', title: '{company} lance un nouveau produit financier innovant', impact: { min: 10, max: 18 } },
        { type: 'negative', title: 'Fraude massive découverte chez {company}', impact: { min: -35, max: -50 } },
        { type: 'negative', title: '{company} impliqué dans un scandale de blanchiment', impact: { min: -30, max: -45 } },
        { type: 'negative', title: 'Crise de liquidité chez {company}', impact: { min: -25, max: -40 } },
        { type: 'neutral', title: '{company} restructure ses opérations', impact: { min: -10, max: 8 } }
    ],
    [SECTORS.FOOD]: [
        { type: 'positive', title: '{company} lance un produit viral sur les réseaux', impact: { min: 15, max: 25 } },
        { type: 'positive', title: 'Expansion internationale réussie pour {company}', impact: { min: 12, max: 22 } },
        { type: 'negative', title: 'Rappel massif de produits contaminés chez {company}', impact: { min: -30, max: -45 } },
        { type: 'negative', title: '{company} accusé de mauvaises pratiques sanitaires', impact: { min: -25, max: -35 } },
        { type: 'negative', title: 'Boycott international de {company}', impact: { min: -20, max: -30 } },
        { type: 'neutral', title: '{company} se lance dans le bio et le durable', impact: { min: -5, max: 15 } }
    ],
    [SECTORS.ENERGY]: [
        { type: 'positive', title: '{company} dévoile une batterie révolutionnaire', impact: { min: 20, max: 30 } },
        { type: 'positive', title: 'Production record pour {company}', impact: { min: 15, max: 25 } },
        { type: 'negative', title: 'Marée noire causée par {company}', impact: { min: -40, max: -55 } },
        { type: 'negative', title: 'Accident industriel majeur chez {company}', impact: { min: -35, max: -50 } },
        { type: 'negative', title: '{company} sanctionné pour non-respect environnemental', impact: { min: -25, max: -35 } },
        { type: 'neutral', title: '{company} pivote vers les énergies renouvelables', impact: { min: -8, max: 18 } }
    ],
    [SECTORS.TRANSPORT]: [
        { type: 'positive', title: '{company} bat des records de livraison', impact: { min: 15, max: 25 } },
        { type: 'positive', title: 'Nouveau modèle de {company} remporte tous les prix', impact: { min: 18, max: 28 } },
        { type: 'negative', title: 'Rappel massif de véhicules défectueux chez {company}', impact: { min: -30, max: -45 } },
        { type: 'negative', title: 'Crash d\'un appareil de {company}', impact: { min: -40, max: -55 } },
        { type: 'negative', title: '{company} fait face à une grève générale', impact: { min: -20, max: -30 } },
        { type: 'neutral', title: '{company} investit massivement dans l\'électrique', impact: { min: -5, max: 15 } }
    ]
};

// Noms d'utilisateurs fictifs pour Z et classements
const FAKE_USERS = [
    'CryptoKing2026', 'InvestQueen', 'WallStreetWolf', 'BullMarket', 'DiamondHands',
    'TechGuru', 'MoneyMaker', 'RichardTrader', 'StockMaster', 'FinanceWizard',
    'GreenInvestor', 'BlueChipFan', 'DayTraderPro', 'ValueHunter', 'GrowthSeeker'
];

// NPCs pour le classement
const TOP_INVESTORS = [
    { name: 'Jean-Marc Dupuis', startingMoney: 45000, id: 'npc1' },
    { name: 'Sophie Bertrand', startingMoney: 28000, id: 'npc2' },
    { name: 'Karim El-Fassi', startingMoney: 15000, id: 'npc3' }
];
