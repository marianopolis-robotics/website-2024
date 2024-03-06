<script>
    import { userStore } from "$lib/Store";
    import WoodButton from "./WoodButton.svelte";

    export let isFr = false;

   let attributes = {
      accessories: ["caliper", "screwdriver"],
      hats: ["whiteHat", "greenHat"],
      shapes: ["red", "bomb", "blue", "bubbles", "chuck", "dahlia", "drill", "hal", "ice", "luca", "matilda", "melody", "pig", "poppy", "silver", "stella", "terence", "tony"]
   }

   let tabs = [ {tab: "Shape", tabFr:"Forme", selected: true},
              {tab: "Accessory", tabFr: "Accessoire", selected: false}, 
              {tab: "Hat", tabFr: "Chapeur", selected: false}]

   let selectedTab = tabs[0]; //make reactive to tabs selected value
  
   let newIndex = 0;

   function nextAccessory(accessory){
          
    newIndex = $userStore[`${accessory}Index`] + 1;
  
      if(newIndex >= attributes[(accessory=="accessory" ? "accessories" : `${accessory}s`)].length){
        newIndex = 0;
    }
    updateAccessory(newIndex, accessory);
    
   }
  
   function prevAccessory(attribute){
    console.log($userStore.accessory);
    console.log(attribute);
    console.log((accessory=="accessory" ? "accessories" : `${accessory}s`));
    
    newIndex = $userStore[`${attribute}Index`] - 1;
    if(newIndex <= -1){
      newIndex = attributes[`${attribute}s`].length -1;
    }
    updateAccessory(newIndex, attribute);
   
    
    console.log($userStore.accessoryIndex);
    
   }
  
  function updateAccessory(index, accessoryType){
  
          userStore.update( currentElemens => ({
            ...currentElemens, 
            [`${accessoryType}Index`]: index,
            [accessoryType]: attributes[`${accessoryType}s`][index]
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
 
  <main>
    <div class="container my-5 description-text">
      {#if !$userStore.submittedCostume}
        <div class="row text-center">
          <div class="col description_text">{(isFr ? `Choisissez votre ${selectedTab.tabFr.toLocaleLowerCase()}!` : `Choose your ${selectedTab.tab.toLowerCase()}!`)}</div>
        </div>
        <div class="row align-items-center">
          <!-- Choose accessory type tabs -->
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
            <img src={`/birds/${$userStore.shape}.svg`} alt="">
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
            <div class="m-3"><img src={`/birds/${$userStore.shape}.svg`} alt=""></div>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <WoodButton message={(isFr? "Modifier votre costume":"Edit costume")} on:click={() => {setSubmitCostume(false)}}/>
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
  