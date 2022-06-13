<script>
  import Menubar from "$lib/components/menubar.svelte"
</script>

<Menubar />

<!-- FOREGROUND IMAGE-->
<div class="foreground-dust-container">
  <img src="/image/dust.png" />
</div>
<!-- BACKGROUND VIDEO -->
<div class="background-video-container">
  <video loop autoplay muted src="/video/background.mp4" />
</div>

<main>
  <div class="inner">
    <slot />
  </div>
</main>

<style lang="scss" global>
  @import "src/lib/style/variables.scss";

  * {
    box-sizing: border-box;
  }

  body,
  html {
    font-family: $DISPLAY_STACK;
    text-rendering: geometricPrecision;
    font-size: 18px;
  }

  main {
    padding-top: 20px;
    padding-bottom: 40px;

    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;

    .inner {
      width: 800px;
      max-width: 95vw;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .background-video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;

    video {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
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
