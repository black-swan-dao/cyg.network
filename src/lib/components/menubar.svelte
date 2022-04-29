<div class="menubar">
  <a href="/" sveltekit:prefetch>cygnet</a>
  <a href="/spawn" sveltekit:prefetch>Spawn</a>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .menubar {
    width: calc(100vw - 40px);
    position: fixed;
    top: 0;
    left: 0;
    height: 30px;
    line-height: 30px;
    background: lightgrey;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
  }
</style>
