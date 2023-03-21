<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai'
	export let type: ChatCompletionRequestMessageRoleEnum
	export let message: string
</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-image avatar">
		<div class="w-10 rounded-full">
			<img
				src={type === 'user' ? 'https://ui-avatars.com/api/?name=Me' : '/logosm.webp'}
				alt="{type} avatar"
				class="shadow shadow-white"
			/>
		</div>
	</div>

	<div
		class="chat-bubble {type === 'user'
			? 'chat-bubble bg-warning text-black '
			: 'chat-bubble bg-[rgba(255,255,255,.22)] text-[#fff]'}"
	>
		{#if type == 'assistant'}
			{@html message}
		{:else}
			{message}
		{/if}
	</div>
</div>
