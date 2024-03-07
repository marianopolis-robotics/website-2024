<script>
  import BookImg from "$lib/components/archives/BookImg.svelte";
  export let date, text, img, alt, rotate;
</script>

<div class="entry d-flex align-items-center column-gap-4 my-5">
  <BookImg src={img} {alt} {rotate} />
  <div class="textbox">
    <h4 class="date">{date}</h4>
    <p>{text}</p>
  </div>
</div>

<style>
  .entry {
    flex-direction: row;
  }

  @media screen and (min-width: 600px) {
    .entry {
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  @media screen and (min-width: 992px) {
    .entry {
      flex-direction: row;
    }
  }

  .date {
    font-family: 'Jaldi', 'Trebuchet MS', sans-serif;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .textbox {
    width: 80%;
  }

  .textbox p {
    font-family: 'Jaldi', sans-serif;
  }
</style>