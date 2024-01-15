<script>
    import badWords from 'bad-words';
    import frenchWords from 'french-badwords-list';
    import { userStore } from "$lib/Store";

    export let isFr = false;
    const inputFilter = new badWords;
    inputFilter.addWords(...frenchWords.array);

    let inputError = false;

    let userHobbies = $userStore.hobbies;
    let userPower = $userStore.superPower;

    function setSubmitAttributes(value){

        if(userHobbies == "" || userPower == "" || inputFilter.isProfane(userHobbies) || inputFilter.isProfane(userPower)){
            inputError = true;
        }
        else{
            userStore.update( currentElemens => ({
            ...currentElemens, 
            submittedAttributes: value,
            superPower: userPower,
            hobbies: userHobbies
          }))
            inputError = false;
        }
    }
</script>

<main>

    <div class="rounded-content-box container p-3">
        {#if !$userStore.submittedAttributes}
                <div class="text-center p-4 description-text">{(isFr? `Pour que les autres Angrynieurs apprennent plus sur vous, dites-nous plus sur ce qui vous rend unique${($userStore.name == "" ? "" : `, ${$userStore.name}`)}!` : `In order for the other Angryneers to get to know you better, tell us more about what makes you unique${($userStore.name == "" ? "" : `, ${$userStore.name}`)}!`)}</div>

            <div class="p-5">
                <div>
                    <form action="" class="form-text">
                        <label for="power" class="form-label">{(isFr ? "Votre super pouvoir:" : "Your super power:")}</label>
                        <input type="text" id="power" class="form-control form-control-lg inputError" class:input_error={inputError} 
                            placeholder={(inputError? (isFr ? "Veuillez entrer un super pouvoir" : "Please enter a super power") : (isFr? "Ex: teleportation, télékinésie, enlargement" : "e.g. teleportation, telekinesis, enlargement"))} 
                            bind:value={userPower}>
                        <label for="hobbies" class="form-label mt-4">{(isFr? "Vos passe-temps:" : "Your hobbies:")}</label>
                        <input type="text" id="hobbies" class="form-control form-control-lg" class:input_error={inputError} 
                                placeholder={(inputError? (isFr? "Veuillez entrer un passe-temps" : "Please enter a hobby") : (isFr? "Ex: ingénierie, piano, jeux video" : "e.g. engineering,  play piano, video games"))} 
                                bind:value={userHobbies}>
                    
                    </form>
                    <div class="text-center m-3">
                        <button class="btn btn-outline-primary" on:click={() => {setSubmitAttributes(true)}}>{(isFr ? "Soumettre" : "Submit")}</button>
                    </div>
                </div>
            </div>
        {:else}
            <p class="description-text text-center">{(isFr ? `Il parait que vous êtes un maitre de ${$userStore.superPower} et que vous aimez ${$userStore.hobbies}!` : `It looks like you are a master of ${$userStore.superPower} and you enjoy ${$userStore.hobbies}!`)}</p>
            <div class="text-center mb-4">  
                <button class="btn btn-outline-primary mx" on:click={() => {setSubmitAttributes(false)}}>{(isFr? "Modifiez les qualités" : "Edit Qualitites")}</button>
            </div>
    
            <!-- include where to go next to learn more about competition -->


        {/if}

        <div class="competition-description p-5 text-center">
            <p>{(isFr? "En mémoire de la défaite du Chateau du Roi Cochon, les Angrynieurs reproduissent cet événement mémorial à chaque année et compétitionnent pour le meilleur lance-pierre! Les Angrynieurs de Mari sont divisés en cinq équipes afin de réaliser cet événement:" : "In memory of the defeat of the King Pig's Castle, the Angryneers reproduce this memorial event each year and compete in order to test who has the best slingshot! The Mari Angryneers are divided into five subteams to make this happen:")}</p>
            <div class="text-center mt-2 p-5">
                <ul>
                    <li> <strong>{(isFr? "L'équipe du lance-pierre" : "The slingshot team")}</strong> {(isFr ? "qui s'occupe de la fabrication du lance-pierre le plus performant utilisant les dernères technologies" : "involved in the production of the most performant slingshot using the newest technologies")}</li>
                    <li> <strong>{(isFr ? "L'équipe de recrutement" : "The recruitment team")}</strong> {(isFr ? "pour produire des vidéos qui attirent des nouveaux recrus" : "for producing videos that attract new recruits")}</li>
                    <li> <strong>{(isFr ? "L'équipe du site web" : "The website team")}</strong> {(isFr ? "pour aider les nouveaux recrus à se familiariser avec la compétition" : "for helping new recruits to get familiar with the competition")}</li>
                    <li><strong>{(isFr ? "L'équipe de design" : "The design team")}</strong> {(isFr ? "qui est en charge de reconstruire le Chateau du Roi Cochon où la compétition aura lieu" : "that is in charge of rebuilding the King Pig's Castle where the competition will take place")}</li>
                    <li><strong>{(isFr ? "L'équipe de programmation" :"The programming team")}</strong> {(isFr ? "qui est en charge de s'assurer que nous avons les systèmes les plus sécuritaire pour tenir les pirateurs informatiques loin durant la compétition" : "that is in charge of making sure that we have the most secure systems to keep hackers away during the competition")}</li>
                </ul>
            </div>
        </div>
        <div class="description-text ms-5 mb-5">{(isFr? `Apprenez à bien les connaitre, ${($userStore.name =="" ? "Angrynieur" : $userStore.name)}!` : `Get to know them well, ${($userStore.name =="" ? "Angryneer" : $userStore.name)}!`)}</div>
    </div>
</main>


<style>
    .rounded-content-box {
		background-color: #ffeab5;
		border-radius: 25px;
	}

	.description-text {
		font-size: 30px;
	}
    .form-text{
        font-size: 25px;
    }

    ul{
        list-style-type: none;
    }

    .competition-description{
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 25px;
    }

    ul li{
        margin-bottom: 10px;
    }

</style>