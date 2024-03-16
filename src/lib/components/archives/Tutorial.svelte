<script>
export let isFr = false;
</script>

<h2 class="text-center display-4 mt-3 mb-3 text-black">{isFr ? 'Tutoriel' : 'Tutorial'}</h2>
<hr class="w-50 mx-auto text-dark opacity-75" />
<div class="mx-4 mx-sm-5 mb-5 py-4 px-5 tutorial">
  <p class="mb-0">
    {isFr ? 'Voulez-vous apprendre comment concevoir un site web exceptionnel? Regardez notre tutoriel pour en savoir plus et pour découvrir comment nous avons planifié notre site web (que vous consultez en ce moment)!' 
      : 'Want to learn more about designing amazing websites? Watch our tutorial to find out and see how we planned our website (which you\'re viewing right now)!'}

  </p>
</div>

<style>
  .tutorial {
    background-color: rgba(255, 237, 194, 0.6);
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
		border: solid 0.5px #332400;
    font-size: 1.5rem;
  }
</style>