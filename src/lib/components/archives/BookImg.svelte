<script>
  export let src, alt, rotate;
</script>

<div class="frame position-relative rotate-{rotate}">
  <div class="tape position-absolute"></div>
  <img {src} {alt} />
</div>

<style>
  .frame {
    border-color: #ffffe6;
    border-style: solid;
    border-width: 13px 9px;
    background-color: #1C3971;
    width: 40%;
    box-shadow: 0 0 0 4px #000, 0 0 6px 6px rgba(0, 0, 0, 0.25);
  }

  @media (pointer: coarse) {
    .frame {
      margin-top: 1rem;
    }
  }

  .tape {
    top: -27px;
    left: 50%;
    width: 70px;
    height: 20px;
    background-color: black;
    opacity: 0.11;
    transform: translateX(-50%);
  }

  .rotate-left {
    transform: rotate(-4deg);
  }

  .rotate-right {
    transform: rotate(4deg);
  }

  img {
    width: 100%;
    border: solid 1px black;
  }
</style>