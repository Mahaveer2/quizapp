<script>
	import { page } from '$app/stores';
	export let title;
	export let href;
</script>

<a href={href} class={`w-full flex justify-center items-center h-[50px] ${$page.url.pathname == href ? "text-[rgba(0,0,0,1)]":"text-[rgba(0,0,0,0.7)]"} gap-4`}>
  {title}
</a>