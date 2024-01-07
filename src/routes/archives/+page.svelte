<svelte:head>
  <meta name="description" content="The Mari Angryneers' official archives!">
  <title>Archives | Mari Angryneers</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import * as St from 'page-flip';

  let flipbook;

  onMount(() => {
    const pageFlip = new St.PageFlip(flipbook, 
    {
      width: 400,
      height: 600,
      showCover: true
    });
    pageFlip.loadFromHTML(flipbook.querySelectorAll('.my-page'));
  });
</script>

<div id="book" bind:this={flipbook}>
    <div class="my-page" data-density="hard">
        Page Cover
    </div>
    <div class="my-page">
        Page one
    </div>
    <div class="my-page">
        Page two
    </div>
    <div class="my-page">
        Page three
    </div>
    <div class="my-page">
        Page four
    </div>
    <div class="my-page" data-density="hard">
        Last page
    </div>
</div>

<style>
  .my-page {
    background: white;
  }
</style>
