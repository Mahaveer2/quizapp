<script>
	import { goto } from "$app/navigation"
	import { showMessage } from "$lib/util"


  let link = '';

  const checkLink = async() => {

    let req = await fetch(`/api/test/${link}`);
    let res = await req.json();

    if(res.status == 200){
      goto(`/test/${link}`);
    }else{
      showMessage({
        type:"Error",
        _message:res.message
      })
    }
  }
</script>

<div class="container">
  <h2 class="text-2xl mb-5">Take Test</h2>
  <input bind:value={link} class="p-5 w-full border" type='password' name='password' placeholder="Enter Share Link" required/>
  <button class="btn-p mt-2 w-full" on:click={checkLink}>GO</button>
</div>