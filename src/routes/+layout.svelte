<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import '$lib/global.css';
  import NavBar from "$lib/components/NavBar.svelte";
  import BottomNav from '$lib/components/BottomNav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  $: path = $page.url.pathname; // layout doesn't (seem to) unmount/mount between pages with the same layout
                                // meaning path needs to be reactive so that the correct active page/link
                                // can be detected here and passed to the navbar

  const isLanding = (path) => path === '/' || path === '/fr';
</script>

<NavBar {path} />

{#key path}
  <div in:fade={!isLanding(path) ? { duration: 700, delay: 500, easing: backOut } : { duration: 1000, easing: backOut }} class="w-100">
    <main id="main-content">
      <slot />
    </main>
    {#if !isLanding(path)}
      <BottomNav {path} />
      <Footer {path} />
    {/if}
    <div class="skyWaves position-absolute" class:top-0={isLanding(path)}></div>
    <div class="islands position-absolute"></div>

    <img src="/backdrops/cloud-1.png" alt="Cloud" class="position-absolute cloud one" />
    <img src="/backdrops/cloud-2.png" alt="Cloud" class="position-absolute cloud two" />
    <img src="/backdrops/cloud-2.png" alt="Cloud" class="position-absolute cloud three" />
    <img src="/backdrops/cloud-1.png" alt="Cloud" class="position-absolute cloud four d-none d-sm-block" />
    <img src="/backdrops/cloud-2.png" alt="Cloud" class="position-absolute cloud five d-none d-md-block" />
    <img src="/backdrops/cloud-1.png" alt="Cloud" class="position-absolute cloud six d-none d-md-block" />
    <img src="/backdrops/cloud-2.png" alt="Cloud" class="position-absolute cloud seven" />
    <img src="/backdrops/cloud-1.png" alt="Cloud" class="position-absolute cloud eight" />
  </div>
{/key}

<style>
  @font-face {
    font-family: "Angry Birds";
    font-style: normal;
    font-weight: 400 500;
    src: url('/fonts/angrybirds-regular.ttf') format('truetype');
  }

  main#main-content {
    font-family: 'Jockey One';
    position: relative;
    z-index: 500;
  }

  .islands {
    bottom: 0;
    width: 100%;
    height: 50%;
    background-image: url('/backdrops/islands.png');
    background-repeat: repeat-x;
    background-size: auto 100%;
    user-select: none;
  }

  .skyWaves {
    top: 66px;
    width: 100%;
    height: 70%;
    background-image: url('/backdrops/sky-waves.png');
    background-size: 100% 100%;
    user-select: none;
  }

  .cloud {
    opacity: 0.75;
    user-select: none;
  }

  .cloud.one {
    top: 13%;
    left: 15%;
  }

  .cloud.two {
    top: 32%;
    left: 1%;
  }

  .cloud.three {
    top: 23%;
    right: 9%;
  }

  .cloud.four {
    top: 16%;
    right: 4%;
  }

  .cloud.seven {
    top: 57%;
    right: 5%;
  }

  .cloud.eight {
    top: 42%;
    right: 28%;
  }

  @media screen and (min-width: 576px) {
    .cloud.one {
      top: 13%;
      left: 15%;
    }

    .cloud.two {
      top: 32%;
      left: 1%;
    }

    .cloud.three {
      top: 23%;
      right: 40%;
    }

    .cloud.four {
      top: 16%;
      right: 4%;
    }

    .cloud.seven {
      top: 55%;
      left: 30%;
    }

    .cloud.eight {
      top: 42%;
      right: 25%;
    }
  }

  @media screen and (min-width: 768px) {
    .cloud.one {
      top: 12%;
      left: 15%;
    }
  
    .cloud.two {
      top: 30%;
      left: 1%;
    }
  
    .cloud.three {
      top: 20%;
      right: 40%;
    }
  
    .cloud.four {
      top: 15%;
      right: 4%;
    }
  
    .cloud.five {
      top: 30%;
      right: 12%;
    }
  
    .cloud.six {
      top: 35%;
      left: 29%;
    }
  
    .cloud.seven {
      top: 55%;
      left: 20%;
    }
  
    .cloud.eight {
      top: 42%;
      right: 25%;
    }
  }

  @media screen and (min-width: 992px) {
    .skyWaves {
      top: 0;
      height: 100%;
    }
  }

  @media screen and (min-width: 1440px) {
    .cloud.seven {
      left: 13%;
    }
  }
</style>