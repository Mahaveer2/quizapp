<script>
	import NavLink from './NavLink.svelte'
	import { page } from '$app/stores'
</script>

<nav class="flex bg-white justify-center items-center border-b h-[60px] fixed top-0 w-full z-[222222]">
	<div class="w-[80%] flex justify-between items-center">
		<a href="/">
      <h1 class='text-2xl'>Kim</h1>
    </a>
		<div class="flex justify-between w-[400px]">
			<NavLink title="Home" href="/" />
			{#if $page.data.user}
				<NavLink title="Test" href="/test" />
				<NavLink title="Account" href="/account" />
				<form action="/logout" method="POST" class="w-full">
					<button
						class="w-full flex justify-center items-center h-[50px] text-[rgba(0,0,0,.5)] gap-4 w-full"
						type="submit"
					>
						<i class="fa fa-sign-out" />
		
						<span class="hidden lg:block">Logout</span>
					</button>
				</form>
			{:else}
				<NavLink title="Login" href="/login" />
			{/if}
			{#if $page.data.admin}
				<NavLink title="Admin Panel" href="/admin" />
			{/if}
		</div>
	</div>
</nav>
