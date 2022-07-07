<script>
  import { onMount } from "svelte"
  import Ticker from "$lib/components/ticker.svelte"

  let result = false

  const getSlackToken = async code => {
    // Call api
    try {
      // Prepare message body
      const rawBody = JSON.stringify({
        code: code,
      })
      // Set message options
      const requestOptions = {
        method: "POST",
        body: rawBody,
        redirect: "follow",
      }
      // Send message
      const response = await fetch("/api/get-slack-token", requestOptions)
      const responseData = await response.json()
      console.log(responseData)
      result = responseData
    } catch (e) {
      console.log(e.message)
    }
  }

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    console.log("code", code)

    if (!code) {
      console.error("no code")
      return
    }
    getSlackToken(code)
  })
</script>

{#if result}
  {#if result._id}
    <p>The bot is installed in your workspace.</p>
  {:else}
    <p>Error: {result.error}</p>
  {/if}
{:else}
  <p>Loading<Ticker /></p>
{/if}
