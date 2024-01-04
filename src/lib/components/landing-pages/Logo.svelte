<script>
  import Picture from "$lib/components/Picture.svelte";
  import logoMeta from '$lib/assets/logos/mari-angryneers-xl.png?w=150;200&format=avif;webp;png&as=picture';
  export let alt = 'Mari Angryneers logo';
</script>

<Picture meta={logoMeta} 
  sizes="(min-width: 768px) 200px, 150px"
  {alt} 
  pictureClass="landingLogo position-absolute" />
