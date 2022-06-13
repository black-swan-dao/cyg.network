<script>
  import { renderBlockText, urlFor } from "$lib/modules/sanity.js"
  import has from "lodash/has.js"
  export let page
</script>

{#if has(page, "headerImage.asset")}
  <div class="header-image">
    <img
      src={urlFor(page.headerImage.asset).quality(90).width(800).url()}
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
<a href={page.requestFormUrl} target="_blank" class="request-access">
  {page.requestFormText}
</a>

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

{#if has(page, "contact.content")}
  <div class="contact">
    {@html renderBlockText(page.contact.content)}
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

  .introduction,
  .faq,
  .contact {
    background: $pale-white;
    padding: 5px;
    backdrop-filter: blur(10px);
    margin-bottom: 30px;
    border: 30px solid rgba(255, 255, 255, 0);
    border-radius: 5px;
    border-image-slice: 76;
    border-image-source: url(/image/box3.png);
    border-image-outset: 5px;

    p {
      &:first-child {
        margin-top: 0;
      }
    }
  }

  .spawn {
    display: inline-block;
    // margin-bottom: 40px;
    // margin-top: 40px;
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

    &:hover {
      background: $mid-white;
    }
  }

  .request-access {
    display: inline-block;
    // margin-bottom: 40px;
    // margin-top: 40px;
    width: 100%;
    padding: 40px;
    background: $pale-white;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: $black;
    font-size: 32px;
    transition: background 0.4s $transition;

    &:hover {
      background: $mid-white;
    }
  }

  .faq {
    .item {
      margin-bottom: 1rem;

      .question {
        font-weight: bold;
      }
    }
  }

  .header-image {
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    img {
      max-width: 100%;
      max-height: 100%;
      max-height: 50vh;
    }
  }
</style>
