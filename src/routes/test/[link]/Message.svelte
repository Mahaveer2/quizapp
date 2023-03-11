<script>
	export let role;
	export let message;

	let msg = '';
	export let effect;
	let i = 0;
	if(effect){
		const interval = setInterval(() => {
		if(msg.length >= message.length){
			clearInterval(interval);
			return {}
		}
		msg+= message[i];
		i++;
	},50);
	}else{
		msg  = message;
	}
</script>

<div class={`chat ${role == 'user' ? 'chat-end' : 'chat-start'}`}>
	<div class="chat-image avatar">
		<div
			class={`w-10 rounded-full ${
				role == 'user' ? 'bg-white text-black border' : 'bg-black text-white'
			} flex justify-center items-center`}
		>
			<h1 class="text-center mt-2">B</h1>
		</div>
	</div>
	<div class={`chat-bubble ${
		role == 'user' ? 'bg-white text-black border' : 'bg-black text-white'
	}`}>
	{#if role =='user'}
	{message}
	{:else}
	{msg}
	{/if}
	</div>
</div>
