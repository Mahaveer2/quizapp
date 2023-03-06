<script>
    export let form;
</script>
<div class="flex justify-center items-center flex-col mt-14">
<form method="POST" action="?/login" class="flex flex-col gap-5 mt-[100px] w-[70%]">
  Sign up below with demo email
  Email:<strong>test@gmail.com</strong>
  Password:<strong>test</strong>
  <input class="p-5 w-full border" type='email' name='email' required placeholder="Enter Email"/>
  <input class="p-5 w-full border" type='password' name='password' placeholder="Enter Password" required/>
  <button class="p-5 bg-black text-white">Login</button>
  {#if form?.invalid}
    <p class="error">Username and password is required.</p>
  {/if}

  {#if form?.credentials}
    <p class="error text-red-600">You have entered the wrong credentials.</p>
  {/if}
</form>
</div>