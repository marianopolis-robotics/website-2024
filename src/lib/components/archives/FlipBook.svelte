<script>
  import { onMount } from 'svelte';
	import * as St from 'page-flip';
	import { en, fr, imgs, enTabs, frTabs } from '$lib/archives';
	import { userStore } from "$lib/Store";
	import Page from '$lib/components/archives/Page.svelte';
	import Entry from '$lib/components/archives/Entry.svelte';

	export let isFr = false;
	let flipbook, pageFlip;
	let content = isFr ? fr : en;
	let tabs = isFr ? frTabs : enTabs;

	onMount(() => {
		pageFlip = new St.PageFlip(flipbook, {
			width: 600,
			height: 700,
			size: 'stretch',
			minWidth: 280,
			maxWidth: 600,
			startZIndex: 0
		});
		pageFlip.loadFromHTML(flipbook.querySelectorAll('.book-page'));
		
		if ($userStore.archivesPg !== 0) pageFlip.flip($userStore.archivesPg, 'top');
	});
	
	const getCurrentPage = () => {
		// use timeout to ensure page has fully flipped when getting current page index
		setTimeout(() => {
			$userStore.archivesPg = pageFlip.getCurrentPageIndex();
		}, 1000);
	};

	const tocClick = () => {
		pageFlip.flip(1, 'top');
		getCurrentPage();
	}
</script>

<div
	class="book-container position-relative d-flex flex-column justify-content-center px-3 px-md-5 px-xl-none" on:click={getCurrentPage} on:keyup={getCurrentPage} role='button' tabindex="0"
	>
	<button class="toc" on:click={tocClick}>
		{content.toc}
	</button>
	<div class="tabs" on:click={getCurrentPage} on:keyup={getCurrentPage} role='button' tabindex="0">
		{#each Object.entries(tabs) as [text, page] (page)}
			<button class="tab" on:click={() => pageFlip.flip(page, 'top')}>{text}</button>
		{/each}
	</div>
	<!-- overflow had to be hidden due to glitchy scrolling behaviour caused by 3D transform overflow :/ -->
<div id="book" class="mx-auto" bind:this={flipbook}>
		<Page>
			<div class="d-flex text-center justify-content-center align-items-center h-100">
				<h2 class="title position-absolute">{content.title}</h2>
			</div>
		</Page>
		<Page>
			<h2 class="chapter mb-2">{content.toc}</h2>
		</Page>
		<Page>
			<p>{content.intro}</p>
		</Page>
		<Page>
			<div slot="pointer">
				<h2 class="chapter mb-1">Robot</h2>
				<Entry date={content.robot.date1} text={content.robot.text1}
							 img='/archives/{imgs.img1}' alt={content.robot.alt1} rotate='left'>
				</Entry>
				<Entry date={content.robot.date2} text={content.robot.text2}
							 img='/archives/{imgs.img2}' alt={content.robot.alt2} rotate='right'>
				</Entry>
			</div>
			<div slot="mobile">
				<h2 class="chapter mb-1">Robot</h2>
				<Entry date={content.robot.date1} text={content.robot.text1}
							 img='/archives/{imgs.img1}' alt={content.robot.alt1} rotate='left'>
				</Entry>
			</div>
		</Page>
		<Page>
			{content.robot.text1}
		</Page>
		<Page>
			<div class="d-flex justify-content-center align-items-center h-100">
				<h2 class="title">{content.end}</h2>
			</div>
		</Page>
	</div>
</div>
<!-- margin and padding on the book or its parents break the layout and/or background
	so we use these line breaks to space out the bottom of the journal and the bottom of the site
-->
<br><br>

<style>
	.tabs, .toc {
		margin-left: 0.5rem;
	}
	
	.tabs {
		display: none;
	}

	.tab, .toc {
		background-image: url('/textures/wood.png');
		background-size: 100% 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 7px 7px;
		min-height: 33px;
		border: 0px;
		color: white;
		transition: color 0.15s ease-in-out;
    text-shadow: 1.5px 1.5px #000;
		box-shadow: rgba(0, 0, 0, 0.7) 0px 14px 28px, rgba(0, 0, 0, 0.65) 0px 10px 10px;
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

	.title {
		text-transform: uppercase;
		top: 50%;
		transform: translateY(-50%);
	}

	.chapter, .title {
		font-family: 'Jockey One', sans-serif;
		text-align: center;
	}

	.book-container {
		min-height: 100px;
		max-height: 600px;
		margin-top: 3rem;
		background-color: rgba(255, 234, 181, 0.8);
		box-shadow: 0 0 10px 30px rgba(255, 234, 181, 0.8);
	}

	#book {
		filter: drop-shadow(#000 0px 10px 10px);
		border-radius: 10px;
		overflow: hidden; /* unfortunately the only way to prevent glitchy scrolling behaviour
												 caused by 3D transform overflow :/
											*/
	}

	@media screen and (min-width: 500px) {
		/* .book-page:nth-child(odd) {
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
		}
		
		.book-page:nth-child(even) {
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
		} */

		.toc {
			position: absolute;
			top: -1.5lh;
			left: calc((100% - 470px) / 2);
		}
	}
	
	/* around this width the page-flip is big enough for all tabs */
	@media screen and (min-width: 610px) {
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