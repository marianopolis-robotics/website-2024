<script>
  import BookImg from "$lib/components/archives/BookImg.svelte";
  export let date, text, img, alt, rotate;
</script>

<div class="entry d-flex flex-column">
  <BookImg src={img} {alt} {rotate} />
  <div class="textbox mt-4">
    <h4 class="date">{date}</h4>
    <p class="mb-1">{text}</p>
  </div>
</div>

<style>
  .entry {
    flex-direction: row;
  }

  @media (pointer: coarse) {
    .entry {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      align-items: flex-start;
    }
  }

  @media (pointer: fine) {
    .entry {
      margin-top: 3rem;
      margin-bottom: 3rem;
      align-items: center;
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
    font-size: 1.1rem;
    font-family: Jaldi, 'Trebuchet MS', sans-serif;
  }

  .textbox {
    width: 92%;
  }

  .textbox p {
    font-family: Jaldi, sans-serif;
  }
</style>