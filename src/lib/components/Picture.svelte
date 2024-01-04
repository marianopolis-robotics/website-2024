<!-- optimize images with vite-imagetools, heavily based on https://www.youtube.com/watch?v=285vSLe9LQ8 -->
<script>
  export let meta;

  if (!(meta instanceof Array)) meta = [meta]; // wrap object in an array even if there's only one (vite-imagetools won't do it for us in this case)

  const sources = meta[0].sources;
  const fallback = meta[0].img;

  export let sizes = '100%';
  export let alt = '';
  export let loading = 'lazy';
  export let imgClass = '';
  export let pictureClass = '';
</script>

<picture class={pictureClass}>
  {#each Object.entries(sources) as [type, srcMeta]}
    <source
      type="image/{type}"
      {sizes}
      srcset={srcMeta}
    />
  {/each}
  <img src={fallback.src} {alt} {loading} class={imgClass} />
</picture>
