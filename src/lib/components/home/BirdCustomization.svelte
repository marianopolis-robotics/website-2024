<script>
    import { userStore } from "../../../Store";
    import WoodButton from "./WoodButton.svelte";
    import {onMount} from 'svelte';

    export let isFr = false;

   let accessories = {
      colors: ["blue", "red", "yellow", "pink"],
      hats: ["whiteHat", "greenHat"],
      shapes: ["red", "bomb"]
   } 

   let tabs = [{tab: "Color", tabFr: "Couleur", selected: true}, 
              {tab: "Hat", tabFr: "Chapeur", selected: false}, 
              {tab: "Shape", tabFr:"Forme", selected: false}]

   let selectedTab = tabs[0];
  
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
          selectedTab = tab;
        }
        else{
          tab.selected = false;
        }
      }
      // in order for svelte to detect change in tabs
      tabs=tabs;
  }

  function setSubmitCostume(value){
    userStore.update( currentElemens => ({
            ...currentElemens, 
            submittedCostume: value,
          }))
  }

  
  
  </script>
  
  <svelte:head>
    <meta name="description" content="Welcome to the base of the Mari Angryneers!">
    <title>Home | Mari Angryneers</title>
  </svelte:head>
  
 
  <main>
    <div class="container my-5 description-text">
      {#if !$userStore.submittedCostume}
        <div class="row text-center">
          <div class="col description_text">{(isFr ? `Choisissez votre ${selectedTab.tabFr.toLocaleLowerCase()}!` : `Chose your ${selectedTab.tab.toLowerCase()}!`)}</div>
        </div>
        <div class="row align-items-center">
          <!-- Chose accessory type tabs -->
          <div class="col text-center">
            {#each tabs as tab}
              <WoodButton message={(isFr? tab.tabFr : tab.tab)} isSelected={tab.selected} large_width={true} on:click={() => {toggleSelect(tab)}} /> 
            {/each}
          </div>
          <!-- Switch between accessories -->
          <div class="col text-center col-lg-3">
            <WoodButton message="<" on:click={() => {prevAccessory(selectedTab.tab.toLowerCase())}}/>
          </div>
          <div class="col">
            <p class="text-center">
              {$userStore[selectedTab.tab.toLowerCase()]}
            </p>
          </div>
          <div class="col text-center">
            <WoodButton message=">" on:click={() => {nextAccessory(selectedTab.tab.toLowerCase())}}/>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <WoodButton message={(isFr ? "Sauvegarder" : "Save")} on:click={() => {setSubmitCostume(true)}}/>
          </div>
        </div>
      {:else}
        <div class="row">
          <div class="col text-center description-text m-">
            <div class="description_text">{(isFr? `Cela vous va bien` : `You look great`)}{($userStore.name=="" ? "" : `, ${$userStore.name}`)}!</div>
          </div>
        </div>
        <div class="row text-center">
          <div class="col">
            <div class="m-3">(display costume)</div>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <WoodButton message="Edit costume" on:click={() => {setSubmitCostume(false)}}/>
          </div>
        </div>
      {/if}
    </div>
    
   
  </main>


  <style>
      .description_text{
        font-size: 40px;
      }
  </style>
  