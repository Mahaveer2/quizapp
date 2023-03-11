<script>
	import NavLink from './NavLink.svelte'
	import { page } from '$app/stores'
	let isNav = false;
</script>

<nav class="flex bg-white justify-center items-center border-b h-[60px] fixed top-0 w-full z-[22]">
	<div class="w-[80%] flex justify-between items-center">
		<a href="/">
      <h1 class='text-2xl'>Kim</h1>
    </a>
		<button on:click={() => isNav= true} class="bg-black flex justify-center items-center text-xl text-white border-full w-[40px] h-[40px] absolute right-5 rounded-full flex md:hidden">
			<i class="fa fa-bars"></i>
		</button>
		<div class={`flex justify-between md:w-[400px] flex-col md:flex-row md:relative fixed top-0 left-0 w-full md:h-[auto] h-[100vh] bg-white items-center md:p-0 p-10 md:text-base text-2xl md:flex ${isNav ? "flex":"hidden"}`}> 
			<button on:click={() => isNav= false} class="bg-black flex justify-center items-center text-xl text-white border-full w-[40px] h-[40px] absolute right-5 top-2 rounded-full flex md:hidden">
				&times;
			</button>
			<NavLink title="Home" href="/" />
			{#if $page.data.user}
				<NavLink title="Test" href="/test" />
				<NavLink title="Account" href="/account" />
				<form action="/logout" method="POST" class="w-full">
					<button
						class="w-full flex justify-center items-center h-[50px] text-[rgba(0,0,0,.5)] gap-2 w-full hover:text-[rgba(0,0,0,1)]"
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
