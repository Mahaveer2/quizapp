<script>
  import { page } from '$app/stores';
</script>

<div class="flex justify-center items-center flex-col w-full h-[100vh]">
  <h1 class="text-3xl">{$page?.status}</h1> 
  {#if $page?.error?.message}
              <p>Error message: {$page?.error?.message}</p>
          {/if}
  {#if $page?.error}
      <a href="/" class="p-2 hover:bg-slate-100 border rounded-full mt-2">
          Go back to home
      </a>
  {/if}
</div>