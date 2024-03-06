<script>
  export let lang = 'en';
</script>

<a href={lang === 'en' ? '/home' : '/fr/home'} class="position-absolute play text-decoration-none d-flex justify-content-center align-items-center text-white px-4 py-1">
  {lang === 'en' ? 'Play' : 'Jouer'}
  <slot />
</a>

<style>
  a.play {
    font-family: 'Angry Birds', sans-serif;
    border-radius: 20px;
    background-image: linear-gradient(180deg, #ffefa8 40%, #ffba32 0%);
    font-size: 2rem;
    transition: 0.15s ease-in-out;
    z-index: 0;
    overflow: hidden;
    top: 50%;

    /* generated using https://owumaro.github.io/text-stroke-generator/
      long (text-)shadow values can be costly for load time, so we use these very, very sparingly in this website!
    */
    text-shadow: #CC6600 3px 0px 0px, #CC6600 2.83487px 0.981584px 0px, #CC6600 2.35766px 1.85511px 0px, #CC6600 1.62091px 2.52441px 0px, #CC6600 0.705713px 2.91581px 0px, #CC6600 -0.287171px 2.98622px 0px, #CC6600 -1.24844px 2.72789px 0px, #CC6600 -2.07227px 2.16926px 0px, #CC6600 -2.66798px 1.37182px 0px, #CC6600 -2.96998px 0.42336px 0px, #CC6600 -2.94502px -0.571704px 0px, #CC6600 -2.59586px -1.50383px 0px, #CC6600 -1.96093px -2.27041px 0px, #CC6600 -1.11013px -2.78704px 0px, #CC6600 -0.137119px -2.99686px 0px, #CC6600 0.850987px -2.87677px 0px, #CC6600 1.74541px -2.43999px 0px, #CC6600 2.44769px -1.73459px 0px, #CC6600 2.88051px -0.838247px 0px;

    /* longer box-shadow values can also be costly, and are used sparingly as well */
    box-shadow: 0 0 0 5px #ffefa8, 0 0 5px 5px #000;
    border: solid 2px #b38c09;
  }

  /* use double and single colon for `before` pseudo-class to ensure compatibility */
  a.play::before, a.play:before {
    background: #ffba32;
    content: "";
    position: absolute;
    top: calc(50% - 3px);
    transform: scale(1);
    width: 40px;
    height: 10px;
    border-radius: 20px;
    z-index: -1;
    transform-origin: 50% 50%;
    transition: transform 0.15s ease-in-out;
  }

  a.play:hover::before, a.play:hover:before {
    transform: scale(10);
  }

  @media screen and (min-width: 768px) {
    a.play {
      font-size: 4rem;
    }
    
    a.play:hover::before, a.play:hover:before {
      transform: scale(12);
    }
  }
</style>