<script>
  import Footer from "$lib/components/footer.svelte"
  import { fade } from "svelte/transition"
</script>

<!-- FOREGROUND IMAGE-->
<div class="foreground-dust-container">
  <img src="/image/dust.png" />
</div>

<main in:fade={{ duration: 200, delay: 200 }}>
  <div class="inner">
    <slot />
    <Footer />
  </div>
</main>

<style lang="scss" global>
  @import "src/lib/style/variables.scss";

  * {
    box-sizing: border-box;
  }

  body,
  html {
    font-family: $FONT_STACK;
    text-rendering: geometricPrecision;
    font-size: 16px;
    background: $background-color;
  }

  main {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;

    .inner {
      width: 600px;
      max-width: 95vw;
      margin-left: auto;
      margin-right: auto;
      padding-top: 20px;
    }
  }

  .foreground-dust-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    pointer-events: none;

    img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }
  }

  p {
    &:first-child {
      margin-top: 0;
    }
  }
</style>
