<script>
	import '../app.css'
	import { page } from '$app/stores'
	import { loading,message } from '$lib/store';
	import Navbar from '$lib/components/Navbar.svelte'
	import Transition from '$lib/components/Transition.svelte'
	import TopLoader from '$lib/components/TopLoader.svelte'

	let isAdmin = false

	if ($page.url.pathname.includes('admin')) {
		isAdmin = true
	}
	
</script>

<svelte:head>
	<title>Professorbot</title>
</svelte:head>
<TopLoader/>
{#if !isAdmin}
	<Navbar />
{/if}
<slot />
<div class={`loader ${$loading && 'active'} z-[5555555555]`}>
	<svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
		<circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
			<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"></animate>    
		</circle>
		<circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
			<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"></animate>       
		</circle>
		<circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
			<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"></animate>     
		</circle>
	</svg>
	</div>
	{#if $message.show}
	<div class="flex flex-col p-4 absolute w-full top-0 flex justify-center items-center z-[22222222222]">
		<Transition>
			<div class={` ${$message.type == "Error" ? "bg-red-400 border-red-600" : "bg-green-400 border-green-600"} text-black border w-[80%] p-4 flex justify-center rounded`}>
				{$message.message}
						</div>
		</Transition>
	</div>
	{/if}