<script>
  import Menubar from "$lib/components/menubar.svelte"
</script>

<Menubar />

<main>
  <slot />
</main>

<style lang="scss" global>
  @import "src/lib/style/variables.scss";

  body,
  html {
    font-family: Helvetica, sans-serif;
  }

  main {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 90vw;
    padding-top: 40px;
  }
</style>
