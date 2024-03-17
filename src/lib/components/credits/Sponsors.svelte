<script>
  export let isFr = false;

  const desjardins = isFr ? 'Cette année, notre équipe est commanditée par Desjardins. Un grand merci de nous tous à Desjardins pour leur précieux soutien!' : 'Our team is sponsored by Desjardins this year. A big thank you from us to Desjardins for their generous support!';
</script>

<div class="d-lg-flex column-gap-lg-4 column-gap-xl-5 align-items-lg-center">
  <img class="desjardins" src="/logos/desjardins.svg" alt="{isFr ? 'Logo Desjardins' : 'Desjardins logo'}" />
  <p class="mt-3 mb-0 mt-lg-0">{desjardins}</p>
</div>

<style>
  .desjardins {
    width: 100%;
  }

  p {
    font-size: 1.1rem;
  }

  @media screen and (min-width: 768px) {
    p {
      font-size: 1.5rem;
    }
  }

  @media screen and (min-width: 992px) {
    .desjardins {
      width: 40%;
    }
  }

  @media screen and (min-width: 1200px) {
    .desjardins {
      width: 30%;
    }
  }
</style>