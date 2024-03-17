<script>
export let isFr = false;
</script>

<h2 class="text-center display-4 mt-3 mb-3 text-black">{isFr ? 'Tutoriel' : 'Tutorial'}</h2>
<hr class="w-50 mx-auto text-dark opacity-75" />
<div class="mx-4 mx-sm-5 mb-5 py-4 px-5 tutorial desc-box">
  <p class="mb-4">
    {isFr ? 'Voulez-vous apprendre comment concevoir un site web exceptionnel? Regardez notre tutoriel pour en savoir plus et pour découvrir comment nous avons planifié notre site web (que vous consultez en ce moment)!' 
      : 'Want to learn more about designing amazing websites? Watch our tutorial to find out and see how we planned our website (which you\'re viewing right now)!'}
  </p>
  <iframe src="https://www.youtube.com/embed/OcvOn_SFodk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

<style>
  .tutorial {
    font-size: 1.5rem;
  }

  iframe {
    width: 100%;
    aspect-ratio: 1/1;
  }

  @media screen and (min-width: 992px) {
    iframe {
      aspect-ratio: 16/9;
    }
  }
</style>