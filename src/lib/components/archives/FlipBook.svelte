<script>
  import { onMount } from 'svelte';
	import * as St from 'page-flip';
	import { en, fr, imgs, enTabs, frTabs, frSmTabs, enSmTabs } from '$lib/archives';
	import { userStore } from "$lib/Store";
	import Page from '$lib/components/archives/Page.svelte';
	import Entry from '$lib/components/archives/Entry.svelte';

	export let isFr = false;
	let flipbook, mFlipbook, pageFlip, mPageFlip, mobile;
	let content = isFr ? fr : en;
	let tabs = isFr ? frTabs : enTabs;
	let smTabs = isFr ? frSmTabs : enSmTabs;
	let active = '';

	let displayName = $userStore.name ? $userStore.name : (isFr ? 'Angrynieur' : 'Angryneer');

	onMount(() => {
		pageFlip = new St.PageFlip(flipbook, {
			width: 650,
			height: 800,
			size: 'stretch',
			minWidth: 250,
			maxWidth: 650,
			startZIndex: 0
		});
	
		mPageFlip = new St.PageFlip(mFlipbook, {
			width: 650,
			height: 800,
			size: 'stretch',
			minWidth: 250,
			maxWidth: 650,
			startZIndex: 0
		});
		
		pageFlip.loadFromHTML(flipbook.querySelectorAll('.book-page.pointerPg'));
		mPageFlip.loadFromHTML(mFlipbook.querySelectorAll('.book-page.mobilePg'));
		
		if ($userStore.archivesPg !== 0) pageFlip.flip($userStore.archivesPg, 'top');
		if ($userStore.mArchivesPg !== 0) mPageFlip.flip($userStore.mArchivesPg, 'top');
	});
	
	const getCurrentPage = () => {
		// use timeout to ensure page has fully flipped when getting current page index
		setTimeout(() => {
			if (mobile) {
				$userStore.mArchivesPg = mPageFlip.getCurrentPageIndex();
			} else {
				$userStore.archivesPg = pageFlip.getCurrentPageIndex();
			}
		}, 750);
	};

	const isActive = () => {
		let curr = mobile ? $userStore.mArchivesPg : ($userStore.archivesPg % 2 == 0 ? $userStore.archivesPg + 1 : $userStore.archivesPg);

		if (mobile) {
			if (curr >= smTabs['Robot'][0] && curr <= smTabs['Robot'][1]) return 'Robot';
			if (curr >= smTabs['Web'][0] && curr <= smTabs['Web'][1]) return 'Web';
			if (curr >= smTabs['Vid'][0] && curr <= smTabs['Vid'][1]) return 'Vid';
			if (curr >= smTabs['Prog'][0] && curr <= smTabs['Prog'][1]) return 'Prog';
			if (isFr) {
				if (curr >= smTabs['Kiosque'][0] && curr <= smTabs['Kiosque'][1]) return 'Kiosque';
			} else {
				if (curr >= smTabs['Kiosk'][0] && curr <= smTabs['Kiosk'][1]) return 'Kiosk';
			}
		} else {
			if (curr >= tabs['Robot'][0] && curr <= tabs['Robot'][1]) return 'Robot';
			if (isFr) {
				if (curr >= tabs['Kiosque'][0] && curr <= tabs['Kiosque'][1]) return 'Kiosque';
				if (curr >= tabs['Site web'][0] && curr <= tabs['Site web'][1]) return 'Site web';
				if (curr >= tabs['Vidéo'][0] && curr <= tabs['Vidéo'][1]) return 'Vidéo';
				if (curr >= tabs['Programmation'][0] && curr <= tabs['Programmation'][1]) return 'Programmation';
			} else {
				if (curr >= tabs['Kiosk'][0] && curr <= tabs['Kiosk'][1]) return 'Kiosk';
				if (curr >= tabs['Website'][0] && curr <= tabs['Website'][1]) return 'Website';
				if (curr >= tabs['Video'][0] && curr <= tabs['Video'][1]) return 'Video';
				if (curr >= tabs['Programming'][0] && curr <= tabs['Programming'][1]) return 'Programming';
			}
		}
	}

	// a bit hacky unfortunately, but the flipbook interferes with pointer events so we update every second
	// it's a bit risky to rely on updating when the user's cursor moves (they can flip pages without moving their cursor at all)
	const updateData = () => {
		getCurrentPage();
		setTimeout(() => {
			active = isActive();
		}, 750);
	}
</script>

<!-- mobile devices tend to have a coarse pointer instead of a fine/precise pointer
		we'll need more pages to display all journal entries on mobile so we use the mobile variable to determine if extra pages should be shown
		because we don't want lots of blank pages when not on mobile -->
<svelte:window on:pageshow={() => mobile = window.matchMedia("(pointer: coarse)").matches} on:click={() => mobile = window.matchMedia("(pointer: coarse)").matches}
	on:touchend={() => mobile = window.matchMedia("(pointer: coarse)").matches} on:touchend={updateData} on:pageshow={updateData}
	></svelte:window>
<!-- which event successfully triggers updateData is very unpredictable depending on browser and devices, so to be safe
  we unfortunately have to set several event listeners -->
<svelte:document on:mousemove={updateData} />

<p class="desc desc-box rounded-box-container mt-3 mx-3 mx-sm-5 px-4 px-md-5 py-3 py-md-4">{isFr ? `Bienvenue aux archives des Angrynieurs Mari de 2023-2024, ${displayName}! Nous espérons que vous trouverez les souvenirs que vous cherchez dans notre journal.` 
	: `Welcome to the 2023-2024 Mari Angryneer archives, ${displayName}! We hope you find the memories you're looking for in our journal.`}
</p><br /><br />

<div
	class="book-container position-relative d-flex flex-column justify-content-center px-2 px-sm-3 px-md-5 px-xl-none mt-3 mt-md-5"
	>
	<div class="tabs lg-tabs">
		{#each Object.entries(tabs) as [text, pageRange] (pageRange[0])}
			<button class="tab" class:activeTab={active === text} on:click={() => pageFlip.flip(pageRange[0], 'top')}>{text}</button>
		{/each}
	</div>
	<div class="tabs sm-tabs">
		{#each Object.entries(smTabs) as [text, pageRange] (pageRange[0])}
			<button class="tab" class:activeTab={active === text} on:click={() => mPageFlip.flip(pageRange[0], 'top')}>{text}</button>
		{/each}
	</div>
	<!-- overflow had to be hidden due to glitchy scrolling behaviour caused by 3D transform overflow :/ -->
	<!-- flipbook for non-mobile devices (can scroll down a page easily without turning the page) -->
	<div id="book" class="mx-auto" bind:this={flipbook}>
		<Page pointer={true}>
			<h2 class="title">{content.title}</h2>
		</Page>
		<Page number="1" specialPg={true} toc={true}>
			<h2 class="chapter mb-2">{content.toc}</h2>
			<div class="toc-page mt-2 mt-sm-4" slot="pointer">
				<!-- the visually hidden spans improve accessibility for users with screen readers -->
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">Robot<span><span class="visually-hidden">Page</span> {tabs['Robot'][0]}</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Kiosque' : 'Kiosk'} <span><span class="visually-hidden">Page</span> {isFr ? tabs['Kiosque'][0] : tabs['Kiosk'][0]}</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Site web' : 'Website'} <span><span class="visually-hidden">Page</span> {isFr ? tabs['Site web'][0] : tabs['Website'][0]}</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Vidéo' : 'Video'} <span><span class="visually-hidden">Page</span> {isFr ? tabs['Vidéo'][0] : tabs['Video'][0]}</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Programmation' : 'Programming'} <span><span class="visually-hidden">Page</span> {isFr ? tabs['Programmation'][0] : tabs['Programming'][0]}</span></p>
			</div>
		</Page>
		<Page number="2" specialPg={true}>
			<div slot="pointer">
				<p class="fs-5">{content.intro1}</p>
				<p class="fs-5">{content.intro2}</p>
				<p class="fs-5">{content.intro3} {displayName}!</p>
			</div>
		</Page>
		<Page number="3">
			<div slot="pointer">
				<h2 class="chapter mb-3">{isFr ? 'Nos obstacles' : 'Our struggles'}</h2>
				<p class="fs-5">{content.struggles.robot}</p>
				<p class="fs-5">{content.struggles.kiosk1}</p>
				<p class="fs-5">{content.struggles.kiosk2}</p>
			</div>
		</Page>
		<Page number="4">
			<div slot="pointer">
				<p class="fs-5">{content.struggles.website}</p>
				<p class="fs-5">{content.struggles.video}</p>
				<p class="fs-5">{content.struggles.programming}</p>
			</div>
		</Page>
		<Page number="5">
			<div slot="pointer">
				<h2 class="chapter mb-1">Robot</h2>
				<Entry date={content.robot.date1} text={content.robot.text1}
							 img='/archives/{imgs.robot.img1}' alt={content.robot.alt1} rotate='left' />
				<Entry date={content.robot.date2} text={content.robot.text2}
							 img='/archives/{imgs.robot.img2}' alt={content.robot.alt2} rotate='right' />
			</div>
		</Page>
		<Page number="6">
			<div slot="pointer">
				<Entry date={content.robot.date3} text={content.robot.text3}
							 img='/archives/{imgs.robot.img3}' alt={content.robot.alt3} rotate='left' />
				<Entry date={content.robot.date4} text={content.robot.text4}
							 img='/archives/{imgs.robot.img4}' alt={content.robot.alt4} rotate='right' />
			</div>
		</Page>
		<Page number="7">
			<div slot="pointer">
				<Entry date={content.robot.date5} text={content.robot.text5}
							 img='/archives/{imgs.robot.img5}' alt={content.robot.alt5} rotate='left' />
				<Entry date={content.robot.date6} text={content.robot.text6}
							 img='/archives/{imgs.robot.img6}' alt={content.robot.alt6} rotate='right' />
			</div>
		</Page>
		<Page number="8">
			<div slot="pointer">
				<Entry date={content.robot.date7} text={content.robot.text7}
							 img='/archives/{imgs.robot.img7}' alt={content.robot.alt7} rotate='left' />
				<Entry date={content.robot.date8} text={content.robot.text8}
							 img='/archives/{imgs.robot.img8}' alt={content.robot.alt8} rotate='right' />
			</div>
		</Page>
		<Page number="9">
			<div slot="pointer">
				<Entry date={content.robot.date9} text={content.robot.text9}
							 img='/archives/{imgs.robot.img9}' alt={content.robot.alt9} rotate='left' />
			</div>
		</Page>
		<Page number="10">
			<div slot="pointer">
				<h2 class="chapter mb-1">{isFr ? 'Kiosque' : 'Kiosk'}</h2>
				<Entry date={content.kiosk.date1} text={content.kiosk.text1}
							 img='/archives/{imgs.kiosk.img1}' alt={content.kiosk.alt1} rotate='left' />
				<Entry date={content.kiosk.date2} text={content.kiosk.text2}
							 img='/archives/{imgs.kiosk.img2}' alt={content.kiosk.alt2} rotate='right' />
			</div>
		</Page>
		<Page number="11">
			<div slot="pointer">
				<Entry date={content.kiosk.date3} text={content.kiosk.text3}
							 img='/archives/{imgs.kiosk.img3}' alt={content.kiosk.alt3} rotate='left' />
				<Entry date={content.kiosk.date4} text={content.kiosk.text4}
							 img='/archives/{imgs.kiosk.img4}' alt={content.kiosk.alt4} rotate='right' />
			</div>
		</Page>
		<Page number="12">
			<div slot="pointer">
				<Entry date={content.kiosk.date5} text={content.kiosk.text5}
							 img='/archives/{imgs.kiosk.img5}' alt={content.kiosk.alt5} rotate='left' />
				<Entry date={content.kiosk.date6} text={content.kiosk.text6}
							 img='/archives/{imgs.kiosk.img6}' alt={content.kiosk.alt6} rotate='right' />
			</div>
		</Page>
		<Page number="13">
			<div slot="pointer">
				<Entry date={content.kiosk.date7} text={content.kiosk.text7}
							 img='/archives/{imgs.kiosk.img7}' alt={content.kiosk.alt7} rotate='left' />
				<Entry date={content.kiosk.date8} text={content.kiosk.text8}
							 img='/archives/{imgs.kiosk.img8}' alt={content.kiosk.alt8} rotate='right' />
			</div>
		</Page>
		<Page number="14">
			<div slot="pointer">
				<Entry date={content.kiosk.date9} text={content.kiosk.text9}
							 img='/archives/{imgs.kiosk.img9}' alt={content.kiosk.alt9} rotate='left' />
				<Entry date={content.kiosk.date10} text={content.kiosk.text10}
							 img='/archives/{imgs.kiosk.img10}' alt={content.kiosk.alt10} rotate='right' />
			</div>
		</Page>
		<Page number="15">
			<div slot="pointer">
				<Entry date={content.kiosk.date11} text={content.kiosk.text11}
							 img='/archives/{imgs.kiosk.img11}' alt={content.kiosk.alt11} rotate='left' />
			</div>
		</Page>
		<Page number="16">
			<div slot="pointer">
				<h2 class="chapter mb-1">{isFr ? 'Site web' : 'Website'}</h2>
				<Entry date={content.website.date1} text={content.website.text1}
				img='/archives/{imgs.website.img1}' alt={content.website.alt1} rotate='left' />
				<Entry date={content.website.date2} text={content.website.text2}
				img='/archives/{isFr ? imgs.website['img2-fr'] : imgs.website['img2-en']}' alt={content.website.alt2} rotate='right' />
			</div>
		</Page>
		<Page number="17">
			<div slot="pointer">
				<Entry date={content.website.date3} text={content.website.text3}
				img='/archives/{imgs.website.img3}' alt={content.website.alt3} rotate='left' />
				<Entry date={content.website.date4} text={content.website.text4}
				img='/archives/{imgs.website.img4}' alt={content.website.alt4} rotate='right' />
			</div>
		</Page>
		<Page number="18">
			<div slot="pointer">
				<Entry date={content.website.date5} text={content.website.text5}
				img='/archives/{imgs.website.img5}' alt={content.website.alt5} rotate='left' />
				<Entry date={content.website.date6} text={content.website.text6}
				img='/archives/{imgs.website.img6}' alt={content.website.alt6} rotate='right' />
			</div>
		</Page>
		<Page number="19">
			<div slot="pointer">
				<Entry date={content.website.date7} text={content.website.text7}
				img='/archives/{imgs.website.img7}' alt={content.website.alt7} rotate='left' />
				<Entry date={content.website.date8} text={content.website.text8}
				img='/archives/{imgs.website.img8}' alt={content.website.alt8} rotate='right' />
			</div>
		</Page>
		<Page number="20">
			<div slot="pointer">
				<h2 class="chapter mb-1">{isFr ? 'Vidéo' : 'Video'}</h2>
				<Entry date={content.video.date1} text={content.video.text1}
				img='/archives/{imgs.video.img1}' alt={content.video.alt1} rotate='left' />
				<Entry date={content.video.date2} text={content.video.text2}
				img='/archives/{imgs.video.img2}' alt={content.video.alt2} rotate='right' />
			</div>
		</Page>
		<Page number="21">
			<div slot="pointer">
				<Entry date={content.video.date3} text={content.video.text3}
				img='/archives/{imgs.video.img3}' alt={content.video.alt3} rotate='left' />
				<Entry date={content.video.date4} text={content.video.text4}
				img='/archives/{imgs.video.img4}' alt={content.video.alt4} rotate='right' />
			</div>
		</Page>
		<Page number="22">
			<div slot="pointer">
				<Entry date={content.video.date5} text={content.video.text5}
				img='/archives/{imgs.video.img5}' alt={content.video.alt5} rotate='left' />
				<Entry date={content.video.date6} text={content.video.text6}
				img='/archives/{imgs.video.img6}' alt={content.video.alt6} rotate='right' />
			</div>
		</Page>
		<Page number="23">
			<div slot="pointer">
				<Entry date={content.video.date7} text={content.video.text7}
				img='/archives/{imgs.video.img7}' alt={content.video.alt7} rotate='left' />
				<Entry date={content.video.date8} text={content.video.text8}
				img='/archives/{imgs.video.img8}' alt={content.video.alt8} rotate='right' />
			</div>
		</Page>
		<Page number="24">
			<div slot="pointer">
				<h2 class="chapter mb-1">{isFr ? 'Programmation' : 'Programming'}</h2>
				<Entry date={content.programming.date1} text={content.programming.text1}
				img='/archives/{imgs.programming.img1}' alt={content.programming.alt1} rotate='left' />
				<Entry date={content.programming.date2} text={content.programming.text2}
				img='/archives/{imgs.programming.img2}' alt={content.programming.alt2} rotate='right' />
			</div>
		</Page>
		<Page number="25">
			<div slot="pointer">
				<Entry date={content.programming.date3} text={content.programming.text3}
				img='/archives/{imgs.programming.img3}' alt={content.programming.alt3} rotate='left' />
				<Entry date={content.programming.date4} text={content.programming.text4}
				img='/archives/{imgs.programming.img4}' alt={content.programming.alt4} rotate='right' />
			</div>
		</Page>
		<Page number="26">
			<div slot="pointer">
				<Entry date={content.programming.date5} text={content.programming.text5}
				img='/archives/{imgs.programming.img5}' alt={content.programming.alt5} rotate='left' />
			</div>
		</Page>
		<Page pointer={true}>
			<h2 class="title">~ {content.end} ~</h2>
		</Page>
	</div>

	<!-- mobile book -->
	<div id="mbook" class="mx-auto" bind:this={mFlipbook}>
		<Page mobile={true}>
			<h2 class="title">{content.title}</h2>
		</Page>
		<Page mNumber="1" specialPg={true} toc={true}>
			<h2 class="chapter mb-2">{content.toc}</h2>
			<div class="toc-page mt-2 mt-sm-4" slot="mobile">
				<!-- the visually hidden spans improve accessibility for users with screen readers -->
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">Robot<span><span class="visually-hidden">Page</span> {smTabs['Robot'][0]}</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Kiosque' : 'Kiosk'} <span><span class="visually-hidden">Page</span> {isFr ? smTabs['Kiosque'][0] : smTabs['Kiosk'][0]}</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Site web' : 'Website'} <span><span class="visually-hidden">Page</span> {smTabs['Web'][0]}</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Vidéo' : 'Video'} <span><span class="visually-hidden">Page</span> {smTabs['Vid'][0]}</span></p>
				<p class="mb-0 mb-sm-1"><span class="toc-chapter">{isFr ? 'Programmation' : 'Programming'} <span><span class="visually-hidden">Page</span> {smTabs['Prog'][0]}</span></p>
			</div>
		</Page>
		<Page mNumber="2" specialPg={true}>
			<div slot="mobile">
				<p class="fs-5">{content.intro1}</p>
			</div>
		</Page>
		<Page mNumber="3">
			<div slot="mobile">
				<p class="fs-5">{content.intro2}</p>
			</div>
		</Page>
		<Page mNumber="4">
			<div slot="mobile">
				<p class="fs-5">{content.intro3} {displayName}!</p>
			</div>
		</Page>
		<Page mNumber="5">
			<div slot="mobile">
				<h2 class="chapter mb-3">{isFr ? 'Nos obstacles' : 'Our struggles'}</h2>
				<p class="fs-5">{content.struggles.robot}</p>
			</div>
		</Page>
		<Page mNumber="6">
			<div slot="mobile">
				<p class="fs-5">{content.struggles.kiosk1}</p>
			</div>
		</Page>
		<Page mNumber="7">
			<div slot="mobile">
				<p class="fs-5">{content.struggles.kiosk2}</p>
			</div>
		</Page>
		<Page mNumber="8">
			<div slot="mobile">
				<p class="fs-5">{content.struggles.website}</p>
			</div>
		</Page>
		<Page mNumber="9">
			<div slot="mobile">
				<p class="fs-5">{content.struggles.video}</p>
			</div>
		</Page>
		<Page mNumber="10">
			<div slot="mobile">
				<p class="fs-5">{content.struggles.programming}</p>
			</div>
		</Page>
		<Page mNumber="11">
			<div slot="mobile">
				<h2 class="chapter mb-1">Robot</h2>
				<Entry img='/archives/{imgs.robot.img1}' alt={content.robot.alt1} rotate='left' />
			</div>
		</Page>
		<Page mNumber="12">
			<div slot="mobile">
				<Entry date={content.robot.date1} text={content.robot.text1} />
			</div>
		</Page>
		<Page mNumber="13">
			<div slot="mobile">
				<Entry img='/archives/{imgs.robot.img2}' alt={content.robot.alt2} rotate='right' />
			</div>
		</Page>
		<Page mNumber="14">
			<div slot="mobile">
				<Entry date={content.robot.date2} text={content.robot.text2} />
			</div>
		</Page>
		<Page mNumber="15">
			<div slot="mobile">
				<Entry img='/archives/{imgs.robot.img3}' alt={content.robot.alt3} rotate='left' />
			</div>
		</Page>
		<Page mNumber="16">
			<div slot="mobile">
				<Entry date={content.robot.date3} text={content.robot.text3} />
			</div>
		</Page>
		<Page mNumber="17">
			<div slot="mobile">
				<Entry img='/archives/{imgs.robot.img4}' alt={content.robot.alt4} rotate='right' />
			</div>
		</Page>
		<Page mNumber="18">
			<div slot="mobile">
				<Entry date={content.robot.date4} text={content.robot.text4} />
			</div>
		</Page>
		<Page mNumber="19">
			<div slot="mobile">
				<Entry img='/archives/{imgs.robot.img5}' alt={content.robot.alt5} rotate='left' />
			</div>
		</Page>
		<Page mNumber="20">
			<div slot="mobile">
				<Entry date={content.robot.date5} text={content.robot.text5} />
			</div>
		</Page>
		<Page mNumber="21">
			<div slot="mobile">
				<Entry img='/archives/{imgs.robot.img6}' alt={content.robot.alt6} rotate='right' />
			</div>
		</Page>
		<Page mNumber="22">
			<div slot="mobile">
				<Entry date={content.robot.date6} text={content.robot.text6} />
			</div>
		</Page>
		<Page mNumber="23">
			<div slot="mobile">
				<Entry img='/archives/{imgs.robot.img7}' alt={content.robot.alt7} rotate='left' />
			</div>
		</Page>
		<Page mNumber="24">
			<div slot="mobile">
				<Entry date={content.robot.date8} text={content.robot.text8} />
			</div>
		</Page>
		<Page mNumber="25">
			<div slot="mobile">
				<Entry img='/archives/{imgs.robot.img9}' alt={content.robot.alt9} rotate='right' />
			</div>
		</Page>
		<Page mNumber="26">
			<div slot="mobile">
				<Entry date={content.robot.date9} text={content.robot.text9} />
			</div>
		</Page>
		<Page mNumber="27">
			<div slot="mobile">
				<h2 class="chapter mb-1">{isFr ? 'Kiosque' : 'Kiosk'}</h2>
				<Entry img='/archives/{imgs.kiosk.img1}' alt={content.kiosk.alt1} rotate='left' />
			</div>
		</Page>
		<Page mNumber="28">
			<div slot="mobile">
				<Entry date={content.kiosk.date1} text={content.kiosk.text1} />
			</div>
		</Page>
		<Page mNumber="29">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img2}' alt={content.kiosk.alt2} rotate='right' />
			</div>
		</Page>
		<Page mNumber="30">
			<div slot="mobile">
				<Entry date={content.kiosk.date2} text={content.kiosk.text2} />
			</div>
		</Page>
		<Page mNumber="31">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img3}' alt={content.kiosk.alt3} rotate='left' />
			</div>
		</Page>
		<Page mNumber="32">
			<div slot="mobile">
				<Entry date={content.kiosk.date3} text={content.kiosk.text3} />
			</div>
		</Page>
		<Page mNumber="34">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img4}' alt={content.kiosk.alt4} rotate='right' />
			</div>
		</Page>
		<Page mNumber="35">
			<div slot="mobile">
				<Entry date={content.kiosk.date4} text={content.kiosk.text4} />
			</div>
		</Page>
		<Page mNumber="36">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img5}' alt={content.kiosk.alt5} rotate='left' />
			</div>
		</Page>
		<Page mNumber="37">
			<div slot="mobile">
				<Entry date={content.kiosk.date5} text={content.kiosk.text5} />
			</div>
		</Page>
		<Page mNumber="38">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img6}' alt={content.kiosk.alt6} rotate='right' />
			</div>
		</Page>
		<Page mNumber="39">
			<div slot="mobile">
				<Entry date={content.kiosk.date6} text={content.kiosk.text6} />
			</div>
		</Page>
		<Page mNumber="40">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img7}' alt={content.kiosk.alt7} rotate='left' />
			</div>
		</Page>
		<Page mNumber="41">
			<div slot="mobile">
				<Entry date={content.kiosk.date7} text={content.kiosk.text7} />
			</div>
		</Page>
		<Page mNumber="42">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img8}' alt={content.kiosk.alt8} rotate='right' />
			</div>
		</Page>
		<Page mNumber="43">
			<div slot="mobile">
				<Entry date={content.kiosk.date8} text={content.kiosk.text8} />
			</div>
		</Page>
		<Page mNumber="44">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img9}' alt={content.kiosk.alt9} rotate='left' />
			</div>
		</Page>
		<Page mNumber="45">
			<div slot="mobile">
				<Entry date={content.kiosk.date9} text={content.kiosk.text9} />
			</div>
		</Page>
		<Page mNumber="46">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img10}' alt={content.kiosk.alt10} rotate='right' />
			</div>
		</Page>
		<Page mNumber="47">
			<div slot="mobile">
				<Entry date={content.kiosk.date10} text={content.kiosk.text10} />
			</div>
		</Page>
		<Page mNumber="48">
			<div slot="mobile">
				<Entry img='/archives/{imgs.kiosk.img11}' alt={content.kiosk.alt11} rotate='left' />
			</div>
		</Page>
		<Page mNumber="49">
			<div slot="mobile">
				<Entry date={content.kiosk.date11} text={content.kiosk.text11} />
			</div>
		</Page>
		<Page mNumber="50">
			<div slot="mobile">
				<h2 class="chapter mb-1">{isFr ? 'Site web' : 'Website'}</h2>
				<Entry img='/archives/{imgs.website.img1}' alt={content.website.alt1} rotate='right' />
			</div>
		</Page>
		<Page mNumber="51">
			<div slot="mobile">
				<Entry date={content.website.date1} text={content.website.text1} />
			</div>
		</Page>
		<Page mNumber="52">
			<div slot="mobile">
				<Entry img='/archives/{isFr ? imgs.website['img2-fr'] : imgs.website['img2-en']}' alt={content.website.alt2} rotate='left' />
			</div>
		</Page>
		<Page mNumber="53">
			<div slot="mobile">
				<Entry date={content.website.date2} text={content.website.text2} />
			</div>
		</Page>
		<Page mNumber="54">
			<div slot="mobile">
				<Entry img='/archives/{imgs.website.img3}' alt={content.website.alt3} rotate='right' />
			</div>
		</Page>
		<Page mNumber="55">
			<div slot="mobile">
				<Entry date={content.website.date3} text={content.website.text3} />
			</div>
		</Page>
		<Page mNumber="56">
			<div slot="mobile">
				<Entry img='/archives/{imgs.website.img4}' alt={content.website.alt4} rotate='left' />
			</div>
		</Page>
		<Page mNumber="57">
			<div slot="mobile">
				<Entry date={content.website.date4} text={content.website.text4} />
			</div>
		</Page>
		<Page mNumber="58">
			<div slot="mobile">
				<Entry img='/archives/{imgs.website.img5}' alt={content.website.alt5} rotate='right' />
			</div>
		</Page>
		<Page mNumber="59">
			<div slot="mobile">
				<Entry date={content.website.date5} text={content.website.text5} />
			</div>
		</Page>
		<Page mNumber="60">
			<div slot="mobile">
				<Entry img='/archives/{imgs.website.img6}' alt={content.website.alt6} rotate='left' />
			</div>
		</Page>
		<Page mNumber="61">
			<div slot="mobile">
				<Entry date={content.website.date6} text={content.website.text6} />
			</div>
		</Page>
		<Page mNumber="62">
			<div slot="mobile">
				<Entry img='/archives/{imgs.website.img7}' alt={content.website.alt7} rotate='right' />
			</div>
		</Page>
		<Page mNumber="63">
			<div slot="mobile">
				<Entry date={content.website.date7} text={content.website.text7} />
			</div>
		</Page>
		<Page mNumber="64">
			<div slot="mobile">
				<Entry img='/archives/{imgs.website.img8}' alt={content.website.alt8} rotate='left' />
			</div>
		</Page>
		<Page mNumber="65">
			<div slot="mobile">
				<Entry date={content.website.date8} text={content.website.text8} />
			</div>
		</Page>
		<Page mNumber="66">
			<div slot="mobile">
				<h2 class="chapter mb-1">{isFr ? 'Vidéo' : 'Video'}</h2>
				<Entry img='/archives/{imgs.video.img1}' alt={content.video.alt1} rotate='right' />
			</div>
		</Page>
		<Page mNumber="67">
			<div slot="mobile">
				<Entry date={content.video.date1} text={content.video.text1} />
			</div>
		</Page>
		<Page mNumber="68">
			<div slot="mobile">
				<Entry img='/archives/{imgs.video.img2}' alt={content.video.alt2} rotate='left' />
			</div>
		</Page>
		<Page mNumber="69">
			<div slot="mobile">
				<Entry date={content.video.date2} text={content.video.text2} />
			</div>
		</Page>
		<Page mNumber="70">
			<div slot="mobile">
				<Entry img='/archives/{imgs.video.img3}' alt={content.video.alt3} rotate='right' />
			</div>
		</Page>
		<Page mNumber="71">
			<div slot="mobile">
				<Entry date={content.video.date3} text={content.video.text3} />
			</div>
		</Page>
		<Page mNumber="72">
			<div slot="mobile">
				<Entry img='/archives/{imgs.video.img4}' alt={content.video.alt4} rotate='left' />
			</div>
		</Page>
		<Page mNumber="73">
			<div slot="mobile">
				<Entry date={content.video.date4} text={content.video.text4} />
			</div>
		</Page>
		<Page mNumber="74">
			<div slot="mobile">
				<Entry img='/archives/{imgs.video.img5}' alt={content.video.alt5} rotate='right' />
			</div>
		</Page>
		<Page mNumber="75">
			<div slot="mobile">
				<Entry date={content.video.date5} text={content.video.text5} />
			</div>
		</Page>
		<Page mNumber="76">
			<div slot="mobile">
				<Entry img='/archives/{imgs.video.img6}' alt={content.video.alt6} rotate='left' />
			</div>
		</Page>
		<Page mNumber="77">
			<div slot="mobile">
				<Entry date={content.video.date6} text={content.video.text6} />
			</div>
		</Page>
		<Page mNumber="78">
			<div slot="mobile">
				<Entry img='/archives/{imgs.video.img7}' alt={content.video.alt7} rotate='right' />
			</div>
		</Page>
		<Page mNumber="79">
			<div slot="mobile">
				<Entry date={content.video.date7} text={content.video.text7} />
			</div>
		</Page>
		<Page mNumber="80">
			<div slot="mobile">
				<Entry img='/archives/{imgs.video.img8}' alt={content.video.alt8} rotate='left' />
			</div>
		</Page>
		<Page mNumber="81">
			<div slot="mobile">
				<Entry date={content.video.date8} text={content.video.text8} />
			</div>
		</Page>
		<Page mNumber="82">
			<div slot="mobile">
				<h2 class="chapter mb-1">{isFr ? 'Programmation' : 'Programming'}</h2>
				<Entry img='/archives/{imgs.programming.img1}' alt={content.programming.alt1} rotate='right' />
			</div>
		</Page>
		<Page mNumber="83">
			<div slot="mobile">
				<Entry date={content.programming.date1} text={content.programming.text1} />
			</div>
		</Page>
		<Page mNumber="84">
			<div slot="mobile">
				<Entry img='/archives/{imgs.programming.img2}' alt={content.programming.alt2} rotate='left' />
			</div>
		</Page>
		<Page mNumber="85">
			<div slot="mobile">
				<Entry date={content.programming.date2} text={content.programming.text2} />
			</div>
		</Page>
		<Page mNumber="86">
			<div slot="mobile">
				<Entry img='/archives/{imgs.programming.img3}' alt={content.programming.alt3} rotate='right' />
			</div>
		</Page>
		<Page mNumber="87">
			<div slot="mobile">
				<Entry date={content.programming.date3} text={content.programming.text3} />
			</div>
		</Page>
		<Page mNumber="88">
			<div slot="mobile">
				<Entry img='/archives/{imgs.programming.img4}' alt={content.programming.alt4} rotate='left' />
			</div>
		</Page>
		<Page mNumber="89">
			<div slot="mobile">
				<Entry date={content.programming.date4} text={content.programming.text4} />
			</div>
		</Page>
		<Page mNumber="90">
			<div slot="mobile">
				<Entry img='/archives/{imgs.programming.img5}' alt={content.programming.alt5} rotate='right' />
			</div>
		</Page>
		<Page mNumber="91">
			<div slot="mobile">
				<Entry date={content.programming.date5} text={content.programming.text5} />
			</div>
		</Page>
		<Page mobile={true}>
			<h2 class="title">~ {content.end} ~</h2>
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
		font-size: 1.5rem;
		line-height: 2;
  }
	
	.title {
		text-transform: uppercase;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
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
		background-color: rgba(255, 234, 181, 0.8);
		box-shadow: 0 0 10px 30px rgba(255, 234, 181, 0.8);
	}

	#book, #mbook {
		filter: drop-shadow(#000 0px 10px 10px);
		border-radius: 10px;
		overflow: hidden; /* unfortunately the only way to prevent glitchy scrolling behaviour
												 caused by 3D transform overflow :/
											*/
	}

	@media (pointer: coarse) {
		#mbook {
			display: block;
		}

		#book {
			display: none !important;
		}
	}

	@media (pointer: fine) {
		#mbook {
			display: none !important;
		}

		#book {
			display: block;
		}

		.book-container {
			min-height: 100px;
			max-height: 600px;
		}
	}

	@media screen and (min-width: 500px) {
		.tabs {
			position: absolute;
			top: -1.5lh;
			/* left: calc((100% - 470px) / 2); */
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
			left: calc((100% - 910px) / 2 + 5px);
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
		}
	}

	@media screen and (pointer: fine) and (min-width: 1100px) {
		.tabs {
			left: calc((100% - 950px) / 2 + 5px);
		}
	}

	@media screen and (pointer: coarse) and (min-width: 1100px) {
		.tabs {
			left: 67.5px;
		}
	}
</style>