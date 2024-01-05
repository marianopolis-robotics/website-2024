<script>
    import { userStore } from "../../../Store";
    import WoodButton from "./WoodButton.svelte";
    import {onMount} from 'svelte';
  

   let accessories = {
      colors: ["blue", "red", "yellow", "pink"],
      hats: ["whiteHat", "greenHat"],
      shapes: ["red", "bomb"]
   } 

   let tabs = [{tab: "Color", selected: true}, {tab: "Hat", selected: false}, {tab: "Shape", selected: false}]

    
   let selectedTab = "color";
  
   let newIndex = 0;
  
   function nextAccessory(accessory){
          
    newIndex = $userStore[`${accessory}Index`] + 1;
  
      if(newIndex >= accessories[`${accessory}s`].length){
        newIndex = 0;
    }
    updateAccessory(newIndex, accessory);
    
   }
  
   function prevAccessory(accessory){
    
    newIndex = $userStore[`${accessory}Index`] - 1;
    if(newIndex <= -1){
      newIndex = accessories[`${accessory}s`].length -1;
    }
    updateAccessory(newIndex, accessory);
    
   }
  
  function updateAccessory(index, accessoryType){
  
          userStore.update( currentElemens => ({
            ...currentElemens, 
            [`${accessoryType}Index`]: index,
            [accessoryType]: accessories[`${accessoryType}s`][index]
          }))
    
  }

  // change selected value of each tab when a tab is clicked
  function toggleSelect(clickedTab){
    console.log("clicked");
      for (let tab of tabs){
        if (tab == clickedTab){
          tab.selected = true;
          selectedTab = tab.tab.toLowerCase();
        }
        else{
          tab.selected = false;
        }
      }
      // in order for svelte to detect change in tabs
      tabs=tabs;
  }
  </script>
  
  <svelte:head>
    <meta name="description" content="Welcome to the base of the Mari Angryneers!">
    <title>Home | Mari Angryneers</title>
  </svelte:head>
  
 
  <main>
    <div class="container my-5">
      <div class="row text-center">
        <div class="col description_text">Chose your {selectedTab}!</div>
      </div>
      <div class="row align-items-center">
        <!-- Chose accessory type tabs -->
        <div class="col text-center">
          {#each tabs as tab}
            <WoodButton message={tab.tab} isSelected={tab.selected} large_width={true} on:click={() => {toggleSelect(tab)}} /> 
          {/each}
        </div>
        <!-- Switch between accessories -->
        <div class="col text-center col-lg-3">
          <WoodButton message="<" on:click={() => {prevAccessory(selectedTab)}}/>
        </div>
        <div class="col">
          <p class="text-center">
            {$userStore[selectedTab]}
          </p>
        </div>
        <div class="col text-center">
          <WoodButton message=">" on:click={() => {nextAccessory(selectedTab)}}/>
        </div>
      </div>
    </div>
    
   
  </main>


  <style>
      .description_text{
        font-size: 40px;
      }
  </style>
  