<script>
	import SideLink from './SideLink.svelte'
	import { page } from '$app/stores';

	let isDrop = false;

	if($page.url.pathname.includes('/admin/test')){
		isDrop = true;
	}
</script>

<div
	class="lg:w-[300px] bg-black text-white flex flex-col h-[100vh] left-0 md:left-0 w-[90px] fixed top-0"
>
	<div class="flex justify-center w-full">
		<h2 class="text-2xl font-regular text-center mt-10 bg-[rgba(255,255,255,.1)] rounded-full w-[60px] h-[60px]  md:w-[80px] md:h-[80px] flex justify-center items-center">A</h2>
		</div>
	<div class="flex flex-col w-full mt-14">
		<SideLink title="Dashboard" icon="fa fa-gauge" href="/admin" />
		<SideLink title="Students" icon="fa fa-users" href="/admin/students" />
		<div on:click={() => isDrop = !isDrop} class={`w-full bg-[rgba(255,255,255,.05)] cursor-pointer flex justify-center items-center transition overflow-hidden flex-col`}>
			<div class="  w-full h-[50px] flex justify-center items-center cursor-pointer gap-5">
				<i class={` ${isDrop ? "fa fa-folder-open" : "fa fa-folder"}`}></i>
				<span class="lg:block hidden">Tests</span>
			</div>
			<div class="bg-[rgba(255,255,255,.02)] w-full">
		 {#if isDrop }
			<SideLink title="View Tests" icon="fa fa-book" href="/admin/test/" />
			<SideLink title="Create Test" icon="fa fa-plus" href="/admin/test/create" />
			{/if}
		</div>
		</div>
	</div>
	<div class="mt-auto">
		<form action="/logout" method="POST">
			<button
				class="w-full flex justify-center items-center h-[50px] bg-[rgba(255,255,255,.05)] gap-5"
				type="submit"
			>
				<i class="fa fa-sign-out" />

				<span class="hidden lg:block">Logout</span>
			</button>
		</form>
	</div>
</div>
