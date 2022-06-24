<script>
  import { urlFor } from "$lib/modules/sanity.js"
  import has from "lodash/has.js"

  export let page
</script>

{#if has(page, "headerImage.asset")}
  <div class="header-image">
    <a href="/" sveltekit:prefetch>
      <img
        src={urlFor(page.headerImage.asset).quality(90).width(400).url()}
        alt="Cygnet"
      />
    </a>
  </div>
{/if}

{#if has(page, "faq")}
  <div class="faq">
    {#each page.faq as item}
      <div class="item">
        <div class="question">{item.question}</div>
        <div class="answer">{item.answer}</div>
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

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
