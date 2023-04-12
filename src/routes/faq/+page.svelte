<script lang="ts">
  import { fade } from "svelte/transition"
  import { renderBlockText, urlFor } from "$lib/modules/sanity.js"
  import has from "lodash/has.js"
  export let data: any
  const { page } = data
</script>

<div in:fade={{ duration: 500 }}>
  {#if has(page, "headerImage.asset")}
    <div class="header-image">
      <a href="/" data-sveltekit-preload-data>
        <img
          src={urlFor(page.headerImage.asset).quality(90).width(400).url()}
          alt="Cygnet"
        />
      </a>
    </div>
  {/if}

  {#if has(page, "faq.content")}
    <div class="faq">
      {@html renderBlockText(page.faq.content)}
    </div>
  {/if}
</div>

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
