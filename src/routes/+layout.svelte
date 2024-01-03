<script>
  import NavBar from "../components/NavBar.svelte";
  import { page } from '$app/stores';

  $: path = $page.url.pathname; // layout doesn't (seem to) unmount/mount between pages with the same layout
                                // meaning path needs to be reactive so that the correct active page/link
                                // can be detected here and passed to the navbar
</script>

{#if path !== '/' && path !== '/fr'}
  <NavBar {path} />
{/if}

<div id="main-content">
  <slot />
</div>

<style>
  /* need to override some Bootstrap styles here (not enough specificity/precedence in `styles.css`) */
  div#main-content {
    font-family: 'Jockey One';
  }

  :global(body) {
    width: 100%;
    height: 100%;
    background-image: url('/backdrops/angrybirds-island-sm.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 70% 50%;
  }
  
  @media screen and (min-width: 1024px) {
    :global(body) {
      background-image: url('/backdrops/angrybirds-island.png');
      background-position: 50% 50%;
      background-size: cover;
    }
  }
</style>