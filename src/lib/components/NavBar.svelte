<script>
  import { slide } from 'svelte/transition';
  import { bounceOut } from 'svelte/easing';
  import smNavbarBrandMeta from '$lib/assets/logos/mari-angryneers-xs.png?w=75;100&format=avif;webp;png&as=picture';
  import navbarBrandMeta from '$lib/assets/logos/mari-angryneers-sm.png?w=150&format=avif;webp;png&as=picture';
  import Picture from '$lib/components/Picture.svelte';
  export let path;

  const enLinks = {
    "Home": "/home",
    "Kryptik": "/kryptik",
    "Angryneers": "/angryneers",
    "Archives": "/archives",
    "Robot": "/robot"
  };

  const frLinks = {
    "Accueil": "/fr/home",
    "Kryptik": "/fr/kryptik",
    "Angryneers": "/fr/angryneers",
    "Archives": "/fr/archives",
    "Robot": "/fr/robot"
  };

  // (after lots of testing) these need to be reactive, otherwise they won't update when `path` changes
  $: isFr = path.includes('/fr');
  $: navLinks = (isFr ? frLinks : enLinks);
  $: switchLink = isFr ? path.slice(3) : `/fr${path}`;
</script>

{#key path}
  <!-- check this condition here to play the nav bounce animation even after navigating to (home) page through landing/root page -->
  {#if path !== '/' && path !== '/fr'}
    <nav class="navbar navbar-expand-lg mainNav position-relative" in:slide|global={{ duration: 1000, easing: bounceOut }}>
      <div class="container-fluid navContainer align-items-center">
        <a class="navbar-brand" href="{isFr ? '/fr' : ''}/home">
          <Picture meta={smNavbarBrandMeta}
            sizes="(min-width: 768px) 100px, 75px" 
            alt={isFr ? "Angryneers de Mari" : "Mari Angryneers"} 
            loading="eager"
            pictureClass="d-block d-lg-none" />
          <Picture meta={navbarBrandMeta}
            sizes="150px" 
            alt={isFr ? "Angryneers de Mari" : "Mari Angryneers"} 
            loading="eager"
            pictureClass="d-none d-lg-block" />
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navLinks" id="navbarNav">
          <ul class="navbar-nav text-center w-100 justify-content-lg-between">
            <!-- use an each loop to generate navlinks efficiently (avoids hard-coding and repetition for page names, links, language/active-navlink checking logic) -->
            {#each Object.entries(navLinks) as [page, link] (page)}
              <li class="nav-item">
                <a href={link} class="link-offset-1 nav-link{link === path ? ' active text-decoration-underline' : ''}">{page}</a>
              </li>
            {/each}
            <li class="nav-item langSwitcher">
              <a href={switchLink} class="nav-link">{isFr ? 'English' : 'Français'}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 2 wooden posts for the sign -->
      <div class="d-none d-lg-block position-absolute woodenPost left"></div>
      <div class="d-none d-lg-block position-absolute woodenPost right"></div>
    </nav>
  {/if}
{/key}

<style>
  @font-face {
    font-family: "Angry Birds";
    font-style: normal;
    font-weight: 400 500;
    src: url('/fonts/angrybirds-regular.ttf') format('truetype');
  }

  .mainNav {
    background-image: url('/textures/wood.png');
    background-size: 100% 66px; /* nav height is 66px for the mobile/collapse version */
    font-family: 'Angry Birds', sans-serif;
    z-index: 999;
  }

  .woodenPost {
    background-image: url('/textures/wood-post.png');
    background-repeat: no-repeat;
    background-position: 67% -145px;
    width: 40px;
    height: 80px;
    top: 0;
  }

  .woodenPost.left {
    left: 250px;
  }

  .woodenPost.right {
    right: 85px;
  }

  .navContainer {
    padding: 0;
    z-index: 999;
  }

  .navbar-brand {
    margin-left: 1rem;
  }

  .navbar-toggler {
    margin-right: 1.25rem;
    background: #ffffff90; /* full opacity bg is a little too "intense" */
  }
  
  .nav-item a.nav-link {
    color: #fff;
    text-shadow: 2.5px 2.5px #000;
  }

  .nav-item:hover a.nav-link {
    color: black;
    text-shadow: none;
  }

  .nav-item.langSwitcher {
    border-bottom: solid 2px #562600;
  }

  /* we use different styling for the wood texture look depending on mobile (collapsed) vs. desktop (expanded) nav */
  .nav-item {
    background-image: url('/textures/wood.png');
    font-size: 30px;
    background-size: 100% 100%;
  }

  @media screen and (min-width: 992px) {
    .mainNav, .nav-item {
      background-image: none;
    }

    .nav-item.langSwitcher {
      border: none;
    }

    .navContainer {
      padding-left: 1rem;
      padding-right: 1rem;
      justify-content: center;
    }

    .navbar-brand {
      margin-left: 0.25rem;
      /* margin-left: 0rem; */
    }

    .navbar-toggler {
      margin-right: 0;
    }

    .navLinks {
      padding-left: 3rem;
      padding-right: 3rem;
    }

    .navLinks {
      border-radius: 50px;
      background-image: url('/textures/wood.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  @media screen and (min-width: 1600px) {
    .navLinks {
      max-width: 80%;
      padding-left: 5rem;
      padding-right: 5rem;
    }

    .navContainer {
      justify-content: space-evenly;
    }

    .nav-item {
      font-size: 35px;
    }

    .woodenPost.left {
      left: calc(20% + 1rem);
    }

    .woodenPost.right {
      right: calc(10% - 2.25rem);
    }
  }

  @media screen and (min-width: 2000px) {
    .woodenPost.left {
      left: calc(18% + 2.5rem);
    }

    .woodenPost.right {
      right: calc(8.5% + 1.5rem);
    }
  }
</style>