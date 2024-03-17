<script>
  export let isFr = false;

  const credits = {
    en: ['The Mari Angryneers and this website are inspired by the Angry Birds game, a trademark of Rovio Entertainment. Characters such as Red, Chuck, Blues and more, in addition to the Angry Birds font, are property of Rovio Entertainment. The CRC logo and Kryptik logo are property of CRC Robotics and were used with permission.',
         'All remaining assets are licensed under Creative Commons or our team\'s original creations. Drawings are by Elisa Xue and 3D models are by Adelina Badea. This website was developed using Svelte.js and Bootstrap: please see our GitHub repository for details.',
         'Please note that Marianopolis Robotics is not, and does not claim to be, affiliated with the Rovio Entertainment Corporation or its subsidiaries in any manner.'],
    fr: ['Les angrynieurs Mari et ce site web s\'inspirent du jeu Angry Birds, une marque déposée de Rovio Entertainment. Les personnages tels que Red, Chuck, Blues et ainsi de suite, en plus de la police Angry Birds, sont la propriété de Rovio Entertainment. Le logo CRC et le logo Kryptik sont des marques de Robotique CRC et elles étaient utilisées avec autorisation.',
         'Toute autre ressource infographique est sous licence de Creative Commons ou une création originale de notre équipe. Dessins par Elisa Xue et modèles 3D par Adelina Badea. Ce site web a été développé avec Svelte.js et Bootstrap: veuillez consulter notre dépôt GitHub pour en savoir plus.',
         'Veuillez noter que Robotique Marianopolis n\'est pas, ni ne prétend être affilié à Rovio Entertainment Corporation ou ses filiales de quelque manière que ce soit.']
  }

  let creditText = isFr ? credits.fr : credits.en;
</script>

{#each creditText as p}
  <p>{p}</p>
{/each}
<hr class="border border-dark my-4 my-xl-5" />

<style>
  p {
    font-size: 1.1rem;
  }

  @media screen and (min-width: 768px) {
    p {
      font-size: 1.5rem;
    }
  }
</style>