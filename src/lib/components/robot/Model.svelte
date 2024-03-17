<script>
  export let model;
</script>

<div class="bg">
  <model-viewer src="/robot/3d/{model}.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="commerce" 
                poster="/robot/3d/posters/{model}.webp" shadow-intensity="1" environment-image="/robot/3d/posters/aircraft_workshop_01_1k.hdr"></model-viewer>
</div>

<style>
  .bg {
    background-color: #4F250A;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.25), 0 0 0 9px #4F250A;
  }

  model-viewer {
    width: 100%;
    height: 300px;
	}

  @media screen and (min-width: 992px) {
    .bg {
      border-radius: 5px;
    }

    model-viewer {
      position: sticky;
		  top: 0;
      height: 100vh;
    }
  }
</style>