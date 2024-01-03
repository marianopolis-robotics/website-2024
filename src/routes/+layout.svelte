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

<div class="main-content">
  <slot />
</div>