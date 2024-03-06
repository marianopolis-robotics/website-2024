<script>
	export let path;

	const ftText = {
		en: {
			title: 'The Mari Angryneers',
			credits: 'Based on Angry Birds by Rovio Entertainment Corporation.',
			copyright: '© 2024 Marianopolis Robotics. All rights reserved.'
		},
		fr: {
			title: 'Les Angrynieurs Mari',
			credits: 'Basé sur Angry Birds de Rovio Entertainment Corporation.',
			copyright: '© 2024 Robotique Marianopolis. Tous droits réservés.'
		}
	};

	$: isFr = path.includes('/fr');
	$: footer = isFr ? ftText.fr : ftText.en;
</script>

<footer class="position-relative p-4 d-flex flex-column align-items-center">
	<h1 class="text-white mb-3 display-5">{footer.title}</h1>
	<span><a href="{isFr ? '/fr' : ''}/credits">{footer.credits}</a></span>
	<p class="mb-0">
		<a href="https://github.com/marianopolis-robotics/website-2024">{footer.copyright}</a>
	</p>
</footer>

<style>
	footer {
		z-index: 1;
		background-color: #b66310;
		border-top: solid 2px #331a00;
		border-bottom: solid 1px #b66310; /* fills in some "whitespace" in background so that islands graphic reach the bottom */
	}

	footer span a,
	footer p a {
		text-decoration: none;
		font-family: 'Jockey One', sans-serif;
		color: #000;
		font-size: 1.2rem;
	}

	footer span a:hover,
	footer p a:hover {
		text-decoration: underline;
	}

	@media screen and (min-width: 768px) {
		footer span a,
		footer p a {
			font-size: 1.3rem;
		}
	}
</style>
