<script lang="ts">
  import { fade } from "svelte/transition"
</script>

<footer in:fade={{ duration: 500, delay: 500 }}>
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
    <a href="/faq" data-sveltekit-preload-data class="item">FAQ</a>
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

    .item {
      margin-right: 13px;
      display: block;
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .left {
      display: flex;
      @include screen-size("small") {
        flex-direction: column;
      }
    }

    .right {
      display: flex;

      .item {
        margin-right: 0;
      }
      @include screen-size("small") {
        flex-direction: column;
      }
    }
  }
</style>
