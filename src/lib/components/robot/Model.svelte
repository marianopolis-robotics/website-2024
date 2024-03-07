<script>
  export let src, poster;
</script>

<div class="bg">
  <model-viewer {src} ar ar-modes="webxr scene-viewer quick-look" camera-controls {poster} shadow-intensity="1"></model-viewer>
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