<script>
    export let message = "tab";
    export let isSelected = false;
    export let large_width = false;
</script>

<main>
    <button class="btn btn-lg button my-2" class:selected = {isSelected} class:w-100={large_width} on:click|self>{message}</button>
</main>


<style>
.button{
    background-size: 100%;
    background: url("/textures/wood.png") no-repeat scroll 0 0 transparent;
    color:white;
}

.selected{
    text-decoration: underline;
}
</style>