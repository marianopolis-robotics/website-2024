import { writable } from "svelte/store";

export const BirdStore = writable({
    birds: [
        'user',
        'stella',
        'tony',
        'terence',
		'poppy',
		'blue1',
		'blue2',
		'blue3',
		'bomb',
		'bubbles',
		'chuck',
		'dahlia',
		'drill',
		'hal',
		'ice',
		'luca',
		'matilda',
		'melody',
		'red',
		'silver',
		'willow',
        'pig',
	],
    poppy: {
        bird: 'poppy',
        name: 'Adelina Badea',
        subteam: 'Website',
        subteamFr: 'Site web, kiosque',
        powerFr: 'Tourbillon tornade',
        hobbiesFr:
            'Modélisation 3D, karaté, apprendre de nouvelles compétences grâce à des cours en ligne',
        funFactsFr:
            "Je suis née prématurément et j\'ai un petit chien à la personnalité très hautaine.",
        learnedFr:
            "J\'ai appris le développement web pour programmer cette page (la page des Angrynieurs). J\'ai également appris à concevoir, peindre et construire un kiosque thématique. J\'ai dû sacrifier de nombreuses nuits de sommeil et de détente durant les vacances d\'hiver en apprenant à coder alors que je n\'avais aucune expérience en matière de développement web. Au début, je pensais que cette voie serait trop difficile et ennuyeuse, mais je ne pouvais pas me tromper davantage. J\'ai pris beaucoup de plaisir à apprendre à programmer et à déboguer mon code, et j\'ai l\'intention de faire plus de dév web dans le futur.",
        power: 'Tornado spin',
        hobbies: '3D modeling, karate, and learning new skills through online courses',
        funFacts:
            'I was born prematurely and I have a little dog that has a very snobby personality.',
        learned:
            'I learned some web development to program this very page (the Angryneers page). I learned how to design, paint and build a thematic kiosk as well. I had to sacrifice many nights of sleep and relaxation during the winter break by learning to code from absolutely no experience in web development. Initially, I thought this path would be too difficult and boring, but I could not have been more wrong. I had so much fun learning to program and debug my code, and I actually plan on doing more web dev in the future.'
    },
    hal: {
        bird: 'hal',
        name: 'Aleksandr Kudashkin',
        subteam: 'Robot, programming',
        subteamFr: 'Robot, programmation',
        powerFr: 'Boomerang',
        hobbiesFr: 'Mathématiques, programmation, jeux vidéos, développement de jeux, natation',
        funFactsFr:
            "Parfois je décris mes rêves en utilisant des formules mathématiques et des fonctions. Aussi, quand je lis, je suis tellement submergé dans le livre que je n\'entends pas les gens qui s\'adressent à moi.",
        learnedFr:
            "J\'ai appris comment (et comment ne pas) utiliser les moteurs électriques et les contrôleurs de moteur, ainsi que les différents types. J\'ai également appris les principes derrière la conception et le fonctionnement des roues omnidirectionnelles. J\'ai acquis les compétences nécessaires pour identifier et éliminer les obstacles dans la construction du robot et j\'ai aussi appliqué mes connaissances en programmation et appris à utiliser l\'analyse syntaxique, la théorie des graphes et les patrons de conception dans mon code. Pour participer dans l\'équipe de robotique, j\'ai sacrifié l\'opportunité de participer dans d\'autres clubs et rencontrer des amis durant les périodes d\'activités, puis aussi la seconde moitié de mes vacances d\'hiver.",
        power: 'Boomerang',
        hobbies: 'Mathematics, programming, video game development, and swimming',
        funFacts:
            "Sometimes I describe my dreams using mathematical formulas and functions. Also, when I'm reading, I become so immersed in the book that I don't hear people addressing me.",
        learned:
            "I learned how to (and how not to) use electrical motors and motor controllers, as well as their different types. I also learned the principles behind the design and function of omni-wheels. I acquired the skills to identify and eliminate the bottlenecks in the robot's development, as well as applied my knowledge of programming and learned to use parsing, graph theory and design patterns in my code. To participate on the robotics team, I sacrificed participating in other clubs and meeting friends during Activity Periods, as well as the second half of my winter vacation."
    },
    matilda: {
        bird: 'matilda',
        name: 'Simona-Elena Lungoci',
        subteamFr: 'Site web, kiosque, vidéo et programmation',
        powerFr: 'Déploie des œufs destructeurs',
        hobbiesFr:
            'Jouer à des jeux vidéos et à des jeux de société, jouer de la musique, programmer, imprimerie 3D',
        funFactsFr: 'Je joue trois instruments de musique (piano, clarinette et saxophone).',
        learnedFr:
            "Lors de la création du site web, j\'ai appris à utiliser le framework Bootstrap pour mettre en forme et positionner les éléments. J\'ai aussi appris davantage sur Svelte. En construisant le kiosque, j\'ai beaucoup appris sur la construction, comme sabler, peindre les murs et remplir les trous avec du plâtre. J\'ai dû sacrifier une grande partie de mes vacances d\'hiver mais je suis heureuse d\'avoir utilisé ce temps pour apprendre de nouvelles compétences en fin de compte.",
        subteam: 'Website, kiosk, video, programming',
        power: 'Deploys destructive eggs',
        hobbies: 'Playing video games and board games, playing music, programming and 3D printing',
        funFacts: 'I play three musical instruments (piano, clarinet and saxophone).',
        learned:
            'While building the website, I learned how to use the Bootstrap framework to style and position elements. I also learned more about Svelte. While building the kiosk, I learned many things involved in kiosk building such as how to sand, paint walls, and fill holes using plaster. I had to sacrifice a lot of my winter break time, but overall I am happy that I used this time to learn new skills.'
    },
    willow: {
        bird: 'willow',
        name: 'Daniel Wei',
        subteam: 'Robot, website, video',
        subteamFr: 'Robot, site web, vidéo',
        powerFr: 'Rotation vortex',
        hobbiesFr: "Art, échecs, piano et basket-ball.",
        funFactsFr: 'Quand j\'avais 10 ans, j\'ai fait une piñata 3D en carton d\'une Lamborghini Veneno juste pour la réduire en pièces quelques jours plus tard.',
        learnedFr: 'En travaillant avec des coéquipiers talentueux, j\'ai perfectionné mes compétences en matière de résolution de problèmes en concevant, testant, déboguant et améliorant notre robot pour atteindre des objectifs spécifiques. En procédant par essais et erreurs, nous avons mis au point un système de volant d\'inertie fiable, garantissant des lancements de balles précis. Concilier les études et les autres activités parascolaires avec la robotique n\'a pas été facile, car j\'ai sacrifié beaucoup de temps pour la robotique, mais cela m\'a permis d\'acquérir des compétences quant à l\'organisation et à la gestion efficace du temps.',
        power: 'Vortex spin',
        hobbies: 'Art, chess, piano, and basketball',
        funFacts:
            'When I was 10, I made a 3D cardboard piñata of a Lamborghini Veneno just to smash it to pieces days later.',
        learned:
            'Working alongside talented teammates, I honed problem-solving skills through the design, testing, debugging, and enhancement of our robot for specific goals. Through trial and error, we crafted a reliable flywheel system, ensuring precise ball launches. Balancing academics and other extracurricular activities with robotics was challenging since I sacrificed so much time for robotics, but it taught me effective time management and organizational skills.'
    },
    ice: {
        bird: 'ice',
        name: 'Guancheng He',
        subteam: 'Website, kiosk, video',
        subteamFr: 'Site web, kiosque, vidéo',
        powerFr: 'Geler les cochons et les blocs',
        hobbiesFr: 'Escrime, trombone, piano, jeux vidéos',
        funFactsFr: 'Je porte des lunettes (comme vous pouvez le constater dans ma photo).',
        learnedFr: 'J\'ai appris HTML, CSS, JavaScript et divers frameworks. De plus, j\'ai acquis des compétences en matière de leadership grâce à nos capitaines très compétents. J\'ai sacrifié l\'opportunité de participer à d\'autres clubs et une partie de mes vacances.',
        power: 'Freeze pigs and blocks',
        hobbies: 'Fencing, trombone, piano, gaming',
        funFacts: 'I wear glasses (as you can probably see in my photo).',
        learned:
            'I learned HTML, CSS, JavaScript and different frameworks. In addition, I learned leadership skills from our highly competent captains. I sacrificed my participation in other clubs, and part of my vacation.'
    },
    silver: {
        bird: 'silver',
        name: 'Mingruifu Lin',
        subteam: 'Website, programming, kiosk',
        subteamFr: 'Site web, programmation, kiosque',
        powerFr: 'Plonger dans des blocs',
        hobbiesFr: 'Maths',
        funFactsFr: 'J\'ai le syndrome d\'Alice au pays des merveilles (c\'est inoffensif, ne vous inquiétez pas).',
        learnedFr: 'J\'ai appris comment utiliser la bibliothèque logicielle de physique Rapier.js et le framework web SvelteKit pour créer une simulation JavaScript 3D de Kryptik pour le site web. Je ne pouvais pas jouer au badminton ni aller au club de musique durant les périodes d\'activités. J\'ai aussi moins de temps pour profiter des maths et du violon, et je ne peux plus aller souvent à la salle d\'entraînement.',
        power: 'Diving into blocks',
        hobbies: 'Math',
        funFacts: 'I have Alice in Wonderland syndrome (it\'s harmless, don\'t worry).',
        learned:
            'I learned how to use the Rapier.js physics library and the SvelteKit web framework to create a JavaScript 3D simulation of Kryptik for the website. I couldn\'t go to badminton during AP nor to the music club. I also have less time to enjoy math and violin, and I can\'t go to the gym more often.'
    },
    luca: {
        bird: 'luca',
        name: 'Yi Chen Liu',
        subteam: 'Robot, video',
        subteamFr: 'Robot, vidéo',
        powerFr: 'Chocs d\'ondes sonores',
        hobbiesFr: 'Jouer de la musique, construire des modèles réduits Gundam et jouer aux jeux vidéos',
        funFactsFr: 'J\'adore le thé aux perles et la musique classique :)',
        learnedFr: 'J\'ai appris en robotique que rien n\'est aussi simple qu\'il ne paraît. Même avec de bonnes idées, tout devient difficile dès qu\'on commence à construire, mais notre équipe s\'améliore à naviguer au travers des obstacles. J\'ai sacrifié la plupart de mes périodes d\'activités, qui sont des périodes de deux heures les mardis et les jeudis midi quand aucun élève n\'a de cours, et j\'ai dû sacrifier un peu de temps d\'étude également.',
        power: 'Soundwave shock',
        hobbies:
            'Playing music, building Gundam model kits, playing video games',
        funFacts: 'I love bubble tea and classical music :)',
        learned:
            'Something I learned in robotics is that not everything is as easy as it seems. Even with good ideas, once we start building it becomes very difficult, but our team is improving in navigating our way around this obstacle. I sacrificed most of my APs, which are 2-hour periods on Tuesdays and Thursdays when no students have class, and I had to sacrifice a bit of study time as well.'
    },
    dahlia: {
        bird: 'dahlia',
        name: 'Prisha Kalpesh Manek',
        subteam: 'Robot, video',
        subteamFr: 'Robot, vidéo',
        powerFr: 'Intelligence élevée, répulsion d\'objets',
        hobbiesFr: 'Lire, badminton, faire la sieste',
        funFactsFr: 'Ma résolution pour 2024 est d\'essayer le plus de nouilles instantanées différentes possible.',
        learnedFr: 'Cette année, au sein de l\'équipe de robotique, j\'ai appris à ajouter des composants électriques aux pièces que je construisais. J\'ai dû renoncer à du temps pour faire quelques projets personnels et pour rencontrer des amis pour remplir les engagements que j\'ai envers l\'équipe de robotique.',
        power: 'High intelligence, repel objects',
        hobbies: 'Reading, badminton, napping',
        funFacts: 'My 2024 resolution is to try as many different instant noodles as possible',
        learned:
            'This year on the robotics team, I learned how to add electrical components to the parts I built. I had to give up time for some personal projects and time spent with friends to fulfill the robotics team commitments.'
    },
    chuck: {
        bird: 'chuck',
        name: 'Sivabalan Sandh Muthurajan',
        subteam: 'Robot, programming',
        subteamFr: 'Robot, programmation, vidéo',
        powerFr: 'Vitesse surhumaine, chronokinésie, habiletés de combat',
        hobbiesFr: 'Programmation, lecture, électroniques de loisir',
        funFactsFr: 'J\'aime les tartes aux framboises!',
        learnedFr: 'J\'ai appris davantage sur la construction d\'objets spécifiques avec des fonctions utilisant différents matériaux et sur la façon dont de nombreux outils peuvent être utilisés. Le codage de l\'Arduino et l\'assemblage du robot ont été une expérience d\'apprentissage très amusante dans l\'ensemble. J\'ai dû sacrifier mon temps d\'étude, mais j\'ai tellement appris que les sacrifices n\'ont plus d\'importance. En fait, j\'ai surtout acquis une bonne expérience plus qu\'autres choses.',
        power: 'Superhuman speed, chronokinesis, fighting skills',
        hobbies: 'Programming, reading and hobby electronics',
        funFacts: 'I like raspberry pies!',
        learned:
            'I learned more about building specific objects with functions using different materials and how a lot of the tools can be used. Coding the arduino and pulling the robot together has been a lot of learning and fun as well. I had to sacrifice my time spent studying, but I have learned so much that the sacrifices do not matter anymore. In fact, I gained good experience more than anything else.'
    },
    drill: {
        bird: 'drill',
        name: 'Thanh-Tri Nguyen',
        subteam: 'Robot',
        subteamFr: 'Robot',
        powerFr: 'Percer à travers des blocs durs',
        hobbiesFr: 'Jeux vidéos, programmation, regarder des films',
        funFactsFr: 'Je me suis fait une permanente en janvier.',
        learnedFr: 'J\'ai appris comment fonctionnent les circuits et les robots en général. J\'ai rejoint l\'équipe avec peu ou pas de connaissances, sauf en programmation, et j\'ai donc beaucoup appris sur la construction d\'un robot et sur le fonctionnement de chacune de ses parties. J\'ai également appris à souder. J\'ai dû sacrifier beaucoup de mon temps et de ma liberté de joindre d\'autres clubs qui m\'intéressaient.',
        power: 'Drill into hard blocks',
        hobbies: 'Video games, programming and watching movies',
        funFacts: 'I got a perm in January.',
        learned:
            'I learned how circuitry and robots work in general. I had joined the team with little to no knowledge on anything except programming, so I learned a lot about how to build a robot and how each part of it works. I also learned how to solder. I had to sacrifice a lot of my time and my ability to join other clubs that interested me.'
    },
    red: {
        bird: 'red',
        name: 'Yeonjae Oh',
        subteam: 'Robot, kiosk, video',
        subteamFr: 'Robot, kiosque, vidéo',
        powerFr: 'Plumes puissantes, qualités de dirigeant',
        hobbiesFr: 'Basket-ball, s\'entraîner',
        funFactsFr: 'Je suis une ambitieuse paresseuse.',
        learnedFr: 'J\'ai beaucoup appris sur comment utiliser des pièces et des outils pour construire un robot. J\'ai aussi appris que la séparation des tâches est un élément crucial pour l\'efficacité et le travail d\'équipe. De plus, discuter de la conception du robot en équipe est ma partie préférée de la robotique. Pour pouvoir assister à toutes les réunions de robotique, je n\'ai pas pu participer aux activités d\'autres clubs.',
        power: 'Mighty feathers, leadership',
        hobbies: 'Basketball, working out',
        funFacts: "I'm a lazy ambitioner.",
        learned:
            "I learned a lot about how to use pieces and tools to build a robot. I also learned that separating tasks is a crucial component for efficiency and teamwork. Also, discussing the design of the robot together as a team is my favourite part of robotics. In order to attend all robotics meetings, I couldn't go to other club activities."
    },
    terence: {
        bird: 'terence',
        name: 'Ruwa Qatmash',
        subteam: 'Captain, kiosk, robot',
        subteamFr: 'Capitaine, kiosque, robot',
        powerFr: 'Force massive, destruction de charges',
        hobbiesFr: 'Jouer à Hay Day',
        funFactsFr: 'J\'adore jouer à Hay Day avec Elise et jouer au hockey avec Zi Heng.',
        learnedFr: 'Comme c\'était la première année que je construis et décore le kiosque, j\'ai appris à organiser l\'emplacement de chaque élément et à planifier un calendrier. J\'ai aussi appris à quel point Hay Day me manque lorsque je suis en robotique, car j\'ai dû renoncer à mon temps de Hay Day pour la robotique.',
        power: 'Massive strength, charge, destruction',
        hobbies: 'Playing Hay Day',
        funFacts: 'I love playing Hay Day with Elisa and playing hockey with Zi Heng.',
        learned:
            "Since it was my first year building and decorating the kiosk, I learned how to organize where everything needs to go and plan a timeline. I also learned how much I miss Hay Day when I'm in robotics since I had to give up my designated Hay Day time for robotics."
    },
    blue1: {
        bird: 'Jay',
        name: 'Junlin (Martin) Song',
        subteam: 'Robot, video',
        subteamFr: 'Robot, vidéo',
        powerFr: 'Duplication, intelligence élevée',
        hobbiesFr: 'Regarder le soccer, acheter des Legos (Star Wars), jouer à des jeux vidéos sur mobile',
        funFactsFr: 'Je mesure 6\'3 mais je suis terrible au basket-ball.',
        learnedFr: 'J\'ai appris comment utiliser différents outils et comment créer des prototypes basés sur nos designs. J\'ai aussi réalisé l\'importance des compétences en organisation et en communication en tant que membre d\'une équipe. J\'ai dû sacrifier la dernière semaine de mes vacances d\'hiver pour aller en robotique, ce qui signifie que j\'ai eu moins de temps pour me préparer au nouveau semestre. Heureusement, nous étions productifs durant cette semaine et nous étions en mesure de finir une grande partie de nos tâches, ce qui devrait nous aider à avoir plus de temps d\'essais.',
        power: 'Duplication, high intelligence',
        hobbies: 'Watching soccer, buying Legos (Star Wars), and playing mobile games',
        funFacts: "I'm 6'3 but terrible at basketball.",
        learned:
            'I learned how to use different tools, and how to create prototypes based on our designs. I also realized the importance of organization and communication skills as part of a team. I had to sacrifice my last week of winter break to be at robotics, which meant I had less time to prepare for the new semester. Luckily, we were productive during that week and were able to get a lot of work done, which should help us gain more testing time.'
    },
    blue2: {
        bird: 'blue2',
        name: 'Theo Radhakrishna',
        subteam: 'Robot, video',
        subteamFr: 'Robot, vidéo',
        powerFr: 'Duplication, intelligence élevée',
        hobbiesFr: 'Hockey, baseball, piano',
        funFactsFr: 'Je suis un quart Indien et j\'ai déjà visité ma famille en Inde.',
        learnedFr: 'J\'ai appris comment coopérer avec beaucoup d\'autres personnes pour construire un robot et j\'ai appris sur presque toutes les pièces du robot. J\'ai dû sacrifier du temps avec mes amis et du temps d\'étude durant les périodes d\'activités.',
        power: 'Duplication, high intelligence',
        hobbies: 'Hockey, baseball, piano',
        funFacts: 'I am a quarter Indian and have visited family in India.',
        learned:
            'I learned how to cooperate with lots of other people to build the robot, and I learned about pretty much every part of the robot. I had to sacrifice time with friends and study time during Activity Periods.'
    },
    blue3: {
        bird: 'blue3',
        name: 'Tyler Hamel-Wong',
        subteam: 'Website, kiosk, video',
        subteamFr: 'Site web, kiosque, vidéo',
        powerFr: 'Duplication, intelligence élevée',
        hobbiesFr: 'Jouer de la guitare',
        funFactsFr: 'Le seul fait divers à propos de moi qui me vient en tête est que je joue de la guitare.',
        learnedFr: 'J\'ai appris à construire un canapé pour le kiosque, à mesurer et à couper du tissu, et j\'ai déterminé quels rembourrages fonctionnent le mieux pour rendre le canapé hyper confortable! J\'ai dû sacrifier certains de mes vêtements préférés alors que je peignais le kiosque. ',
        power: 'Duplication, high intelligence',
        hobbies: 'Playing guitar',
        funFacts: 'The only fun fact about me I can think of is that I play guitar.',
        learned:
            'I learned how to build a couch for the kiosk, measure and cut fabric, and I determined what fillings work the best to make the couch super comfortable! I had to sacrifice some of my favourite clothes while painting the kiosk.'
    },
    bomb: {
        bird: 'bomb',
        name: 'Kyota Poëti',
        subteam: 'Robot',
        subteamFr: 'Robot',
        powerFr: 'Détonation',
        hobbiesFr: 'Programmation, jouer du violon, lire de la philosophie/psychanalyse',
        funFactsFr: 'Je me spécialise dans la cuisson des œufs.',
        learnedFr: 'J\'ai appris comment construire un mécanisme de tir au volant d\'inertie, comment souder et que Daniel a toujours raison. J\'ai dû sacrifier la confiance que j\'ai des capacités en ingénierie.',
        power: 'Detonation',
        hobbies: 'Programming, playing the violin, and reading philosophy/psychoanalysis',
        funFacts: 'I specialize in cooking eggs.',
        learned:
            'I learned how to build a flywheel shooting mechanism, how to solder, and that Daniel is always right. I had to sacrifice the confidence I had in my engineering capabilities.'
    },
    bubbles: {
        bird: 'bubbles',
        name: 'Yanran Elisa Xue',
        subteam: 'Kiosk, video, website',
        subteamFr: 'Kiosque, vidéo, site web',
        powerFr: 'Gonfler comme un ballon',
        hobbiesFr: 'Jouer à Hay Day avec Ruwa',
        funFactsFr: 'J\'aime le plâtre.',
        learnedFr: 'J\'ai appris comment appliquer du plâtre sur des murs en bois et construire des décorations géniales comme nos cadres de fenêtres en bois. J\'ai sacrifié mon sommeil pour me réveiller tôt et assister aux rencontres de robotique durant les vacances d\'hiver et la semaine de relâche.',
        power: 'Inflate like a balloon',
        hobbies: 'Playing Hay Day with Ruwa',
        funFacts: 'I like plaster.',
        learned:
            'I learned how to plaster the wooden walls and build awesome decorations like our wooden window frames. I sacrificed my sleep to get up early in the morning for robotics meetings during winter break and March break.'
    },
    melody: {
        bird: 'melody',
        name: 'Ruo-Ling (Carolyn) Wu',
        subteam: 'Website, kiosk, programming, video',
        subteamFr: 'Site web, kiosque, programmation, vidéo',
        powerFr: 'Rassembler des objets comme un aspirateur et le lancer',
        hobbiesFr: 'Programmation, développement web, apprendre de nouvelles langues',
        funFactsFr: 'Une des seules commandes Vim que je connais est comment sortir.',
        learnedFr: 'Pour le site web, j\'ai appris beaucoup de fonctionnalités avancées sur Svelte et de solutions/animations créatives sur CSS. J\'ai aussi appris comment construire un kiosque et comment utiliser tous les outils qui viennent avec la construction et la décoration du kiosque. J\'ai dû sacrifier du temps libre et du sommeil mais ça vaut le coût pour la robotique.',
        power: 'Gather objects like a vacuum and launch them',
        hobbies: 'Programming, web development, learning new languages',
        funFacts: 'One of the only Vim commands I know is how to exit.',
        learned:
            'For the website, I learned a lot of advanced Svelte functionality and creative CSS solutions and animations. I also learned how to build a kiosk and how to use all the tools that come with building and decorating the kiosk. I did have to sacrifice free time and sleep but robotics is worth it.'
    },
    stella: {
        bird: 'stella',
        name: 'Dominique Paradis (mentor)',
        subteam: 'Supervisor',
        subteamFr: 'Superviseur',
        powerFr: 'Baguette à bulles',
        hobbiesFr: 'Astrophysique',
        funFactsFr: 'Je crois fermement en la Terre hyper-sphéroïde.',
        learnedFr: 'Mon rôle en tant que mentor de robotique à Marianopolis consiste principalement à gérer les aspects de l\'équipe qui divergent de l\'objectif principal. Afin que les élèves se concentrent sur les aspects essentiels de la compétition, à savoir le robot, le kiosque, le site web, la vidéo et la programmation, j\'aide à gérer les horaires, la composition de l\'équipe, les finances et le transport du matériel.',
        power: 'Bubble wand',
        hobbies: 'Astrophysics',
        funFacts: 'I am a hyperspheroid-earther.',
        learned:
            'My role as the robotics mentor at Marianopolis mostly involves dealing with the aspects of the team that diverge from the main goal. In order to ensure the students focus on the key aspects of the competition—namely the robot, the kiosk, website, video, and programming—I help manage scheduling, team membership, finances, and transportation of materials.'
    },
    tony: {
        bird: 'tony',
        name: 'Zi Heng Wang',
        subteam: 'Captain, kiosk, video, robot',
        subteamFr: 'Capitaine, kiosque, vidéo, robot',
        powerFr: 'Poids corporel immense, force massive',
        hobbiesFr: 'Jouer au hockey avec Ruwa',
        funFactsFr: 'Je veux devenir un chat.',
        learnedFr: 'J\'ai principalement travaillé sur le robot l\'année passée et j\'ai décidé d\'essayer le kiosque cette fois-ci. J\'ai beaucoup appris sur le travail du bois et j\'ai aussi découvert comment c\'était difficile de transformer les idées de kiosque en réalité. J\'ai renoncé à beaucoup de temps libre et de sommeil pour la robotique, mais les compétences que j\'ai acquises et maîtrisées valent le coup de tous ces sacrifices.',
        power: 'Body slam, massive strength',
        hobbies: 'Play hockey with Ruwa',
        funFacts: 'I want to become a cat.',
        learned: 'I mainly worked on robot last year and decided to try kiosk this time. I learned a lot about woodworking and painting walls, and I also discovered how tricky it can be to turn kiosk ideas into reality. I gave up a lot of free time and sleep for robotics, but the skills I gained and mastered made the sacrifices worth it.'
    }
}
);


