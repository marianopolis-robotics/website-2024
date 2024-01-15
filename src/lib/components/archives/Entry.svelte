<script>
  export let title, text;
</script>

<div class="d-flex flex-col flex-rowalign-items-center">
  <div class="textbox">
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
  <div class="justify-content-center align-items-center">
    <slot />
  </div>
</div>

<style>
  h4 {
    font-family: 'Jockey One', sans-serif;
    text-align: center;
  }

  .textbox {
    width: 100%;
  }
</style>