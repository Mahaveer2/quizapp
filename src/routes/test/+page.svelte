<script>
	import { goto } from "$app/navigation"


  let link = '';
</script>

<div class="container">
  <h2 class="text-2xl">Take Test</h2>
  <input bind:value={link} class="p-5 w-full border" type='password' name='password' placeholder="Enter Share Link" required/>
  <button class="btn-p mt-2 w-full" on:click={() => goto(`/test/${link}`)}>GO</button>
</div>