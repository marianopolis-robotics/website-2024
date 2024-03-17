<script>
  import { userStore } from '$lib/Store';
  export let isFr = false;

  let displayName = $userStore.name ? $userStore.name : (isFr ? 'Angrynieur' : 'Angryneer');
</script>

<h2 class="text-center display-4 mt-5 mb-3 text-black">{isFr ? 'Notre robot en action' : 'Our robot in action'}!</h2>

<div class="desc-box m-3 m-sm-5 px-4 px-md-5 py-3 py-md-4">
  <p class="mb-4">{isFr ? "Voici des extraits vidéo de notre mécanisme d'admission, notre système d'autoroute/de toboggan, notre système de volant d'inertie et notre robot dans l'ensemble. Amusez-vous bien,"
        : "Here are clips of our intake mechanism, highway/toboggan conveyor, flywheel system, and our robot as a whole. Enjoy,"} {displayName}!</p>

  <div class="videos justify-content-center align-items-center">
    <video controls muted>
      <source src="/robot/intake.mp4" />
      <a href="/robot/intake.mp4">{isFr ? "Téléchargez une vidéo du système d'admission de notre robot." : "Download a video of our robot's intake system."}</a>
    </video>
    <video controls muted>
      <source src="/robot/conveyor.mp4" />
      <a href="/robot/conveyor.mp4">{isFr ? "Téléchargez une vidéo du système d'admission de notre robot." : "Download a video of our robot's intake system."}</a>
    </video>
    <video controls muted>
      <source src="/robot/flywheel.mp4" />
      <a href="/robot/flywheel.mp4">{isFr ? "Téléchargez une vidéo du système d'admission de notre robot." : "Download a video of our robot's intake system."}</a>
    </video>
    <video controls muted>
      <source src="/robot/robot.mp4" />
      <a href="/robot/robot.mp4">{isFr ? "Téléchargez une vidéo du système d'admission de notre robot." : "Download a video of our robot's intake system."}</a>
    </video>
  </div>
</div>

<style>
  .videos {
    row-gap: 1rem;
    display: flex;
    flex-direction: column;
  }

  video {
    width: 100%;
    border: solid 7.5px #4F250A;
    border-radius: 4px;
  }

  p {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 576px) {
    video {
      width: 80%;
    }
  }

  @media screen and (min-width: 768px) {
    video {
      width: 100%;
    }

    .videos {
      display: grid;
      grid-auto-rows: 1fr;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1.5rem;
      row-gap: 2rem;
    }
  }

  @media screen and (min-width: 1024px) {
    .videos {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>