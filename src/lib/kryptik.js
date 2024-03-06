import FieldImage from '$lib/assets/kryptik/field.png';
import GamePieceImage from '$lib/assets/kryptik/game-piece.png';
import SmallTargetImage from '$lib/assets/kryptik/small-target.png';
import BigTargetImage from '$lib/assets/kryptik/big-target.png';
import FloorScoreImage from '$lib/assets/kryptik/floor-score.png';
import MultiplierImage from '$lib/assets/kryptik/multiplier.png';
import MultFactorImage from '$lib/assets/kryptik/mult-factor.png';

// kryptik carousel info
export const enSlides = {
  1: {
    images: [{ url: FieldImage, alternate_text: 'Field' }],
    text: 'This is the playing field. A hill with 3 gutters in the middle divides the playing field in 2 halves. Each half is in turn divided into 3 zones by red speed bumps. In the center, there is a neutral zone colored in red at the top of the hill. \n\n Your robot may only operate in the half of the terrain on which it started and the central neutral zone. Be careful to not cross to the other side! The perimeter of the playing field is also surrounded by a 12.7 cm-tall border.'
  },
  2: {
    images: [{ url: GamePieceImage, alternate_text: 'Game piece' }],
    text: 'This is a game piece. A total of 42 game pieces are available at the start of the game. Each central gutter will hold 10 game pieces,for a total of 30. Each starting area will have 3 game pieces each, whether loaded on the robot or placed inside the starting area. \n\n Each robot can hold a maximum of 10 game pieces at any given moment during the game. Moreover, game pieces can be compressed to a maximum of 1 inch when handled by the robot. However, be careful not to damage them or launch them outside the playing field!'
  },
            
  3: {
    images: [],
    text: 'You and your teammate will each start the game in one of the designated starting areas of the color of your team, either blue or yellow.'
  },
  
  4: {
    images: [
      { url: SmallTargetImage, alternate_text: 'Small target' },
      { url: BigTargetImage, alternate_text: 'Big target' },
      { url: FloorScoreImage, alternate_text: 'Floor score' }
    ],
    text: 'Now we\'re getting to the fun part! The objective of the game is to score as many points as possible with your teammate.There are 3 ways to score points in the Kryptik game. \n\n 1. Small targets are worth 50 points per game piece exiting through the lower floor. The small target is worth 25 points per game piece exiting from the upper floor. \n\n 2. Each large target is worth 250 points per game piece entering it. \n\n 3. At the end of the joust, game pieces on the ground are awarded points according to where they are after they stop moving. The following image shows the point values for each zone, delimited by the red speed bumps, the sides of the playing field and the neutral zone at the top of the hill.'
  },
  
  5: {
    images: [
      { url: MultiplierImage, alternate_text: 'Multiplier' },
      { url: MultFactorImage, alternate_text: 'Multiplication factors' }
    ],
    text: 'But there is a catch: 3 multipliers are located on each side of the playing field! They allow a team to boost their score by a multiplication factor. To activate them, simply place a game piece on top. The game piece must remain in place without being transported by a robot to remain active! \n\n Here is the multiplier allocated to each team according to the number of active pillars on each side of the playing field at the end of the game.'
  },
  
  6: {
    images: [],
    text: 'You are now ready to enter the arena, angryneer! Remember, you only have 5 minutes to score the maximum number of points! \n\n Best of luck, fellow angryneer, take to the skies!'
  }
};

export const frSlides = {
  1: {
    images: [{ url: FieldImage, alternate_text: 'Terrain' }],
    text: 'Voici le terrain de jeu. A hill with 3 gutters in the middle divides the playing field in 2 halves. Each half is in turn divided into 3 zones by red speed bumps. In the center, there is a neutral zone colored in red at the top of the hill. \n\n Your robot may only operate in the half of the terrain on which it started and the central neutral zone. Be careful to not cross to the other side! The perimeter of the playing field is also surrounded by a 12.7 cm-tall border.'
  },
  2: {
    images: [{ url: GamePieceImage, alternate_text: 'Game piece' }],
    text: 'Ceci est une pièce de jeu. A total of 42 game pieces are available at the start of the game. Each central gutter will hold 10 game pieces,for a total of 30. Each starting area will have 3 game pieces each, whether loaded on the robot or placed inside the starting area. \n\n Each robot can hold a maximum of 10 game pieces at any given moment during the game. Moreover, game pieces can be compressed to a maximum of 1 inch when handled by the robot. However, be careful not to damage them or launch them outside the playing field!'
  },
            
  3: {
    images: [],
    text: '(FR) You and your teammate will each start the game in one of the designated starting areas of the color of your team, either blue or yellow.'
  },
  
  4: {
    images: [
      { url: SmallTargetImage, alternate_text: 'Petite cible' },
      { url: BigTargetImage, alternate_text: 'Big target' },
      { url: FloorScoreImage, alternate_text: 'Floor score' }
    ],
    text: '(FR) Now we\'re getting to the fun part! The objective of the game is to score as many points as possible with your teammate.There are 3 ways to score points in the Kryptik game. \n\n 1. Small targets are worth 50 points per game piece exiting through the lower floor. The small target is worth 25 points per game piece exiting from the upper floor. \n\n 2. Each large target is worth 250 points per game piece entering it. \n\n 3. At the end of the joust, game pieces on the ground are awarded points according to where they are after they stop moving. The following image shows the point values for each zone, delimited by the red speed bumps, the sides of the playing field and the neutral zone at the top of the hill.'
  },
  
  5: {
    images: [
      { url: MultiplierImage, alternate_text: 'Multiplier' },
      { url: MultFactorImage, alternate_text: 'Multiplication factors' }
    ],
    text: '(FR) But there is a catch: 3 multipliers are located on each side of the playing field! They allow a team to boost their score by a multiplication factor. To activate them, simply place a game piece on top. The game piece must remain in place without being transported by a robot to remain active! \n\n Here is the multiplier allocated to each team according to the number of active pillars on each side of the playing field at the end of the game.'
  },
  
  6: {
    images: [],
    text: '(FR) You are now ready to enter the arena, angryneer! Remember, you only have 5 minutes to score the maximum number of points! \n\n Best of luck, fellow angryneer, take to the skies!'
  }
};
