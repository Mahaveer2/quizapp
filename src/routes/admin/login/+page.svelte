<script>
	export let form;
</script>
<div class="flex justify-center items-center flex-col mt-14">
<form method="POST" action="?/logadmin" class="flex flex-col gap-5 mt-[100px] w-[70%]">
	<h1 class="text-2xl p-2">Login</h1>
	<input class="p-5 w-full border" type="email" name="email" required placeholder="Enter Email" />
	<input
		class="p-5 w-full border"
		type="password"
		name="password"
		placeholder="Enter Password"
		required
	/>
	<button class="btn-p">Login</button>
	{#if form?.invalid}
	<p class="error text-red-600">You have entered the wrong credentials.</p>
	{/if}

	{#if form?.credentials}
	<p class="error text-red-600">You have entered the wrong credentials.</p>
	{/if}
</form></div>