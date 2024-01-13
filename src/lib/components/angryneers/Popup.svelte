
<script>
    export let showPopup;

</script>

{#if showPopup}
    <p on:click = {() => showPopup = false}>
        hello world
        
    </p>
 {/if}

 
<style>
    
</style>


