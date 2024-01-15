<script>
    export let message = "tab";
    export let isSelected = false;
    export let large_width = false;
</script>

<main>
    <button class="btn btn-lg button my-2 change_on_hover" class:selected = {isSelected} class:w-100={large_width} on:click|self>{message}</button>
</main>


<style>
.button{
    background: url("/textures/wood.png") no-repeat scroll 0 0 transparent;
    background-size: cover;
    color:white;
    resize: both;
    font-family: "Angry Birds";
    font: 40px;
}

.selected{
    text-decoration: underline;
}

.change_on_hover:hover{
    color: black
}
</style>