<script>
	import { userStore } from '../../../Store';
    import { onMount } from 'svelte';


    let birdImg;
    let imageHeight;
    
    onMount(() => {
    
    if (birdImg){
        imageHeight=birdImg.clientHeight;
    }

  });
  function onResize(){
    imageHeight=birdImg.clientHeight;
  }
   
	let tallBirds = ['tony', 'terence', 'matilda'];
</script>
<svelte:window on:resize={onResize} />
<main>
	<div class="text-center bird_display" style="--birdImg-height: {imageHeight}">
		<img
			class="accessory"
			class:big_accessory={$userStore.accessory == 'laptop'}
			src={`/accessories/${$userStore.accessory}.svg`}
			alt={$userStore.hat}
		/>
		<img class="hat" class:hat-big={tallBirds.includes($userStore.shape)} src={`/hats/${$userStore.hat}.svg`} alt={$userStore.hat} />
		<img 
			class="bird"
			
			src={`/birds/${$userStore.shape}.svg`}
            bind:this={birdImg}
			alt=""
		/>
	</div>

</main>

<style>
	.hat {
		width: 50%;
		z-index: 2;
        position: absolute;
        top: 10%;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;

		/* position: relative; */
	}

    .hat-big{
        width: 50%;
		z-index: 2;
        position: absolute;
        top: -10%;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
    }

	.bird {
		z-index: 1;
		/* margin-top: -11vw; */
	}
	

	.accessory {
		float: left;
		width: 50%;
		position: absolute;
		z-index: 3;
		left: -5%;
		top: 45%;
		/* top: 7vw; */
		/* top: 0 */
        /* top:50% */
	}

	.big_accessory {
		left: -3vw;
	}

	.bird_display {
		position: relative;
	}

	img {
		position: relative;
	}
   
</style>
