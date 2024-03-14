<script>
  import { onMount } from 'svelte';
	import * as St from 'page-flip';
	import { en, fr, imgs, enTabs, frTabs, frSmTabs, enSmTabs } from '$lib/archives';
	import { userStore } from "$lib/Store";
	import Page from '$lib/components/archives/Page.svelte';
	import Entry from '$lib/components/archives/Entry.svelte';

	export let isFr = false;
	let flipbook, pageFlip, mobile;
	let content = isFr ? fr : en;
	let tabs = isFr ? frTabs : enTabs;
	let smTabs = isFr ? frSmTabs : enSmTabs;

	let displayName = $userStore.name ? $userStore.name : (isFr ? 'Angrynieur' : 'Angryneer');

	onMount(() => {
		pageFlip = new St.PageFlip(flipbook, {
			width: 600,
			height: 700,
			size: 'stretch',
			minWidth: 250,
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

	const isActive = (start, end) => {
		let curr = $userStore.archivesPg;
		return (curr >= start && curr <= end);
	}
</script>

<!-- mobile devices tend to have a coarse pointer instead of a fine/precise pointer
		we'll need more pages to display all journal entries on mobile so we use the mobile variable to determine if extra pages should be shown
		because we don't want lots of blank pages when not on mobile -->
<svelte:window on:pageshow={() => mobile = window.matchMedia("(pointer: coarse)").matches} on:click={getCurrentPage} on:keyup={getCurrentPage} ></svelte:window>

<p class="desc rounded-box-container mt-3 mx-3 mx-sm-5 px-4 px-md-5 py-3 py-md-4">{isFr ? `Bienvenue aux archives des Angrynieurs Mari de 2023-2024, ${displayName}! Nous espérons que vous trouverez les souvenirs que vous cherchez dans notre journal.` 
	: `Welcome to the 2023-2024 Mari Angryneer archives, ${displayName}! We hope you find the memories you're looking for in our journal.`}
</p><br /><br />

<div
	class="book-container position-relative d-flex flex-column justify-content-center px-3 px-md-5 px-xl-none"
	>
	<div class="tabs lg-tabs">
		{#each Object.entries(tabs) as [text, pageRange] (pageRange[0])}
			<button class="tab" class:activeTab={isActive(pageRange[0], pageRange[1])} on:click={() => pageFlip.flip(pageRange[0], 'top')}>{text}</button>
		{/each}
	</div>
	<div class="tabs sm-tabs">
		{#each Object.entries(smTabs) as [text, pageRange] (pageRange[0])}
			<button class="tab" class:activeTab={isActive(pageRange[0], pageRange[1])} on:click={() => pageFlip.flip(pageRange[0], 'top')}>{text}</button>
		{/each}
	</div>
	<!-- overflow had to be hidden due to glitchy scrolling behaviour caused by 3D transform overflow :/ -->
	<div id="book" class="mx-auto" bind:this={flipbook}>
		<Page>
			<div class="d-flex text-center justify-content-center align-items-center h-100">
				<h2 class="title">{content.title}</h2>
			</div>
		</Page>
		<Page>
			<h2 class="chapter mb-2">{content.toc}</h2>
			<div class="toc-page mt-2 mt-sm-4" slot="pointer">
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">Robot<span><span class="visually-hidden">Page</span> 1</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Kiosque' : 'Kiosk'} <span><span class="visually-hidden">Page</span> 1</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Site web' : 'Website'} <span><span class="visually-hidden">Page</span> 1</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Vidéo' : 'Video'} <span><span class="visually-hidden">Page</span> 1</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Programmation' : 'Programming'} <span><span class="visually-hidden">Page</span> 1</span></p>
			</div>
		</Page>
		<Page>
			<p class="fs-5">{content.intro1}</p>
			<p class="fs-5">{content.intro2} {displayName}!</p>
		</Page>
		<Page>
			<div slot="pointer">
				<h2 class="chapter mb-1">Robot</h2>
				<Entry date={content.robot.date1} text={content.robot.text1}
							 img='/archives/{imgs.robot.img1}' alt={content.robot.alt1} rotate='left'>
				</Entry>
				<Entry date={content.robot.date2} text={content.robot.text2}
							 img='/archives/{imgs.robot.img2}' alt={content.robot.alt2} rotate='right'>
				</Entry>
			</div>
			<div slot="mobile">
				<h2 class="chapter mb-1">Robot</h2>
				<Entry date={content.robot.date1} text={content.robot.text1}
							 img='/archives/{imgs.robot.img1}' alt={content.robot.alt1} rotate='left'>
				</Entry>
			</div>
		</Page>
		<Page>
			<div slot="pointer">
				<Entry date={content.robot.date3} text={content.robot.text3}
							 img='/archives/{imgs.robot.img3}' alt={content.robot.alt3} rotate='left'>
				</Entry>
				<Entry date={content.robot.date4} text={content.robot.text4}
							 img='/archives/{imgs.robot.img4}' alt={content.robot.alt4} rotate='right'>
				</Entry>
			</div>
			<div slot="mobile">
				<Entry date={content.robot.date2} text={content.robot.text2}
							 img='/archives/{imgs.robot.img2}' alt={content.robot.alt2} rotate='left'>
				</Entry>
			</div>
		</Page>
		<Page>
			<div slot="pointer">
				<Entry date={content.robot.date5} text={content.robot.text5}
							 img='/archives/{imgs.robot.img5}' alt={content.robot.alt5} rotate='left'>
				</Entry>
				<Entry date={content.robot.date6} text={content.robot.text6}
							 img='/archives/{imgs.robot.img6}' alt={content.robot.alt6} rotate='right'>
				</Entry>
			</div>
			<div slot="mobile">
				<Entry date={content.robot.date3} text={content.robot.text3}
							 img='/archives/{imgs.robot.img3}' alt={content.robot.alt3} rotate='left'>
				</Entry>
			</div>
		</Page>
		<Page>
			<div slot="pointer">
				<Entry date={content.robot.date7} text={content.robot.text7}
							 img='/archives/{imgs.robot.img7}' alt={content.robot.alt7} rotate='left'>
				</Entry>
				<Entry date={content.robot.date8} text={content.robot.text8}
							 img='/archives/{imgs.robot.img8}' alt={content.robot.alt8} rotate='right'>
				</Entry>
			</div>
			<div slot="mobile">
				<Entry date={content.robot.date4} text={content.robot.text4}
							 img='/archives/{imgs.robot.img4}' alt={content.robot.alt4} rotate='left'>
				</Entry>
			</div>
		</Page>
		<Page>
			<div slot="pointer">
				<Entry date={content.robot.date9} text={content.robot.text9}
							 img='/archives/{imgs.robot.img9}' alt={content.robot.alt9} rotate='left'>
				</Entry>
				<Entry date={content.robot.date10} text={content.robot.text10}
							 img='/archives/{imgs.robot.img10}' alt={content.robot.alt10} rotate='right'>
				</Entry>
			</div>
			<div slot="mobile">
				<Entry date={content.robot.date5} text={content.robot.text5}
							 img='/archives/{imgs.robot.img5}' alt={content.robot.alt5} rotate='left'>
				</Entry>
			</div>
		</Page>
		<Page>
			<div slot="pointer">
				<h2 class="chapter mb-1">Kiosk</h2>
				<Entry date={content.kiosk.date1} text={content.kiosk.text1}
							 img='/archives/{imgs.kiosk.img1}' alt={content.kiosk.alt1} rotate='left'>
				</Entry>
				<Entry date={content.kiosk.date2} text={content.kiosk.text2}
							 img='/archives/{imgs.kiosk.img2}' alt={content.kiosk.alt2} rotate='right'>
				</Entry>
			</div>
			<div slot="mobile">
				<h2 class="chapter mb-1">Kiosk</h2>
				<Entry date={content.kiosk.date1} text={content.kiosk.text1}
							 img='/archives/{imgs.kiosk.img1}' alt={content.kiosk.alt1} rotate='left'>
				</Entry>
			</div>
		</Page>
		<Page>
			<div slot="pointer">
				<Entry date={content.kiosk.date3} text={content.kiosk.text3}
							 img='/archives/{imgs.kiosk.img3}' alt={content.kiosk.alt3} rotate='left'>
				</Entry>
				<Entry date={content.kiosk.date4} text={content.kiosk.text4}
							 img='/archives/{imgs.kiosk.img4}' alt={content.kiosk.alt4} rotate='right'>
				</Entry>
			</div>
			<div slot="mobile">
				<Entry date={content.kiosk.date2} text={content.kiosk.text2}
							 img='/archives/{imgs.kiosk.img2}' alt={content.kiosk.alt2} rotate='left'>
				</Entry>
			</div>
		</Page>
		<Page>
			<div class="d-flex justify-content-center align-items-center h-100 text-center">
				<h2 class="title">~ {content.end} ~</h2>
			</div>
		</Page>
	</div>
</div>
<!-- margin and padding on the book or its parents break the layout and/or background
	so we use these line breaks to space out the bottom of the journal and the bottom of the site
-->
<br><br>

<style>
	.tabs {
		margin-left: 0.5rem;
	}
	
	.lg-tabs {
		display: none;
	}

	.tab {
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

	.tab:hover {
		color: black;
		text-shadow: none;
	}
	
	.tab {
		font-size: 0.9rem;
		margin-left: 3px;
		margin-right: 3px;
	}

	.activeTab {
		text-decoration: underline;
	}
	
	.desc {
    background-color: rgba(255, 237, 194, 0.6);
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
    border: solid 0.5px #332400;
		font-size: 1.5rem;
		line-height: 2;
  }
	
	.title {
		text-transform: uppercase;
	}

	.chapter, .title {
		font-family: 'Jockey One', sans-serif;
		text-align: center;
	}

	.toc-chapter {
		display: inline-grid;
		grid-template-columns: auto max-content;
		width: 100%;
	}

	.visually-hidden {
		clip: rect(0 0 0 0);
		clip-path: inset(100%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		width: 1px;
		white-space: nowrap;
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
		.tabs {
			position: absolute;
			top: -1.5lh;
			left: calc((100% - 470px) / 2);
		}

		.tab {
			font-size: 18px;
			margin-left: 5px;
			margin-right: 5px;
		}
	}
	
	/* around this width the page-flip is big enough for all tabs */
	@media screen and (min-width: 610px) {
		.lg-tabs {
			display: block;
			position: relative;
		}

		.sm-tabs {
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