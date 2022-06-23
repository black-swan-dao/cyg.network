<footer>
  <div class="left">
    <a href="https://blackswan.support" target="_blank" class="item">
      Black Swan</a
    >
    <a href="https://discord.gg/bX5HF98PeF" target="_blank" class="item"
      >Discord</a
    >
    <a href="https://twitter.com/blackswan_dao" target="_blank" class="item">
      Twitter
    </a>
    <a
      href="https://www.instagram.com/blackswan_dao/"
      target="_blank"
      class="item"
    >
      Instagram
    </a>
    <a href="https://www.are.na/black-swan-dao" target="_blank" class="item">
      Are.na
    </a>
  </div>

  <div class="right">
    <a href="/faq" sveltekit:prefetch class="item">FAQ</a>
  </div>
</footer>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  footer {
    margin-top: 40px;
    margin-bottom: 20px;
    user-select: none;
    width: 600px;
    max-width: 95vw;
    margin-left: auto;
    margin-right: auto;
    border-top: 1px solid black;
    padding-top: 20px;
    font-size: 12px;
    padding-bottom: 60px;
    display: flex;
    justify-content: space-between;
    @include screen-size("small") {
      flex-direction: column;
    }

    .left {
      display: flex;
      @include screen-size("small") {
        flex-direction: column;
      }
    }

    .right {
      display: flex;
      @include screen-size("small") {
        flex-direction: column;
      }
    }

    .item {
      margin-right: 10px;
      display: block;
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
