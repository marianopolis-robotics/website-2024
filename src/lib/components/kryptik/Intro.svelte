<script>
  export let name;
  export let isFr = false;

  let displayName = name ? name : (isFr ? 'Angrynieur' : 'Angryneer');

  const text = {
    en: [
      `We're very excited to see that you're interested in Kryptik, ${displayName}! The Kryptik Angryneering competition is organized each year by the CRC to commemorate the victorious attack on the King Pig's castle, which allowed us to rightfully retrieve the
	    eggs. This year, Kryptik 2024 will take place at École Curé-Antoine-Labelle (216 Blvd Marc-Aurèle-Fortin, Laval, QC) from April 11th to 13th!`,
      `The first Angryneers formed the non-profit CRC organization in 2001, then designed an angryneering game to replicate the tactics used during the war, removing the original dangerous launching mechanism. In fact, they
	    developed a mechanism to launch projectiles other than themselves! First, read the instructions before entering the arena.`,
      `New to the Kryptik competition or unfamiliar with angryneering in general? We've prepared detailed instructions below for you to
	    read before entering the arena! If you want to go the extra mile, you can train for Kryptik 2024 using our 3D simulation!`
    ],
    fr: [
      `Nous sommes ravis que vous vous intéressez à Kryptik, ${displayName}! La compétition d'angryneering annuelle Kryptik est organisée chaque année par la CRC to commemorate the victorious attack on the King Pig's castle, which allowed us to rightfully retrieve the
	    eggs. Cette année, Kryptik 2024 aura lieu à École Curé-Antoine-Labelle (216 Blvd Marc-Aurèle-Fortin, Laval, QC) les 11 à 13 avril!`,
      `The first Angryneers formed the non-profit CRC organization in 2001, then designed an angryneering game to replicate the tactics used during the war, removing the original dangerous launching mechanism. In fact, they
	    developed a mechanism to launch projectiles other than themselves! First, read the instructions before entering the arena.`,
      `New to the Kryptik competition or unfamiliar with angryneering in general? We've prepared detailed instructions below for you to
	    read before entering the arena! If you want to go the extra mile, you can train for Kryptik 2024 using our 3D simulation!`
    ]
  }

  let intro = isFr ? text.fr : text.en;
</script>

<h1 class="mx-2 my-5 mb-lg-4 display-1 text-white text-center">Kryptik</h1>

<div class="desc m-5 px-5 py-4">
  <p class="mb-4 lh-lg text-black">{intro[0]}</p>
  <p class="mb-4 lh-lg text-black">{intro[1]}</p>
  <p class="mb-4 lh-lg text-black">{intro[2]}</p>
</div>

<style>
  .desc {
    background-color: rgba(255, 237, 194, 0.6);
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
    border: solid 0.5px #332400;
  }
  
  p {
		font-size: 1.5rem;
		line-height: 2;
	}
</style>