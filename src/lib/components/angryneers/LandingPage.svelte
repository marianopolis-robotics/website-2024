<script>
    import Popup from "./Popup.svelte"  

    let showPopup = false;
    let birds = ['poppy', 'blue', 'bomb', 'bubbles', 'chuck', 'dahlia', 'drill', 
'hal', 'ice', 'luca', 'matilda', 'melody', 'red', 'silver', 'stella', 
'terence', 'tony', 'willow'];
    
    let currentBird = birds[0];

    

    function displayPopup(bird){
        showPopup = true;
        currentBird = bird;
    }


</script>

<div>
    {#each birds as bird (bird)}
    <button class="angryneer" on:click={() => displayPopup(bird) }><img src="/birds/{bird}.svg" alt= {bird}></button>
{/each}


    <p>{currentBird}</p>

<Popup bind:showPopup bird={currentBird}/>



</div>


 

 

<style>
    button {
        background: none;
        border: none;
    }

    img {
        height: 150px;
        width: 150px;
    }
    .angryneer{
        /* margin-right: -7vw; */
    }

</style>







