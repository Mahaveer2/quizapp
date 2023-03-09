<script>
	import { page } from '$app/stores';
	export let title;
	export let href;
  export let icon;
</script>

<a href={href} class={`w-full flex justify-center items-center h-[50px] ${$page.url.pathname == href ? "bg-[rgba(255,255,255,.1)]":"bg-[rgba(255,255,255,.05)]"} transition hover:bg-[rgba(255,255,255,.09)] gap-4`}>
  <i class={icon}></i>
  <span class="hidden lg:block">{title}</span>
</a>