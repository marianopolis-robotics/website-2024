<script>
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
    "Angrynieurs": "/fr/angryneers",
    "Archives": "/fr/archives",
    "Robot": "/fr/robot"
  };

  // (after lots of testing) these need to be reactive, otherwise they won't update when `path` changes
  $: isFr = path.includes('/fr');
  $: navLinks = (isFr ? frLinks : enLinks);
  $: switchLink = isFr ? path.slice(3) : `/fr${path}`;
</script>

<nav class="navbar navbar-expand-lg mainNav position-relative">
  <div class="container-fluid navContainer">
    <a class="navbar-brand" href="/home">
      <img src="/favicon.png" alt="Mari Angryneers" />
    </a>
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse navLinks px-lg-5" id="navbarNav">
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

<style>
  @font-face {
    font-family: "Angry Birds";
    font-style: normal;
    font-weight: 400 500;
    src: url('/fonts/angrybirds-regular.ttf') format('truetype');
  }

  .navbar-brand img {
    height: 75px;
  }

  .mainNav {
    background-image: url('/textures/wood.png');
    background-size: 100% 66px; /* nav height is 66px for the mobile/collapse version */
    font-family: 'Angry Birds', sans-serif;
  }

  .woodenPost {
    background-image: url('/textures/wood-post.png');
    background-repeat: no-repeat;
    background-position: 50% -187px;
    width: 40px;
    height: 50px;
    top: 0;
  }

  .woodenPost.left {
    left: 200px;
  }

  .woodenPost.right {
    right: 85px;
  }

  .navContainer {
    padding: 0;
    z-index: 999;
  }

  .navbar-brand {
    margin-left: 0.75rem;
  }

  .navbar-toggler {
    margin-right: 0.75rem;
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

    .navbar-brand img {
      height: 100px;
    }

    .nav-item.langSwitcher {
      border: none;
    }

    .navContainer {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .navbar-brand {
      margin-left: 0;
    }

    .navbar-toggler {
      margin-right: 0;
    }

    .navLinks {
      border-radius: 50px;
      background-image: url('/textures/wood.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

  }
</style>