<script>
  export let name;
  export let isFr = false;
  import CRC from '$lib/assets/kryptik/crc.png';
  import KryptikLogo from '$lib/assets/kryptik/kryptik-logo.png';

  let displayName = name ? name : (isFr ? 'Angrynieur' : 'Angryneer');

  const text = {
    en: [
      `We're very excited to see that you're interested in Kryptik, ${displayName}! The Kryptik Angryneering competition is organized each year by the CRC to commemorate the victorious attack on the King Pig's castle, which allowed us to rightfully retrieve the
	    eggs. This year, Kryptik 2024 will take place at École Curé-Antoine-Labelle (216 Blvd Marc-Aurèle-Fortin, Laval, QC) from April 11th to 13th!`,
      `The first Angryneers formed the non-profit CRC organization in 2001, then designed an angryneering game to replicate the tactics used during the war against the pigs, removing the original dangerous launching mechanism. In fact, they
	    developed a mechanism to launch projectiles other than the birds (angryneers) themselves!`,
      `New to the Kryptik competition or unfamiliar with angryneering in general? We've prepared detailed instructions below for you to
	    read before entering the arena! If you want to go the extra mile, you can train for Kryptik 2024 using our 3D simulation!`
    ],
    fr: [
      `Nous sommes ravis que vous vous intéressiez à Kryptik, ${displayName}! La compétition d'angrynierie annuelle Kryptik est organisée chaque année par la CRC pour commémorer l\'attaque victorieuse contre le château du Roi Cochon, nous permettant de récupérer les œufs qui nous appartiennent. Cette année, Kryptik 2024 aura lieu à École Curé-Antoine-Labelle (216 Boul Marc-Aurèle-Fortin, Laval, QC) du 11 au 13 avril!`,
      `Les premiers angrynieurs ont formé l\'organisation à but non lucratif CRC en 2001. Ils ont ensuite créé un jeu d\'angrynierie pour reproduire les tactiques employées durant la guerre contre les cochons, mais sans le mécanisme de projection original. En fait, ils ont conçu un mécanisme qui lance des projectiles autre que les oiseaux (angrynieurs) eux-mêmes!`,
      `Jamais participé à la compétition Kryptik ou novice en matière de l\'angrynierie en général? Nous vous avons préparé des instructions détaillées à lire avant d\'entrer dans l\'arène! Si vous voulez faire un effort supplémentaire, vous pouvez vous entraîner pour Kryptik 2024 avec notre simulation 3D!`
    ]
  }

  let intro = isFr ? text.fr : text.en;
</script>

<h1 class="mx-2 my-5 mb-lg-4 display-1 text-white text-center">Kryptik</h1>

<div class="desc m-3 m-sm-5 px-4 px-md-5 py-3 py-md-4 d-grid">
  <p class="mb-3 lh-lg text-black">{intro[0]}</p>
  <img class="logo" src={CRC} alt="{isFr ? 'Logo CRC' : 'CRC logo'}" />
  <p class="mt-3 mb-4 lh-lg text-black">{intro[1]}</p>
  <img class="logo" src={KryptikLogo} alt="{isFr ? 'Logo Kryptik' : 'Kryptik logo'}" />
  <p class="mt-3 mb-4 lh-lg text-black">{intro[2]}</p>
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

  .logo {
    width: 100%;
    justify-self: center;
  }

  @media screen and (min-width: 768px) {
    .logo {
      width: 75%;
    }
  }

  @media screen and (min-width: 992px) {
    .logo {
      width: 50%;
    }
  }

  @media screen and (min-width: 1200px) {
    .logo {
      width: 460px;
    }
  }
</style>