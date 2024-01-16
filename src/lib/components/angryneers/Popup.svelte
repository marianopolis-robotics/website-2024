
<script>
    import WoodButton from "../home/WoodButton.svelte";
    export let showPopup;
    export let bird;
    
    // export let text = '';
    let birds = ['poppy', 'blue', 'bomb', 'bubbles', 'chuck', 'dahlia', 'drill', 
'hal', 'ice', 'luca', 'matilda', 'melody', 'red', 'silver', 'stella', 
'terence', 'tony', 'willow'];

    let angryneer = {
        Adelina: {
            bird: "poppy",
            name: "Adelina Badea",
            subteam: "Website",
            power: "Tornado spin",
            hobbies: "3D modelling, karate, and learning new skills through online courses",
            funFacts: "I was born prematurely and I have a little dog that has a very snobby personality.",
            learned: "I learned some web development to program this very page (the Angryneers page). I learned how to design, paint and build a thematic kiosk.I had to sacrifice many nights of sleep and relaxation during the winter break by learning to code from absolutely no experience in web development. Initially, I thought this path would be too difficult and boring, but I could not have been more wrong. I had so much fun learning to program and debug my code, that I actually plan on doing more web dev in the future."

        },
        Aleksandr: {
            bird: "hal",
            name: "Aleksandr Kudashkin",
            subteam: "Robot, programming",
            power: "Boomerang",
            hobbies: "Mathematics, programming, video game development, swimming",
            funFacts: "Sometimes I describe my dreams using mathematical formulas and functions. Also, when I'm reading, I become so immersed in the book that I don't hear the people addressing me.",
            learned: "I learned how to (and how not to) use electrical motors and motor controllers, as well as their different types. I also learned the principles behind the omni-wheels design and function. I acquired the skills to identify and eliminate the bottlenecks in the robot's development. I applied my knowledge of programming, and learned to utilize parsing, graph theory and design patterns in my code. Finally, I have completed an advanced Python course and a course on design patterns to prepare for the programming competition. To participate on the robotics team, I sacrificed participating in other clubs and meeting friends during Activity Periods, as well as the second half of my winter vacation."

        },  
        Aleksandr: {
            bird: "hal",
            name: "Aleksandr Kudashkin",
            subteam: "Robot, programming",
            power: "Boomerang",
            hobbies: "Mathematics, programming, video game development, swimming",
            funFacts: "Sometimes I describe my dreams using mathematical formulas and functions. Also, when I'm reading, I become so immersed in the book that I don't hear the people addressing me.",
            learned: "I learned how to (and how not to) use electrical motors and motor controllers, as well as their different types. I also learned the principles behind the omni-wheels design and function. I acquired the skills to identify and eliminate the bottlenecks in the robot's development. I applied my knowledge of programming, and learned to utilize parsing, graph theory and design patterns in my code. Finally, I have completed an advanced Python course and a course on design patterns to prepare for the programming competition. To participate on the robotics team, I sacrificed participating in other clubs and meeting friends during Activity Periods, as well as the second half of my winter vacation."

        }

    }


    $: currentBird = bird;
    let birdIndex = birds.indexOf(bird);

    
    function changeBird(number){
        console.log(birds.length);
        birdIndex += number;
        
        if (birdIndex <=-1){
            birdIndex = birds.length-1;
        }
        if (birdIndex>=birds.length){
            birdIndex = 0;
        
        }
    
        currentBird=birds[birdIndex]
    }

    
</script>
{#if showPopup}

<div class="background">
    <div class="grid character_box">
        <div class="row">
            <div class="col close_button d-flex justify-content-end">
                <WoodButton on:click = {() => showPopup = false} message="X"/>
            </div>

        </div>
        <div class="row popup align-items-center">
            <div class="col-md-auto p-5">
                <WoodButton message="<" on:click={() => {changeBird(-1)}}/>
            </div>
            <div class="col ">
                <img src={`/birds/${currentBird}.svg`} alt="">
            </div>
            <div class="col rounded-content-box box">
                
                <div>
                    <img class="frame_left" src="/textures/woodddd_please.svg" alt="">
                    <p class="stat p-2 mt-2"><strong>Name:</strong> Adelina</p>
                    <p class="stat p-2"><strong>Power:</strong> Tornado spin</p>
                    <p class="stat p-2"><strong>Hobbies:</strong> 3D modelling, karate, and learning new skills through online courses</p>
                    <p class="stat p-2"><strong>Fun Facts:</strong> I was born prematurely and I have a little dog that has a very snobby personality.</p>
                    <p class="stat p-2"><strong>Description:</strong> I learned some web development to program this very page (the Angryneers page). I learned how to design, paint and build a thematic kiosk.

                        I had to sacrifice many nights of sleep and relaxation during the winter break by learning to code from absolutely no experience in web development. Initially, I thought this path would be too difficult and boring, but I could not have been more wrong. I had so much fun learning to program and debug my code, that I actually plan on doing more web dev in the future.
                        </p>
                </div>
            </div>
            <div class="col-md-auto p-5 ">
                <WoodButton message = ">" on:click={() => changeBird(1)}/>
            </div>
        </div>
         
    </div>
   
    
   
</div>

{/if}

 
<style>

.box{
    /* background-color: #0a8723; */
    position: relative;
    height: 400px;
    overflow: scroll;
    
    /* border-image:url(/textures/wood-frame.svg) 30 stretch; */

}

.frame_left{
    position: absolute;
    left: 0;
    top: 0;
    width: 60vh;
}
.stat{
    background-color: #85bce7;
    border-radius: 25px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: 2px solid blue;
    /* color: white; */
}

.close_button{
    margin-top: -20px;
}

.character_box{
    margin-top: 20%;
    margin: 200px;
}

.test{
    background-color: aqua;
}

.background{
    position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  -webkit-animation-name: fadeIn; /* Fade in the background */
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s
}

.popup{
    height: 20%;
}
</style>


