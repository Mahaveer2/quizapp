<script>
	import { page } from '$app/stores'
	import SideLink from './SideLink.svelte'
  export let href;
  export let name;

	let isDrop = false
	if ($page.url.pathname.includes(href)) {
		isDrop = true
	}
</script>

<div
	on:click={() => (isDrop = !isDrop)}
	class={`w-full bg-[rgba(255,255,255,.05)] hover:bg-[rgba(255,255,255,.1)] transition cursor-pointer flex justify-center items-center transition overflow-hidden flex-col`}
>
	<div class="w-full h-[50px] flex justify-center items-center cursor-pointer gap-5">
		<i class={` ${isDrop ? 'fa fa-folder-open' : 'fa fa-folder'}`} />
		<span class="lg:block hidden">{name}</span>
	</div>
	<div class="bg-[rgba(255,255,255,.02)] w-full">
		<div class={`${isDrop ? "h-auto visible scale-y-100" : "h-0 scale-y-0 invisible"} transition`}>
			<slot/>
		</div>
	</div>
</div>
