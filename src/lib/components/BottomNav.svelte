<script>
  export let path;
  const btns = {
    en: {
      '/home': 'Mari Angryneering base',
      '/kryptik': 'Train for Kryptik 2024',
      '/angryneers': 'Meet the Mari Angryneers!',
      '/archives': 'Read the team archives',
      '/robot': 'Check out our robot',
      '/credits': 'Credits and inspiration',
      'https://github.com/marianopolis-robotics/website-2024': 'Our website GitHub repo'
    },
    fr: {
      '/fr/home': 'Siège des Angrynieurs Mari',
      '/fr/kryptik': 'Entraînement pour Kryptik 2024',
      '/fr/angryneers': 'Rencontrer les Angrynieurs Mari',
      '/fr/archives': 'Lire les archives de l\'équipe',
      '/fr/robot': 'Découvrir notre robot',
      '/fr/credits': 'Crédits et inspiration',
      'https://github.com/marianopolis-robotics/website-2024': 'Le dépôt GitHub du site web'
    }
  }

  $: isFr = path.includes('/fr');
  $: navBtns = isFr ? btns.fr : btns.en;
</script>

<div class="bottom-nav position-relative d-grid px-5 pt-5">
  {#each Object.entries(navBtns) as [link, text]}
    {#if link !== path}
      <a href="{link}" class="wood-btn p-3 text-decoration-none text-white text-center">
        <span class="d-inline-block inner-wood w-100 px-3 py-2">{text}</span>
      </a>
    {/if}
  {/each}
</div>

<style>
  .bottom-nav {
    z-index: 999;
  }

  .inner-wood {
    background-color: #4F250A;
    border-radius: 4px;
  }

  .wood-btn {
    background: url("/textures/wood.png") no-repeat scroll 0 0;
    background-size: cover;
    border-radius: 10px;
    font-size: 1.3rem;
    font-family: 'Angry Birds', sans-serif;
    text-shadow: 2.5px 2.5px #000;
  }

  @media screen and (min-width: 768px) {
    .bottom-nav {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem 2rem;
      font-size: 1.75rem;
    }
  }

  @media screen and (min-width: 1024px) {
    .bottom-nav {
      gap: 1.5rem 2.5rem;
      font-size: 2rem;
    }
  }
</style>