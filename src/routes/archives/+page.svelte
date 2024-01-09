<script>
	import { onMount } from 'svelte';
	import * as St from 'page-flip';

	let flipbook;

	onMount(() => {
		const pageFlip = new St.PageFlip(flipbook, {
			width: 700,
			height: 600,
			showCover: true
		});
		pageFlip.loadFromHTML(flipbook.querySelectorAll('.my-page'));
	});

	// const prevBtn = document.querySelector('#prev-btn');
	// const nextBtn = document.querySelector('#next-btn');
</script>

<h1 class="centertop">Archives</h1>

<button id="prev-btn">
	<img src="" />
</button>

<div class="book-container d-flex justify-content-center align-items-center">
	<div id="book" bind:this={flipbook}>
		<div class="my-page">Page Cover</div>
		<div class="my-page">!!!back of front cover page!!!</div>
		<div class="my-page">Robot tab page</div>
		<div class="my-page">back of robot tab page</div>
		<div class="my-page">
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
		<div class="my-page">
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
		<div class="my-page">
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
		<div class="my-page">Robot page 4</div>
		<div class="my-page">Robot page 5</div>
		<div class="my-page">Robot page 6</div>
		<div class="my-page" data-density="hard">Kiosk tab page</div>
		<div class="my-page">back of kiosk tab page</div>
		<div class="my-page">kiosk page 1</div>
		<div class="my-page">kiosk page 2</div>
		<div class="my-page">kiosk page 3</div>
		<div class="my-page">kiosk page 4</div>
		<div class="my-page">kiosk page 5</div>
		<div class="my-page">kiosk page 6</div>
		<div class="my-page" data-density="hard">Website tab page</div>
		<div class="my-page">back of website tab page</div>
		<div class="my-page">website page 1</div>
		<div class="my-page">website page 2</div>
		<div class="my-page">website page 3</div>
		<div class="my-page">website page 4</div>
		<div class="my-page">website page 5</div>
		<div class="my-page">website page 6</div>
		<div class="my-page" data-density="hard">Video tab page</div>
		<div class="my-page">back of video tab page</div>
		<div class="my-page">video page 1</div>
		<div class="my-page">video page 2</div>
		<div class="my-page">video page 3</div>
		<div class="my-page">video page 4</div>
		<div class="my-page">video page 5</div>
		<div class="my-page">video page 6</div>
		<div class="my-page" data-density="hard">Programming tab page</div>
		<div class="my-page">back of programming tab page</div>
		<div class="my-page">prog page 1</div>
		<div class="my-page">kiosk page 2</div>
		<div class="my-page">kiosk page 3</div>
		<div class="my-page">kiosk page 4</div>
		<div class="my-page">kiosk page 5</div>
		<div class="my-page">kiosk page 6</div>
		<div class="my-page" data-density="hard">Last page</div>
		<div class="my-page">Cover of last page</div>
	</div>
</div>

<style>
	#book {
		overflow: hidden;
		/* border: solid 1.5rem antiquewhite; */
	}

	.my-page {
		background: ghostwhite;
	}

	.cover-page {
		background: antiquewhite;
		margin-left: auto;
		margin-right: auto;
		width: 50%;
		padding: 25px 25px 25px 25px;
		border-radius: 25px;
		bottom: 0px;
	}

	.flex-container {
		display: flex;
	}

	.flex-container > div {
		background-color: cadetblue;
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

	.centertop {
		display: block;
		padding: 25px;
		text-align: center;
		color: white;
	}
</style>
