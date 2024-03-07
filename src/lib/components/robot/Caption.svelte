<div class="col me-5 p-5 w-100 position-relative caption-container">
  <div class="left pin"></div>
  <div class="right pin"></div>
  <slot />
</div>

<style>
  .caption-container {
    font-size: 1.35rem;
    background-color: #ffeab5;
    box-shadow: 0 0 1.5px 10px #ffeab5;
  }

  .pin {
    position: absolute;
    top: 1.4rem;
    background-color: #CDA827;
    width: 12px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: solid 1px rgba(0, 0, 0, 0.6);
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);
  }

  .left {
    left: 1.3rem;
  }

  .right {
    right: 1.3rem;
  }
</style>
