<svelte:head>
  <meta name="description" content="Official archives of the Mari Angryneers!">
  <title>Archives | Mari Angryneers</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import * as St from 'page-flip';

	let flipbook;

	onMount(() => {
		const pageFlip = new St.PageFlip(flipbook, {
			width: 500,
			height: 600,
      size: 'stretch',
      minWidth: 280,
      maxWidth: 500
		});
		pageFlip.loadFromHTML(flipbook.querySelectorAll('.book-page'));
	});

	// const prevBtn = document.querySelector('#prev-btn');
	// const nextBtn = document.querySelector('#next-btn');
</script>

<h1 class="text-white text-center">Archives</h1>

<button id="prev-btn">
	<img src="" />
</button>

<div class="book-container d-flex justify-content-center align-items-center px-3 px-md-5 px-xl-none">
  <div id="book" bind:this={flipbook}>
    <div class="book-page">Page Cover</div>
    <div class="book-page">!!!back of front cover page!!!</div>
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
  .book-container {
    min-height: 100px;
    max-height: 600px;
    padding-bottom: 2rem;
  }

	#book {
		overflow: hidden;
    border-radius: 10px;
	}
  
	.book-page {
    border: solid 1.5rem antiquewhite;
		background: ghostwhite;
    padding: 2rem;
    overflow: auto;
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

	h1 {
		padding: 25px;
    text-shadow: #000 5px 0px 0px, #000 4.90033px 0.993347px 0px, #000 4.60531px 1.94709px 0px, #000 4.12668px 2.82321px 0px, #000 3.48353px 3.58678px 0px, #000 2.70151px 4.20736px 0px, #000 1.81179px 4.6602px 0px, #000 0.849836px 4.92725px 0px, #000 -0.145998px 4.99787px 0px, #000 -1.13601px 4.86924px 0px, #000 -2.08073px 4.54649px 0px, #000 -2.94251px 4.04248px 0px, #000 -3.68697px 3.37732px 0px, #000 -4.28444px 2.57751px 0px, #000 -4.71111px 1.67494px 0px, #000 -4.94996px 0.7056px 0px, #000 -4.99147px -0.291871px 0px, #000 -4.83399px -1.27771px 0px, #000 -4.48379px -2.2126px 0px, #000 -3.95484px -3.05929px 0px, #000 -3.26822px -3.78401px 0px, #000 -2.4513px -4.35788px 0px, #000 -1.53666px -4.75801px 0px, #000 -0.560763px -4.96845px 0px, #000 0.437495px -4.98082px 0px, #000 1.41831px -4.79462px 0px, #000 2.34258px -4.41727px 0px, #000 3.17346px -3.86382px 0px, #000 3.87783px -3.15633px 0px, #000 4.4276px -2.32301px 0px, #000 4.80085px -1.39708px 0px, #000 4.98271px -0.415447px 0px;
    /* font-size: 2.75rem; */
  }

  @media screen and (min-width: 992px) {
    .book-container {
      padding-bottom: 3rem;
    }
  }
</style>
