<script>
    import { userStore } from "../../../Store";

    let tallBirds = ["tony", "terence", "matilda"]
</script>


<main>
    <div class="text-center bird_display">
        <!-- <p>{$userStore.shape}</p> -->
        <img class="accessory" class:big_accessory={$userStore.accessory=="laptop"} src="{`/accessories/${$userStore.accessory}.svg`}" alt={$userStore.hat}>
        <img class="hat mx-auto" src="{`/hats/${$userStore.hat}.svg`}" alt={$userStore.hat}>
        <img class="bird" class:big_bird={tallBirds.includes($userStore.shape)} src={`/birds/${$userStore.shape}.svg`} alt="">
        
        
    </div>
</main>


<style>
    .hat{
        width: 50%;
        z-index: 2;
        
        /* position: relative; */
      }

    .bird{
        z-index: 1;
        margin-top: -11vw;
    }
    .big_bird{
        margin-top: -7vw !important;
    }

    .accessory{
        float:left;
        width: 55%;
        position:absolute;
        z-index: 3;
        left: 0vw;
        top: 7vw;
    }

    .big_accessory{
        left: -3vw;
    }

    .bird_display{
        position: relative;
    }

    img{
        position: relative;
    }
</style>