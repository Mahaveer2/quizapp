<script>
	import { page } from '$app/stores';
	export let title;
	export let href;
</script>

<a href={href} class={`w-full flex justify-center items-center h-[50px] ${$page.url.pathname == href ? "text-[rgba(255,255,255,1)]":"text-[rgba(255,255,255,0.5)]"} gap-4 hover:text-[rgba(255,255,255,1)]`}>
  {title}
</a>