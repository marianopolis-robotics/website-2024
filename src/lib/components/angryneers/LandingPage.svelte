<script>
    import Popup from "./Popup.svelte"
    let showPopup = false;
    
    const birdArray = ['poppy', 'blue', 'bomb', 'bubbles', 'chuck', 'dahlia', 'drill', 
    'hal', 'ice', 'luca', 'matilda', 'melody', 'red', 'silver', 'stella', 
    'terence', 'tony', 'willow']

</script>


{#each birdArray as bird (bird)}
    <button on:click={() => showPopup = true}><img src="/birds/{bird}.svg" alt= {bird}></button>
{/each}




<Popup bind:showPopup/>

 

 

<style>
    button {
        background: none;
        border: none;
    }

    img {
        height: 150px;
        width: 150px;
    }

</style>







