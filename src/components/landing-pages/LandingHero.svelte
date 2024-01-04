<div class="w-100 landingHero text-center px-4 px-lg-5 d-flex justify-content-center">
  <slot />
</div>

<style>
  .landingHero {
    height: 100vh;
  }

  :global(.landingHero h1) {
    /* generated using https://owumaro.github.io/text-stroke-generator/
      long (text-)shadow values can be costly for load time, so we use these very, very sparingly in this website!
    */
    text-shadow: #000 5px 0px 0px, #000 4.90033px 0.993347px 0px, #000 4.60531px 1.94709px 0px, #000 4.12668px 2.82321px 0px, #000 3.48353px 3.58678px 0px, #000 2.70151px 4.20736px 0px, #000 1.81179px 4.6602px 0px, #000 0.849836px 4.92725px 0px, #000 -0.145998px 4.99787px 0px, #000 -1.13601px 4.86924px 0px, #000 -2.08073px 4.54649px 0px, #000 -2.94251px 4.04248px 0px, #000 -3.68697px 3.37732px 0px, #000 -4.28444px 2.57751px 0px, #000 -4.71111px 1.67494px 0px, #000 -4.94996px 0.7056px 0px, #000 -4.99147px -0.291871px 0px, #000 -4.83399px -1.27771px 0px, #000 -4.48379px -2.2126px 0px, #000 -3.95484px -3.05929px 0px, #000 -3.26822px -3.78401px 0px, #000 -2.4513px -4.35788px 0px, #000 -1.53666px -4.75801px 0px, #000 -0.560763px -4.96845px 0px, #000 0.437495px -4.98082px 0px, #000 1.41831px -4.79462px 0px, #000 2.34258px -4.41727px 0px, #000 3.17346px -3.86382px 0px, #000 3.87783px -3.15633px 0px, #000 4.4276px -2.32301px 0px, #000 4.80085px -1.39708px 0px, #000 4.98271px -0.415447px 0px;
    width: max-content;
    height: max-content;
    color: #fff;
    font-size: 3.5rem;
    margin-top: 20vh;
  }

  @media screen and (min-width: 576px) {
    :global(.landingHero h1) {
      font-size: 5rem;
    }
  }

  @media screen and (min-width: 768px) {
    :global(.landingHero h1) {
      font-size: 7.5rem;
      margin-top: 10vh;
    }
  }

  @media screen and (min-width: 1200px) {
    :global(.landingHero h1) {
      margin-top: 25vh;
    }
  }
</style>