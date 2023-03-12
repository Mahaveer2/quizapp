<script>
	import { goto } from '$app/navigation'
	import { showMessage } from '$lib/util'
	export let data

	const { user } = data
	let disabled = false
	console.log(user)
	if (user.credits <= 0) {
		disabled = true
	}
	let link = ''

	const checkLink = async () => {
		if (link == '') {
			showMessage({
				type: 'Error',
				_message: 'Please enter a valid shareLink'
			})
			return
		}
		let req = await fetch(`/api/test/check/${link}`)
		let res = await req.json()

		if (res.status == 200) {
			goto(`/test/${link}`)
		} else {
			showMessage({
				type: 'Error',
				_message: res.message
			})
		}
	}
</script>

<div class="container mt-14">
	<h2 class="text-2xl mb-5">Take Test</h2>
	<input
		bind:value={link}
		class="p-5 w-full border"
		type="password"
		name="password"
		placeholder="Enter Share Link"
		required
		{disabled}
	/>
	<button {disabled} class="disabled:bg-[rgba(0,0,0,.7)] btn-p mt-2 w-full" on:click={checkLink}
		>GO</button
	>
	{#if disabled}
		<div class="mt-5 bg-red-400 p-3 ">
			Looks like you don't have enough credits.
			<a class="text-white" href="/account">Buy them from here</a>
		</div>
	{/if}
</div>
