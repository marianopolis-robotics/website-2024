<script>
	import { userStore } from '../../../Store';

    let birdImg;
   
	let tallBirds = ['tony', 'terence', 'matilda'];
</script>

<div class="text-center bird_display" >
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
        alt=""
    />
</div>


<style>
	.hat {
		width: 50%;
        z-index: -1;
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
        position: absolute;
        top: -10%;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
    }

	.bird {
		z-index: -2;
	}
	

	.accessory {
		float: left;
		width: 50%;
		position: absolute;
		left: -5%;
		top: 45%;
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
