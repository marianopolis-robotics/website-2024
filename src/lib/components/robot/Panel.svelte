<h1 class="col text-center text-white display-1 mt-5 mt-lg-0">Robot</h1>
<div class="grid p-5 mt-5 wood-sign position-relative">
  <slot />
</div>

<style>
  .wood-sign {
		background-image: url('/textures/wood-sign.png');
		background-size: 100% auto;
		background-repeat: repeat-y;
		margin-left: 2rem;
		margin-right: 2rem;
		filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
	}

  @media screen and (min-width: 1024px) {
    .wood-sign {
      margin-left: 3rem;
      margin-right: 3rem;
    }
  }

	@media screen and (min-width: 1440px) {
		.wood-sign {
			margin-left: 10%;
			margin-right: 10%;
		}
	}
</style>