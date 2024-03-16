<script>
  import BookImg from "$lib/components/archives/BookImg.svelte";
  export let date = '';
  export let text = '';
  export let img = '';
  export let alt = '';
  export let rotate = '';
</script>

<div class="entry d-flex flex-column align-items-center">
  {#if img}
    <BookImg src={img} {alt} {rotate} />
  {/if}

  {#if date && text}
    <div class="textbox">
      <h4 class="date">{date}</h4>
      <p class="mb-1">{text}</p>
    </div>
  {/if}
</div>

<style>
  .entry {
    flex-direction: row;
  }

  @media (pointer: coarse) {
    .textbox {
      font-size: 1rem;
    }

    .date {
      font-size: 1.1rem;
    }
  }

  @media (pointer: fine) {
    .entry {
      margin-top: 3rem;
      margin-bottom: 1rem;
    }

    .date {
      margin-top: 1.5rem;
      font-size: 1.25rem;
    }

    .textbox {
      width: 92%;
      font-size: 1.1rem;
    }
  }

  @media screen and (min-width: 600px) {
    .entry {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  @media screen and (min-width: 992px) {
    .entry {
      flex-direction: row;
    }
  }

  .date {
    font-weight: bold;
    font-family: Jaldi, 'Trebuchet MS', sans-serif;
  }

  .textbox p {
    font-family: Jaldi, sans-serif;
  }
</style>