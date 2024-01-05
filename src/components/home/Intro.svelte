<script>
    import { userStore } from "../../Store";
</script>

<main>
    <div class="container rounded-content-box my-5 description-text mx-auto">
        <div class="row align-items-center">
            <div class="col text-center p-5">Welcome to the Mari Angryneers Home Base! Design your bird in order to join the annual Kryptik Angryneers competition!</div>
            <div class="col p-5 text-center">
                <p>What is your name, Angryneer?</p>
                <input type="text" bind:value={$userStore.name} placeholder="Enter your name" class="form-control-lg">
            </div>
        </div>
    </div>
</main>

<style>
.rounded-content-box{
  background-color: #FFEAB5;
  border-radius: 25px;
}

.description-text{
    font-size: 30px;
}
</style>