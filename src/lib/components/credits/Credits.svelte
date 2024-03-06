<script>
  export let isFr = false;

  const credits = {
    en: ['The Mari Angryneers and this website are inspired by the Angry Birds game, a trademark of Rovio Entertainment. Characters such as Red, Chuck, Blues and more, in addition to the Angry Birds font, are property of Rovio Entertainment.',
         'All remaining assets are licensed under Creative Commons or the team\'s original creations. Drawings are by Elisa Xue and 3D models are by Adelina Badea. This website was developed using Svelte.js and Bootstrap: see our GitHub repository for details.',
         'Please note that Marianopolis Robotics is not, and does not claim to be, affiliated with the Rovio Entertainment Corporation or its subsidiaries in any manner.'],
    fr: ['The Mari Angryneers and this website are inspired by the Angry Birds game, a trademark of Rovio Entertainment. Characters such as Red, Chuck, Blues and more, in addition to the Angry Birds font, are property of Rovio Entertainment.',
         'All remaining assets are licensed under Creative Commons or the team\'s original creations. Drawings are by Elisa Xue and 3D models are by Adelina Badea. This website was developed using Svelte.js and Bootstrap: see our GitHub repository for details.',
         'Please note that Marianopolis Robotics is not, and does not claim to be, affiliated with the Rovio Entertainment Corporation or its subsidiaries in any manner.']
  }

  let creditText = isFr ? credits.fr : credits.en;
</script>

{#each creditText as p}
  <p class="fs-4">{p}</p>
{/each}
<hr class="border border-dark my-4 my-xl-5" />