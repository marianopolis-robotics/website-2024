<script>
export let isFr = false;
</script>

<h2 class="text-center display-4 mt-3 mb-3 text-black">{isFr ? 'Tutoriel' : 'Tutorial'}</h2>
<hr class="w-50 mx-auto text-dark opacity-75" />
<div class="pt-2 pb-3 mx-4 mx-sm-5 mb-5 rounded-box-container tutorial">
  {isFr ? 'Vidéo' : 'Video'}
</div>

<style>
  .tutorial {
    background-color: rgba(255, 237, 194, 0.6);
  }
</style>