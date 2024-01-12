<script>
  import { onMount } from 'svelte';
	import * as St from 'page-flip';

	let flipbook, pageFlip;

	onMount(() => {
		pageFlip = new St.PageFlip(flipbook, {
			width: 500,
			height: 600,
			size: 'stretch',
			minWidth: 280,
			maxWidth: 500
		});
		pageFlip.loadFromHTML(flipbook.querySelectorAll('.book-page'));
	});

	const tabs = {
		'Robot': 2,
		'Kiosk': 10,
		'Website': 18,
		'Video': 26,
		'Programming': 34
	}
</script>

<div
	class="book-container position-relative d-flex flex-column justify-content-center px-3 px-md-5 px-xl-none"
	>
	<button class="toc" on:click={() => pageFlip.flip(1, 'top')}>
		Table of Contents
	</button>
	<div class="tabs">
		{#each Object.entries(tabs) as [text, page] (page)}
			<button class="tab" on:click={() => pageFlip.flip(page, 'top')}>{text}</button>
		{/each}
	</div>
<div id="book" class="mx-auto" bind:this={flipbook}>
		<div class="book-page">The Mari Angryneer Archives</div>
		<div class="book-page">Table of contents</div>
		<div class="book-page">Robot tab page</div>
		<div class="book-page">back of robot tab page</div>
		<div class="book-page">
			<div class="flex-container">
				<div>image 1</div>
				<p>text for img 1</p>
			</div>
			<div class="flex-container">
				<div>image 2</div>
				<p>text for img 2</p>
			</div>
			<div class="flex-container">
				<div>image 3</div>
				<p>text for img 3</p>
			</div>
		</div>
		<div class="book-page">
			<div class="flex-container">
				<div>image 1</div>
				<p>text for img 1</p>
			</div>
			<div class="flex-container">
				<div>image 2</div>
				<p>text for img 2</p>
			</div>
			<div class="flex-container">
				<div>image 3</div>
				<p>text for img 3</p>
			</div>
		</div>
		<div class="book-page">
			<div class="flex-container">
				<div>image 1</div>
				<p>text for img 1</p>
			</div>
			<div class="flex-container">
				<div>image 2</div>
				<p>text for img 2</p>
			</div>
			<div class="flex-container">
				<div>image 3</div>
				<p>text for img 3</p>
			</div>
		</div>
		<div class="book-page">Robot page 4</div>
		<div class="book-page">Robot page 5</div>
		<div class="book-page">Robot page 6</div>
		<div class="book-page">Kiosk tab page</div>
		<div class="book-page">back of kiosk tab page</div>
		<div class="book-page">kiosk page 1</div>
		<div class="book-page">kiosk page 2</div>
		<div class="book-page">kiosk page 3</div>
		<div class="book-page">kiosk page 4</div>
		<div class="book-page">kiosk page 5</div>
		<div class="book-page">kiosk page 6</div>
		<div class="book-page">Website tab page</div>
		<div class="book-page">back of website tab page</div>
		<div class="book-page">website page 1</div>
		<div class="book-page">website page 2</div>
		<div class="book-page">website page 3</div>
		<div class="book-page">website page 4</div>
		<div class="book-page">website page 5</div>
		<div class="book-page">website page 6</div>
		<div class="book-page">Video tab page</div>
		<div class="book-page">back of video tab page</div>
		<div class="book-page">video page 1</div>
		<div class="book-page">video page 2</div>
		<div class="book-page">video page 3</div>
		<div class="book-page">video page 4</div>
		<div class="book-page">video page 5</div>
		<div class="book-page">video page 6</div>
		<div class="book-page">Programming tab page</div>
		<div class="book-page">back of programming tab page</div>
		<div class="book-page">prog page 1</div>
		<div class="book-page">kiosk page 2</div>
		<div class="book-page">kiosk page 3</div>
		<div class="book-page">kiosk page 4</div>
		<div class="book-page">kiosk page 5</div>
		<div class="book-page">kiosk page 6</div>
		<div class="book-page">Last page</div>
		<div class="book-page">Cover of last page</div>
	</div>
</div>

<style>
  	.tabs, .toc {
		margin-left: 0.5rem;
	}
	
	.tabs {
		display: none;
	}

	.tab, .toc {
		background-image: url('/textures/wood.png');
		background-size: 100px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 7px 7px;
		min-height: 33px;
		border: 0px;
		color: white;
		transition: color 0.15s ease-in-out;
    text-shadow: 1.5px 1.5px #000;
	}

	.tab:hover, .toc:hover {
		color: black;
		text-shadow: none;
	}
	
	.tab {
		font-size: 18px;
		margin-left: 5px;
		margin-right: 5px;
	}

	.toc {
		width: max-content;
	}

	.book-container {
		min-height: 100px;
		max-height: 600px;
		margin-top: 3rem;
	}

	.book-page {
		z-index: 1;
		background: ghostwhite;
		padding: 1.5rem;
		overflow: auto;
		border-radius: 10px;
		border: solid 1.5rem antiquewhite;
	}

	.flex-container {
		display: flex;
	}

	.flex-container > div {
		width: 200px;
		height: 150px;
		margin: 25px;
		font-size: 30px;
		flex-wrap: wrap;
	}

	.flex-container > p {
		background-color: dimgray;
		width: 600px;
		margin: 25px;
		height: 150px;
		font-size: 30px;
		flex-wrap: wrap;
	}

	@media screen and (min-width: 500px) {
		.book-page:nth-child(odd) {
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
		}
		
		.book-page:nth-child(even) {
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
		}

		.toc {
			position: absolute;
			top: -1.5lh;
			left: calc((100% - 470px) / 2);
		}
	}
	
	/* at around 592px the page-flip turns into one page */
	@media screen and (min-width: 592px) {
		.book-page {
			border-radius: 0px;
		}

		.tabs {
			display: block;
			position: relative;
		}

		.toc {
			display: none;
		}
	}

	@media screen and (min-width: 1024px) {
		/* flipbook page is 465.833px wide, full flipbook width is *2 */
		.tabs {
			position: absolute;
			top: -1.7lh;
			left: calc((100% - 931.666px) / 2 + 5px);
			margin-left: 0;
		}
	}

	@media screen and (min-width: 1100px) {
		/* flipbook page is 500px wide */
		.tab {
			font-size: 20px;
		}
		.tabs {
			top: -1.75lh;
			left: calc((100% - 1000px) / 2 + 5px);
		}
	}
</style>