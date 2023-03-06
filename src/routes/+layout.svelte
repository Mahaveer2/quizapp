<script>
	import '../app.css'
	import { page } from '$app/stores'
	import Navbar from '$lib/components/Navbar.svelte'

	let isAdmin = false
	if ($page.url.pathname.includes('admin')) {
		isAdmin = true
	}
</script>

{#if !isAdmin}
	<Navbar />
{/if}
<slot />
