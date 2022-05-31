<script>
  import { renderBlockText } from "$lib/modules/sanity.js"
  import has from "lodash/has.js"
  import slugify from "slugify"
  import { onMount } from "svelte"

  export let page

  let title = ""
  let subdomain = ""
  let guildId = ""

  let loading = false
  let done = false
  let result = {}

  $: subdomain = slugify(title, { lower: true, strict: true })

  const submit = async () => {
    // TODO: validation
    // __ check that name is unique
    // __ check that subdomain is unique
    // __ check that guildId is valid
    if (!(title && subdomain && guildId)) {
      window.alert("Missing data")
      return
    }
    loading = true

    // Call api
    try {
      // Prepare message body
      const rawBody = JSON.stringify({
        title: title,
        subdomain: subdomain,
        guildId: guildId,
      })
      // Set message options
      const requestOptions = {
        method: "POST",
        body: rawBody,
        redirect: "follow",
      }
      // Send message
      const response = await fetch("/api/spawn", requestOptions)
      const responseData = await response.json()
      console.log(responseData)
      result = responseData
      loading = false
      done = true
    } catch (e) {
      console.log(e.message)
    }
  }
</script>

{#if has(page, "introduction.content")}
  <div class="spawn-introduction">
    {@html renderBlockText(page.spawnIntroduction.content)}
  </div>
{/if}

{#if loading}
  LOADING......
{:else if done}
  <div class="result-section">
    Your Cygnet instance <strong>{result.title}</strong> has been successfully created.
  </div>
  <div class="result-section">
    In a few minutes it will be accessible at this address: <a
      href={"https://" + result._id + ".netlify.app"}
      target="_blank">{result._id}.netlify.app</a
    >
  </div>
  <div class="result-section">
    Within half an hour it will be accessible at this address: <a
      href={"https://" + result.subdomain + ".cyg.network"}
      target="_blank">{result.subdomain}.cyg.network</a
    >
  </div>
  <div class="result-section">
    Log in as a user with the <strong>cygnet-admin</strong> role assigned in the
    discord channel and go to
    <a
      href={"https://" + result.subdomain + ".cyg.network/admin"}
      target="_blank">{result.subdomain}.cyg.network/admin</a
    > to create a new voting cycle and customize the instance.
  </div>
  <div class="details">
    <div>discordGuildId: {result.discordGuildId}</div>
    <div>auth0ClientId: {result.auth0ClientId}</div>
    <div>netlifySitetId: {result.netlifySiteId}</div>
  </div>
{:else}
  <div class="spawn">
    <div class="form-section">
      <div class="sub-section">
        <label for="name">Name of Cygnet instance:</label><br />
        <input
          type="text"
          name="name"
          bind:value={title}
          placeholder="Name of Cygnet instance"
        />
      </div>
      <div class="sub-section">
        <label for="subdomain">Subdomain:</label><br />
        <input
          type="text"
          name="subdomain"
          bind:value={subdomain}
          placeholder="Subdomain"
        /><span>.cyg.network</span>
      </div>
    </div>
    <div class="form-section">
      <div class="sub-section">
        <div>
          <a
            href="https://discord.com/oauth2/authorize?client_id=969536726794125332&permissions=268435456&redirect_uri=https%3A%2F%2Fcyg-network.eu.auth0.com%2Flogin%2Fcallback&scope=bot"
            target="_blank"
            class="bot"
          >
            Add bot to discord guild
          </a>
        </div>
      </div>

      <div class="sub-section">
        <label for="name">Discord guild ID: (eg. 889493760197668924)</label><br
        />
        <input
          type="text"
          name="guildId"
          bind:value={guildId}
          placeholder="Discord Guild ID"
        />
      </div>
    </div>
    <div class="form-section">
      <input type="submit" on:click={submit} value="Create instance" />
    </div>
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .spawn {
    .form-section {
      margin-bottom: 1rem;

      .sub-section {
        margin-bottom: 20px;
      }
    }
  }

  .details {
    margin-top: 20px;
    font-size: 10px;
    font-family: "Courier New", Courier, monospace;
    padding: 10px;
    background: lightgray;
  }

  .result-section {
    margin-bottom: 20px;
  }

  h1,
  .spawn-introduction,
  .result-section,
  .spawn {
    background: $pale-white;
    border-radius: 10px;
    padding: 20px;
    backdrop-filter: blur(10px);
    margin-bottom: 20px;
  }

  input[type="text"] {
    background: $mid-white;
    border-radius: 4px;
    padding: 10px;
    border: none;
    outline: none;
    min-width: 40ch;
  }

  .bot {
    border: none;
    outline: none;
    display: inline-block;
    // margin-bottom: 40px;
    // margin-top: 40px;
    min-width: 40ch;
    padding: 20px;
    background: $pale-white;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    border: 1px solid $gold;
    color: $black;
    transition: background 0.4s $transition;
    font-family: $DISPLAY_STACK;
    cursor: pointer;

    &:hover {
      background: $mid-white;
    }
  }

  input[type="submit"] {
    border: none;
    outline: none;
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
    font-family: $DISPLAY_STACK;
    cursor: pointer;

    &:hover {
      background: $mid-white;
    }
  }
</style>
