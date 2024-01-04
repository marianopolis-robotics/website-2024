<script>
    import { userStore } from "../Store";
  
   let colors = ["blue", "red", "yellow", "pink"];
   let hat = ["whiteHat", "greenHat"]
  
   let newIndex = 0;
  
   function nextColor(){
          
    newIndex = $userStore.colorIndex + 1;
  
      if(newIndex >= colors.length){
        newIndex = 0;
    }
    updateColor(newIndex);
    
   }
  
   function prevColor(){
    
    newIndex = $userStore.colorIndex - 1;
    if(newIndex <= -1){
      newIndex = colors.length -1;
    }
    updateColor(newIndex);
    
   }
  
  function updateColor(colorIndex){
  
          userStore.update( currentElemens => ({
            ...currentElemens, 
            colorIndex: newIndex,
            color: colors[newIndex]
          }))
    
  }
  </script>
  
  <svelte:head>
    <meta name="description" content="Welcome to the base of the Mari Angryneers!">
    <title>Home | Mari Angryneers</title>
  </svelte:head>
  
  <!-- remove later! just a placeholder for testing background -->
  <main>
    <div class="container-md my-5">
      <div class="row">
        <div class="col text-center">
          <button class="btn btn-secondary" on:click={prevColor}>&lt</button>
        </div>
        <div class="col">
          <p class="text-center">{$userStore.color}</p>
        </div>
        <div class="col text-center">
          <button class="btn btn-secondary" on:click={nextColor}>&gt</button>
        </div>
      </div>
    </div>
   
  </main>


  <style>
 
  </style>
  