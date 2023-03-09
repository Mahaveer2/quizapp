<script>
	import Sidebar from "./components/Sidebar.svelte"
  import { page } from "$app/stores";
	import Transition from "$lib/components/Transition.svelte"
</script>
{#if $page.data.admin}
<Sidebar/>
<div class="lg:w-[calc(100% - 300px)] w-[calc(100% - 90px)] lg:ml-[300px] ml-[90px] bg-white h-[100vh] ">
    <slot/>
</div>
{:else}
<slot/>
{/if}

