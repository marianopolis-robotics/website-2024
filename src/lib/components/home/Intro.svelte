<script>
	import { userStore } from '../../../Store';

    export let isFr=false;

    let inputError = false;


    function setSubmittedName(value){
        if($userStore.name == ""){
            inputError=true;
        }
        else{
            userStore.update( currentElemens => ({
            ...currentElemens, 
            submittedName: value,
          }))

          inputError=false;
        }
    }

</script>

<main>
	<div class="container rounded-content-box my-5 description-text">
		<div class="row align-items-center">
			<div class="col text-center p-5">
				{(isFr ? "Bienvenue à la base principale des Angrynieurs de Mari! Designez votre oiseau pour rejoindre la compétition annuelle des Angrynieurs Kryptic!" : "Welcome to the Mari Angryneers Home Base! Design your bird in order to join the annual Kryptik Angryneers competition!")}
			</div>
			<div class="col p-5 text-center">
                {#if !$userStore.submittedName}
				<p>{(isFr? "Quel est votre nom, Angrynieur?" : "What is your name, Angryneer?")}</p>
				<input
					type="text"
					bind:value={$userStore.name}
					placeholder={(inputError? (isFr? "Veuillez entrer un nom" : "Please enter a name") : (isFr? "Entrez votre nom" : "Enter your name"))}
					class="form-control-lg w-75 m-0"
                    class:input_error={inputError}
				/>
                
                <button class="btn btn-outline-primary btn-lg m-0 px-2" on:click={() => {setSubmittedName(true)}}>{(isFr ? "Entrée" : "Enter")}</button>
                {:else}
                <p>{(isFr? `C'est un plaisir de vous avoir parmi nous, ${$userStore.name}!` : `It is great to have you among us, ${$userStore.name}!`)}</p>
                <p>{(isFr ? "Personnalisez votre avatar pour nous en dire plus sur vous-même!" : "Customize your avatar to tell us more about yourself!")}</p>
                <button class="btn btn-outline-primary" on:click={() => {setSubmittedName(false)}}>{(isFr ? "Changez le nom" : "Edit name")}</button>
                {/if}
			</div>
		</div>
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
</style>
