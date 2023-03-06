<script>
	import NavLink from "./NavLink.svelte"

</script>
<nav class="flex justify-center items-center border-b h-[60px]">
  <div class="w-[80%] flex justify-between items-center">
    <a href="/"><h2 class="text-2xl text-black ">Kim</h2></a>
    <div class="flex justify-between w-[300px]">
      <NavLink
      title="Home"
      href='/'
      />
      <NavLink
      title="Test"
      href='/test'
      />
    </div>
  </div>
</nav>