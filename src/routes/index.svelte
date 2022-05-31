<script>
  import { renderBlockText } from "$lib/modules/sanity.js"
  import has from "lodash/has.js"
  export let page
</script>

<h1>Cygnet</h1>

{#if has(page, "introduction.content")}
  <div class="introduction">
    {@html renderBlockText(page.introduction.content)}
  </div>
{/if}

<a href="/spawn" sveltekit:prefetch class="spawn">Spawn</a>

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
    border-radius: 10px;
    padding: 20px;
    backdrop-filter: blur(10px);
    margin-bottom: 20px;
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

  .faq {
    .item {
      margin-bottom: 1rem;

      .question {
        font-weight: bold;
      }
    }
  }
</style>
