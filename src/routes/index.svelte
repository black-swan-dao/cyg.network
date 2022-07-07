<script>
  import { renderBlockText, urlFor } from "$lib/modules/sanity.js"
  import has from "lodash/has.js"
  export let page
</script>

{#if has(page, "headerImage.asset")}
  <div class="header-image">
    <img
      src={urlFor(page.headerImage.asset).quality(90).width(400).url()}
      alt="Cygnet"
    />
  </div>
{:else}
  <h1>Cygnet</h1>
{/if}

{#if has(page, "introduction.content")}
  <div class="introduction">
    {@html renderBlockText(page.introduction.content)}
  </div>
{/if}

<!-- <a href="/spawn" sveltekit:prefetch class="spawn">Spawn</a> -->
<div class="action">
  <a href={page.requestFormUrl} target="_blank" class="request-access">
    {page.requestFormText}
  </a>
</div>

{#if has(page, "about.content")}
  <div class="introduction">
    {@html renderBlockText(page.about.content)}
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  h1 {
    background: $pale-white;
    border-radius: 10px;
    padding: 20px;
    backdrop-filter: blur(10px);
  }

  .introduction {
    text-align: center;
    margin-bottom: 50px;
  }

  .faq {
    text-align: center;
    margin-bottom: 50px;
  }

  .action {
    text-align: center;
    margin-bottom: 50px;
  }

  .spawn {
    display: inline-block;

    width: 100%;
    padding: 40px;
    background: $pale-white;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    margin-bottom: 20px;
    border: 1px solid $gold;
    color: $black;
    font-size: 32px;
    transition: background 0.4s $transition;

    // border: 30px solid rgba(255, 255, 255, 0);
    // border-radius: 5px;
    // border-image-slice: 76;
    // border-image-source: url(/image/box3.png);
    // border-image-outset: 5px;

    &:hover {
      background: $mid-white;
    }
  }

  .request-access {
    display: inline-block;
    padding: 20px 40px;
    text-align: center;
    text-decoration: none;
    border: 1px solid $accent-color;
    color: $accent-color;
    transition: background 0.3s $transition;
    text-transform: uppercase;
    user-select: none;

    // border: 30px solid rgba(255, 255, 255, 0);
    // border-radius: 5px;
    // border-image-slice: 76;
    // border-image-slice: 36;
    // border-image-source: url(/image/box3.png);
    // border-image-outset: 5px;

    &:hover {
      background: $accent-color;
      color: $background-color;
    }
  }

  .faq {
    .item {
      margin-bottom: 1em;

      .question {
        // font-weight: bold;
      }
    }
  }

  .header-image {
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 200px;
      max-width: 100%;
      max-height: 100%;
      max-height: 50vh;
    }
  }
</style>
