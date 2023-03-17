<script>
    export let form;
</script>
<div class="flex justify-center items-center flex-col mt-14">
<form method="POST" action="?/login" class="flex flex-col gap-5 mt-[50px] w-[70%]">
  <h1 class='text-3xl my-3'>
    Login
  </h1>
  <input class="p-5 w-full border" type='email' name='email' required placeholder="Enter Email"/>
  <input class="p-5 w-full border" type='password' name='password' placeholder="Enter Password" required/>
  <button class="btn-p">Login</button>
  {#if form?.invalid}
  <p class="bg-[rgba(255,255,255,.1)] p-3" style="color:rgba(250,100,100) !important">Username and password is required.</p>
  {/if}

  {#if form?.credentials}
  <p class="bg-[rgba(255,255,255,.1)] p-3" style="color:rgba(250,100,100) !important">You have entered the wrong credentials.</p>
  {/if}
</form>
</div>