<script>
  import { renderBlockText, urlFor } from "$lib/modules/sanity.js"
  import has from "lodash/has.js"
  import slugify from "slugify"

  export let page
  export let instances

  let title = ""
  let subdomain = ""
  let guildId = ""

  let loading = false
  let error = false
  let done = false
  let result = {}

  $: subdomain = slugify(title, { lower: true, strict: true })

  const validateName = n => {
    const instance = instances.find(i => i.title === n)
    console.log("instance", instance)
    if (instance) {
      return false
    } else {
      return true
    }
  }

  const validateSubdomain = s => {
    const instance = instances.find(i => i.subdomain === s)
    console.log("instance", instance)
    if (instance) {
      return false
    } else {
      return true
    }
  }

  // Should be only numerals and 18 characters long
  const validateGuildId = id => id.length === 18 && /^\d+$/.test(id)

  const submit = async () => {
    error = false

    // Check that fields are filled in
    if (!(title && subdomain && guildId)) {
      error = "Please fill out all fields."
      return
    }

    // _Check that name is unique
    if (!validateName(title)) {
      error = "Name is already in use."
      return
    }

    // Check that subdomain is unique
    if (!validateSubdomain(subdomain)) {
      error = "Subdomain is already in use."
      return
    }

    // Check that guildId is valid
    if (!validateGuildId(guildId)) {
      error =
        "Guild ID is not valid. Should be a 18 character string of numerals (eg. 889493760197668924)."
      return
    }

    loading = true

    // Call api
    // try {
    //   // Prepare message body
    //   const rawBody = JSON.stringify({
    //     title: title,
    //     subdomain: subdomain,
    //     guildId: guildId,
    //   })
    //   // Set message options
    //   const requestOptions = {
    //     method: "POST",
    //     body: rawBody,
    //     redirect: "follow",
    //   }
    //   // Send message
    //   const response = await fetch("/api/spawn", requestOptions)
    //   const responseData = await response.json()
    //   console.log(responseData)
    //   result = responseData
    //   loading = false
    //   done = true
    // } catch (e) {
    //   console.log(e.message)
    // }
  }
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

{#if has(page, "introduction.content")}
  <div class="spawn-introduction">
    {@html renderBlockText(page.spawnIntroduction.content)}
  </div>
{/if}

{#if loading}
  SPAWNING CYGNET INSTANCE......
{:else if done}
  <div class="result-section">
    Your Cygnet instance <strong>{result.title}</strong> has been successfully created.
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
    <div>Netlify URL: "https://" + result._id + ".netlify.app"</div>
    <div>discordGuildId: {result.discordGuildId}</div>
    <div>auth0ClientId: {result.auth0ClientId}</div>
    <div>netlifySitetId: {result.netlifySiteId}</div>
  </div>
{:else}
  <div class="spawn">
    <!-- 1. NAME -->
    <div class="form-section">
      <label for="name">Name of Cygnet instance</label>
      <input
        type="text"
        name="name"
        bind:value={title}
        placeholder="Name of Cygnet instance"
      />
    </div>
    <!-- 2. SUBDOMAIN -->
    <div class="form-section">
      <label for="subdomain">Subdomain</label>
      <input
        type="text"
        name="subdomain"
        bind:value={subdomain}
        placeholder="Subdomain"
      /><span>.cyg.network</span>
    </div>
    <!-- 3. ADD BOT -->
    <div class="form-section">
      <a
        href="https://discord.com/oauth2/authorize?client_id=969536726794125332&permissions=268435456&redirect_uri=https%3A%2F%2Fcyg-network.eu.auth0.com%2Flogin%2Fcallback&scope=bot"
        target="_blank"
        class="bot"
      >
        Add bot to discord guild
      </a>
    </div>

    <!-- DISCORD GUILD ID -->
    <div class="form-section">
      <label for="name"
        >Discord guild ID (<a href="/guild-id" target="_blank">What is this?</a
        >)</label
      >
      <input
        type="text"
        name="guildId"
        bind:value={guildId}
        placeholder="Discord Guild ID"
      />
    </div>

    <div class="form-section">
      {#if error}
        <div class="error">
          {error}
        </div>
      {/if}
      <input type="submit" on:click={submit} value="Create instance" />
    </div>
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .spawn {
    .form-section {
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid lightgrey;

      &:last-child {
        border-bottom: unset;
      }

      a {
        color: $accent-color;
      }
    }
  }

  .details {
    margin-top: 20px;
    font-size: 10px;
    font-family: "Courier New", Courier, monospace;
    padding: 10px;
  }

  .result-section {
    margin-bottom: 20px;
  }

  h1,
  .spawn-introduction,
  .result-section,
  .spawn {
    margin-bottom: 50px;
  }

  input[type="text"] {
    background: $mid-white;
    border-radius: 4px;
    padding: 10px;
    border: none;
    outline: none;
    min-width: 40ch;
    font-family: $FONT_STACK;
    font-size: 16px;
  }

  .bot {
    display: inline-block;
    padding: 20px 40px;
    text-align: center;
    text-decoration: none;
    border: 1px solid $accent-color;
    color: $accent-color;
    transition: background 0.3s $transition;
    user-select: none;
    cursor: pointer;

    &:hover {
      background: $accent-color;
      color: $background-color;
    }
  }

  input[type="submit"] {
    display: inline-block;
    padding: 20px 40px;
    text-align: center;
    text-decoration: none;
    border: 1px solid $accent-color;
    color: $accent-color;
    transition: background 0.3s $transition;
    text-transform: uppercase;
    user-select: none;
    cursor: pointer;
    font-family: $FONT_STACK;
    font-size: 16px;

    &:hover {
      background: $accent-color;
      color: $background-color;
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

  label {
    font-size: 12px;
    display: block;
    margin-bottom: 5px;
  }

  .error {
    padding: 10px;
    width: 100%;
    background: rgb(249, 53, 53);
    margin-bottom: 20px;
  }
</style>
