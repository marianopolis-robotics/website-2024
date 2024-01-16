
<script>
    export let showPopup;
    export let text = '';

  


    

    
</script>

{#if showPopup}
    <button on:click = {() => showPopup = false}> </button>
    <p>
        <textarea name="the captains" id="what" cols="30" rows="10"></textarea>
        
    </p>
 {/if}
 <div style = "position:absolute; left:80px; top:20px; background-color:yellow;">
    This div has absolute positioning.
 </div>
 

 
<style>

textarea {
  position: absolute;
  width: 400px;
  height: 200px;
  border: 3px solid #73AD21;
}

</style>


