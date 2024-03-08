import {writable} from "svelte/store";

export const BirdStore = writable({
    birds: [
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
		'user',
        'stella',
        'pig',
        'terence',
        'tony',
	],
    poppy: {
        bird: 'poppy',
        name: 'Adelina Badea',
        subteam: 'Website',
        subteamFr: 'Site Web',
        powerFr: 'Tornade',
        hobbiesFr:
            'Modélisation 3D, karaté et apprentissage de nouvelles compétences grâce à des cours en ligne.',
        funFactsFr:
            "Je suis née prématurément et j'ai un petit chien qui a une personalité très snob.",
        learnedFr:
            "J'ai appris un peu comment développer des sites web pour aider à programmer cette page (la page des Angrynieurs). J'ai appris à concevoir, peindre et construire un kiosque thématique. J'ai dû sacrifier de nombreuses nuits de sommeil et de relaxation pendant les vacances d'hiver en apprenant à coder sans aucune expérience en développement Web. Au départ, je pensais que ce chemin serait trop difficile et ennuyeux, mais je n’aurais pas pu me tromper davantage. J'ai eu tellement de plaisir à apprendre à programmer et à déboguer mon code que j'ai l'intention de faire davantage de développement Web dans le futur.",
        power: 'Tornado spin',
        hobbies: '3D modeling, karate, and learning new skills through online courses',
        funFacts:
            'I was born prematurely and I have a little dog that has a very snobby personality.',
        learned:
            'I learned some web development to program this very page (the Angryneers page). I learned how to design, paint, and build a thematic kiosk. I had to sacrifice many nights of sleep and relaxation during the winter break by learning to code with absolutely no web development experience. Initially, I thought this path would be too difficult and boring, but I could not have been more wrong. I had so much fun learning to program and debug my code, that I plan on doing more web development in the future.'
    },
    hal: {
        bird: 'hal',
        name: 'Aleksandr Kudashkin',
        subteam: 'Robot, programming',
        subteamFr: 'Robot, programmation',
        powerFr: 'Boomerang',
        hobbiesFr: 'Mathématiques, programmation, développement de jeux vidéo et la natation.',
        funFactsFr:
            "Parfois, je décris mes rêves à l'aide de formules et de fonctions mathématiques. Aussi, quand je lis, je suis tellement immergé dans le livre que je n'entends pas les gens s'adresser à moi.",
        learnedFr:
            "J'ai appris comment (et comment ne pas) utiliser des moteurs électriques et des contrôleurs de moteur, ainsi que leurs différents types. J'ai également appris les principes derrière la conception et la fonction des roues omnidirectionnelles. J'ai acquis les compétences nécessaires pour identifier et éliminer les goulots d'étranglement dans le développement du robot. J'ai appliqué mes connaissances en programmation et appris à utiliser l'analyse syntaxique, la théorie des graphes et les modèles de conception dans mon code. Enfin, j'ai suivi un cours avancé de Python et un cours sur les modèles de conception pour préparer le concours de programmation. Pour faire partie de l'équipe de robotique, j'ai sacrifié la participation à d'autres clubs et la rencontre d'amis pendant les périodes d'activités, ainsi que la seconde moitié de mes vacances d'hiver.",
        power: 'Boomerang',
        hobbies: 'Mathematics, programming, video game development and swimming',
        funFacts:
            "Sometimes I describe my dreams using mathematical formulas and functions. Also, when I'm reading, I become so immersed in the book that I don't hear the people addressing me.",
        learned:
            "I learned how to (and how not to) use electrical motors and motor controllers, as well as their different types. I also learned the principles behind the omni-wheels design and function. I acquired the skills to identify and eliminate the bottlenecks in the robot's development. I applied my knowledge of programming and learned to utilize parsing, graph theory, and design patterns in my code. Finally, I have completed an advanced Python course and a course on design patterns to prepare for the programming competition. To participate on the robotics team, I sacrificed participating in other clubs and meeting friends during Activity Periods, as well as the second half of my winter vacation."
    },
    matilda: {
        bird: 'matilda',
        name: 'Simona-Elena Lungoci',
        subteamFr: 'Site web, kiosque, vidéo et programmation',
        powerFr: 'Déploie des œufs destructeurs',
        hobbiesFr:
            'Jouer à des jeux vidéo et des jeux de société, jouer de la musique, programmer et imprimer en 3D',
        funFactsFr: 'Je joue trois instruments de musique (le piano, la clarinette et le saxophone)',
        learnedFr:
            "Lors de la création du site Web, j'ai appris à utiliser le framework Bootstrap pour styliser et positionner les éléments. J'en ai également appris davantage sur Svelte. Lors de la construction du kiosque, j'ai appris beaucoup de choses liées à la construction d'un kiosque, comme comment combler les trous, poncer et peindre les murs. J'ai dû sacrifier une grande partie de mes vacances d'hiver, mais dans l'ensemble, je suis heureuse d'avoir utilisé ce temps pour acquérir de nouvelles compétences.",
        subteam: 'Website, kiosk, video and programming',
        power: 'Deploys destructive eggs',
        hobbies: 'Playing video games and board games, playing music, programming, and 3D printing',
        funFacts: 'I play three musical instruments (piano, clarinet, and saxophone)',
        learned:
            'While building the website, I learned how to use the Bootstrap framework to style and position elements. I also learned more about Svelte. While building the kiosk, I learned many things involved in kiosk building such as how to fill holes, sand, and paint walls. I had to sacrifice a lot of my winter break time, but overall I am happy that I used this time to learn new skills.'
    },
    willow: {
        bird: 'willow',
        name: 'Daniel Wei',
        subteam: 'Robot, website, video',
        subteamFr: 'RObot, site web et vidéo',
        powerFr: 'Rotation vortex',
        hobbiesFr: "L'art, les échecs, le piano et le basket-ball.",
        funFactsFr: '',
        learnedFr: '',
        power: 'Vortex spin',
        hobbies: 'Art, chess, piano, and basketball.',
        funFacts:
            'When I was 10, I made a 3D cardboard piñata of a Lamborghini Veneno just to smash it to pieces days later',
        learned:
            'Working alongside talented teammates, I honed problem-solving skills through the design, testing, debugging, and enhancement of our robot for specific goals. Through trial and error, we crafted a reliable flywheel system, ensuring precise ball launches.Balancing academics and other extracurricular activities with robotics was challenging, but it taught me effective time management and organizational skills.'
    },
    ice: {
        bird: 'ice',
        name: 'Guancheng He',
        subteam: 'Website, Kiosk',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Freeze pigs and blocks',
        hobbies: 'Fencing, trombone, piano, gaming.',
        funFacts: 'I wear glasses (as you can probably see in my photo)',
        learned:
            ' I learned HTML, CSS, JavaScript and different frameworks. In addition, I learned leadership skills from our highly competent captains.I sacrificed my participation in other clubs, and part of my vacation.'
    },
    silver: {
        bird: 'silver',
        name: 'Mingruifu Lin',
        subteam: 'Website, programming',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Diving into blocks',
        hobbies: 'Math',
        funFacts: 'I have Alice in Wonderland syndrome (dw, it is harmless)',
        learned:
            'I learned how to use Rapier.js (physics library) and SvelteKit (web framework). I could not go to badminton during AP nor to the music club. And I have a week less to enjoy math and violin. I also cannot go to the gym more often.'
    },
    luca: {
        bird: 'luca',
        name: 'Yi Chen Liu',
        subteam: 'Robot',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Soundwave shock',
        hobbies:
            'I like to play music, I love building gundams (model kits), and I love to play video games.',
        funFacts: 'I love bubble tea and I love classical music :)',
        learned:
            'One thing that I learned in robotics is that Not everything is as easy as it seems. even if our ideas were good but once we start building it become very hard, but I think me and the rest of the team has found our way around this problem. I sacrificed most of my APs, which are 2-hour periods on Tuesdays and Thursdays when no students have class, and I had to sacrifice a bit of study time as well.'
    },
    dahlia: {
        bird: 'dahlia',
        name: 'Prisha Kalpesh Manek',
        subteam: 'Robot',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'High intelligence, repel objects',
        hobbies: 'Reading, badminton, napping',
        funFacts: 'My 2024 resolution is to try as many different instant noodles as possible',
        learned:
            'This year on the robotics team, I learned how to add electrical components to the parts I build. I had to give up time from some personal projects and from time spent with friends to fulfill the robotics team commitments.'
    },
    chuck: {
        bird: 'chuck',
        name: 'Sivabalan Sandh Muthurajan',
        subteam: 'Robot, programming',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
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
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Drill into hard blocks',
        hobbies: 'Video games, programming and watching movies',
        funFacts: 'I just permed.',
        learned:
            'I learn a lot about how circuitry and robots work in general. I had come in with little to no knowledge on anything but programming, so i learned a lot about how to build a robot and how each part works. I also learned how to solder. I had to sacrifice a lot of my time and my ability to join other clubs which I would have also wanted to try.'
    },
    red: {
        bird: 'red',
        name: 'Yeonjae Oh',
        subteam: 'Robot',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Mighty feathers, leadership',
        hobbies: 'Basketball, working out.',
        funFacts: "I'm a lazy ambitioner",
        learned:
            "I learned a lot about how to use pieces and tools to build a robot. I also learned that separating tasks is an important component for efficiency and teamwork. Also, discussing the design of the robot together as a team is my favourite part of robotics. In order to attend all robotics meetings, I couldn't go to other club activities."
    },
    terence: {
        bird: 'terence',
        name: 'Ruwa Qatmash (Captain)',
        subteam: 'Kiosk, robot',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Massive strength, charge, destruction',
        hobbies: 'Playing Hay Day',
        funFacts: 'I love playing Hay Day with Elisa',
        learned:
            "Since it was my first year building and decorating I learned how to organize and plan where everything needs to go and a timeline. I also learned how much I miss Hayday when I'm in robotics since I had to give up my designated Hayday time for robotics."
    },
    blue1: {
        bird: 'blue1',
        name: 'Junlin Song (Martin)',
        subteam: 'Robot',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Duplication, high intelligence',
        hobbies: 'Watching soccer, buying Legos (Star Wars), and playing mobile games',
        funFacts: "I'm 6’3 but terrible at basketbal",
        learned:
            'I learned how to use different tools, and how to make designs come to reality starting from prototyping. I also realized the importance of organization and communication skills in a workplace with a team. I had to sacrifice my last week of winter break to be at robotics which meant I had less time to prepare for the new semester. Luckily, we were productive during thatweek and were able to get a lot of work done, which should help us gain more testing time.'
    },
    blue2: {
        bird: 'blue2',
        name: 'Theo Radhakrishna',
        subteam: 'Robot',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Duplication, high intelligence',
        hobbies: 'Hockey, baseball, piano',
        funFacts: 'I am a quarter Indian and have visited family in India.',
        learned:
            'I learned how to cooperate with lots of other people to build the robot. I also learned about pretty much every part of the robot. I had to sacrifice time with friends, and study time during activity periods.'
    },
    blue3: {
        bird: 'blue3',
        name: 'Tyler Hamel-Wong',
        subteam: 'Website, kiosk',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Duplication, high intelligence',
        hobbies: 'Play the guitar',
        funFacts: 'I play the guitar',
        learned:
            'I learned how to build a couch for the kiosk and what fillings work the best to make it super comfy! I sacrificed some of my favourite clothes while painting the kiosk.'
    },
    bomb: {
        bird: 'bomb',
        name: 'Kyota Poëti',
        subteam: 'Robot',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Detonation',
        hobbies: 'Programming, playing the violin, and reading',
        funFacts: 'I specialize in cooking eggs.',
        learned:
            'I learned how to build a flywheel shooting mechanism, how to solder, and that Daniel is always right.'
    },
    bubbles: {
        bird: 'bubbles',
        name: 'Yanran Elisa Xue',
        subteam: 'Kiosk, video',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Inflate like a balloon',
        hobbies: 'Playing Hay Day with Ruwa',
        funFacts: 'I like plaster',
        learned:
            'I learned how to plaster the wooden walls and build awesome decorations like our wooden window frames.'
    },
    melody: {
        bird: 'melody',
        name: 'Ruo-Ling Wu (Carolyn)',
        subteam: 'Website, programming, kiosk',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Gather objects like a vacuum and launch them',
        hobbies: 'Programming, web development, learning new languages',
        funFacts: 'One of the only commands I know in Vim is how to exit.',
        learned:
            'For the website, I learned a lot of advanced Svelte functionality and creative CSS solutions and animations. I also learned how to build a kiosk and how to use all the tools that come with building and decorating the kiosk. I did have to sacrifice free time and sleep but robotics is worth it.'
    },
    stella: {
        bird: 'stella',
        name: 'Dominique Paradis (mentor)',
        subteam: 'Supervisor',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Bubble wand',
        hobbies: 'Astrophysics',
        funFacts: 'I am a hyperspheroid-earther',
        learned:
            'My role as the robotics mentor at Marianopolis mostly involves dealing with the aspects of the team that diverge from the main goal. In order to ensure the students focus on the key aspects of the competition—namely the robot, the kiosk, website, video, and programming—I help manage scheduling, team membership, finances, and transportation of materials.'
    },
    tony: {
        bird: 'tony',
        name: 'Zi Heng Wang (captain)',
        subteam: 'Video, robot',
        subteamFr: '',
        powerFr: '',
        hobbiesFr: '',
        funFactsFr: '',
        learnedFr: '',
        power: 'Body slam, massive strength',
        hobbies: 'Play hockey with Ruwa',
        funFacts: 'I want to become a cat',
        learned: '[description]'
    }
}
);


