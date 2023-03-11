<script>
	import { page } from '$app/stores'
	export let form;
	export let data;
	const { credits } = data.credits;
</script>

<div class="mt-14 container">
	<h1 class="text-2xl">Account</h1>
	<div class="w-full bg-black text-white flex justify-center p-5 mt-10 flex-col gap-5">
		<h1 class="text-3xl ">Credits</h1>
		<h3 class='text-xl'>
			{credits} credits.
		</h3>
		<div class='flex flex-wrap gap-5'>
			<form method="POST" action="?/pay">
				<input type="hidden" name='email' value={$page.data.user.email} />
				<input type="hidden" name='amount' value='5'/>
				<button class="btn-p border border-gray-500">5 Credits $5</button>
				{#if form?.invalid}
					<p class="error text-red-400 mt-4">You have entered the wrong credentials.</p>
				{/if}
	
				{#if form?.credentials}
					<p class="error text-red-400 mt-4">You have entered the wrong credentials.</p>
				{/if}
			</form>
			<form method="POST" action="?/pay">
				<input type="hidden" name='email' value={$page.data.user.email} />
				<input type="hidden" name='amount' value='1'/>
				<button class="btn-p border border-gray-500">Buy Credit $1</button>
				{#if form?.invalid}
					<p class="error text-red-400 mt-4">You have entered the wrong credentials.</p>
				{/if}
	
				{#if form?.credentials}
					<p class="error text-red-400 mt-4">You have entered the wrong credentials.</p>
				{/if}
			</form>
		</div>
	</div>
</div>
