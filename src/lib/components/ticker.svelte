<script>
  import { onMount } from "svelte"

  let dots = ""

  onMount(async () => {
    window.setInterval(() => {
      dots += "."
    }, 250)
  })
</script>

{dots}
