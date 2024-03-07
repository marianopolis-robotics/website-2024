<script>
  export let name;
  export let isFr = false;

  const warning = isFr ? 'Attention: si vous redémarrez la simulation, quittez cette page ou fermez cet onglet avant la fin d\'une joute, vous perdrez tout progrès dans la simulation!'
    : 'Warning: if you restart, leave the page or close the tab before completing the heat, you will lose all progress in the simulation!';
</script>

<h2 class="text-center display-4 mt-5 mb-3 text-black">{isFr ? 'Prêt à jouer' : 'Ready to play'}, {name ? name : (isFr ? 'Angrynieur' : 'Angryneer')}?</h2>
<hr class="w-50 mx-auto text-dark opacity-75" />
<p class="py-4 px-5 text-center instructions mx-5 mb-5 text-black">
  <slot />
  <span class="warning mt-3 mb-0">{warning}</span>
</p>

<style>
  p {
		font-size: 1.5rem;
		line-height: 2;
	}

  .instructions {
		margin-top: 2rem;
		background-color: rgba(255, 237, 194, 0.6);
		border-radius: 10px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
		border: solid 0.5px #332400;
	}

	.instructions .warning {
		color: #b80000;
	}
</style>