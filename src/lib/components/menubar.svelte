<div class="menubar">
  <a href="/" data-sveltekit-preload-data>
    <img src="/images/coin-small.png" alt="cygnet" />
  </a>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .menubar {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1000;

    img {
      width: 60px;
    }
  }
</style>
