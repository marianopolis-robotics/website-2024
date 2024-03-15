<script>
  export let mNumber = null;
  export let number = null;
  export let toc = false;
  export let specialPg = false;
</script>

<div class="book-page">
  <!-- for the StPageFlip to work well on mobile, we can't have scrolling containers/pages (tapping always flips the page)
    so we use named slots to handle touch-only screens -->
  <!-- default slot (some content is the same on all devices and doesn't need the named slots) -->
  <slot />
  <div class="pointer flex-column justify-content-between" class:toc class:specialPg>
    <slot name="pointer" />
    {#if number}
    <p class="text-center fst-italic mb-0{specialPg ? '' : ' pb-2 pb-sm-4'}">{number}</p>
    {/if}
  </div>
  <div class="mobile flex-column justify-content-between" class:toc class:specialPg>
    <slot name="mobile" />
    <p class="text-center fst-italic mb-0{specialPg ? '' : ' pb-2 pb-sm-4'}">{mNumber}</p>
  </div>
</div>

<style>
  .book-page {
		background: #f7ddbb;
		padding: 1.5rem;
		border-radius: 10px;
		border: solid 1.5rem #b4814b;
	}

  .pointer, .mobile {
    height: 100%;
  }

  .book-page .toc {
    height: calc(100% - 32px - 0.5rem);
  }

  @media (pointer: fine) {
    .book-page {
      overflow: auto;
    }

    div.pointer {
      display: flex;
    }

    div.mobile {
      display: none;
    }
  }

  @media (pointer: coarse) {
    div.pointer {
      display: none;
    }

    div.mobile {
      display: flex;
    }
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
  }

  @media screen and (min-width: 576px) {
    .book-page .toc {
      height: calc(100% - 32px - 1rem);
    }
  }

  @media screen and (min-width: 610px) {
		.book-page {
			border-radius: 0px;
		}
  }
</style>