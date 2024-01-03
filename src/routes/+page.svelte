<script>
	import { userStore } from "../Store";

    
</script>


<main>
   <h1>{$userStore.hat}</h1>
   <input type="text" bind:value={$userStore.hat}>
</main>