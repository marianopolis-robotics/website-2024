<script>
    import { userStore } from "../../../Store";
    import WoodButton from "./WoodButton.svelte";
    import UserBird from "./UserBird.svelte";

    export let isFr = false;

   let attributes = {
      accessories: ["caliper", "screwdriver", "laptop", "measuring-tape"],
      hats: ["construction-hat", "gear-hat", "director-hat", "hacker-hat"],
      shapes: ["red", "bomb", "blue", "bubbles", "chuck", "dahlia", "drill", "hal", "ice", "luca", "matilda", "melody", "pig", "poppy", "silver", "stella", "terence", "tony"]
   } 

   let tabs = [ {tab: "Shape", tabFr:"Forme", selected: true},
                {tab: "Hat", tabFr: "Chapeur", selected: false},
                {tab: "Accessory", tabFr: "Accessoire", selected: false}, 
              ]

   let selectedTab = tabs[0]; //make reactive to tabs selected value
  
   let newIndex = 0;

   function nextAccessory(attribute){
          
    newIndex = $userStore[`${attribute}Index`] + 1;
  
      if(newIndex >= attributes[(attribute=="accessory" ? "accessories" : `${attribute}s`)].length){
        newIndex = 0;
    }
    updateAccessory(newIndex, attribute);
    
   }
  
   function prevAccessory(attribute){
    
    newIndex = $userStore[`${attribute}Index`] - 1;
    if(newIndex <= -1){
      newIndex = attributes[(attribute=="accessory" ? "accessories" : `${attribute}s`)].length -1;
    }
    updateAccessory(newIndex, attribute);

    
   }
  
  function updateAccessory(index, accessoryType){
  
          userStore.update( currentElements => ({
            ...currentElements, 
            [`${accessoryType}Index`]: index,
            [accessoryType]: attributes[(accessoryType=="accessory" ? "accessories" : `${accessoryType}s`)][index]
          }))
    
  }

  // change selected value of each tab when a tab is clicked
  function toggleSelect(clickedTab){
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
          <div class="col description_text">{(isFr ? `Choisissez votre ${selectedTab.tabFr.toLocaleLowerCase()}!` : `Choose your ${selectedTab.tab.toLowerCase()}!`)}</div>
        </div>
        <div class="row align-items-center customization_row"> 
          <!-- Choose accessory type tabs -->
          <div class="col text-center"  >
            {#each tabs as tab}              
              <WoodButton message={(isFr? tab.tabFr : tab.tab)} isSelected={tab.selected} large_width={true} on:click={() => {toggleSelect(tab)}} /> 
            {/each}
          </div>
          <!-- Switch between accessories -->
          <div class="col text-center col-lg-3">
            <WoodButton message="<" on:click={() => {prevAccessory(selectedTab.tab.toLowerCase())}}/>
          </div>
          <div class="col align-items-center">
            <!-- <p>{`/birds/${$userStore.shape} and ${$userStore[selectedTab.tab.toLowerCase()]}`}</p> -->
            <UserBird/>
            
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
      <!-- Display after submit -->
        <div class="row">
          <div class="col text-center description-text m-">
            <div class="description_text">{(isFr? `Cela vous va bien` : `You look great`)}{($userStore.name=="" ? "" : `, ${$userStore.name}`)}!</div>
          </div>
        </div>
        <div class="row text-center customization_row justify-content-center mt-5">
          <div class="col col-3">
            
              <UserBird/>
            
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

      .customization_row{
        height: 50vh;
      }

      
  </style>
  