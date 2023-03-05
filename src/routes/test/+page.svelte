TEST<script lang="ts">
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import { page } from '$app/stores'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import { onMount } from 'svelte'

	let query: string = ''
	let answer: string = ''
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let scrollToDiv: HTMLDivElement

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
			scrollToDiv.scrollTop = scrollToDiv.scrollHeight;

		}, 100)
	}

	const handleSubmit = async () => {
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]

		const eventSource = new SSE('/api/tester', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		})

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', async (e) => {
			scrollToBottom()
			try {
				loading = false
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }]
					answer = ''
					query = ''
					return
				}

				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices

				if (delta.content) {
					answer = (answer ?? '') + delta.content
				}
			} catch (err) {
				handleError(err)
			}
		})

		eventSource.stream()
		scrollToBottom()
	}

	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}

	onMount(async () => {
		if ($page.data.user) {
			
		}
		scrollToBottom();
	})
</script>

{#if $page.data.user}
	<div class="flex flex-col pt-4 w-full px-8 items-center gap-2">
		<div>
			<a href="/" class="mt-[100px] p-3 flex justify-center items-center bg-black text-white"
		>Learn</a
	>
			<h1 class="text-2xl font-bold w-full text-center">Chatty</h1>
			<p class="text-sm italic">Powered by gpt-3.5-turbo</p>
		</div>
		<div class="h-[500px] w-full bg-gray-900 rounded-md p-4 overflow-y-auto flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<ChatMessage type="assistant" message="Type start to continue start" />
				{#each chatMessages as message}
					<ChatMessage type={message.role} message={message.content} />
				{/each}
				{#if answer}
					<ChatMessage type="assistant" message={answer} />
				{/if}
				{#if loading}
					<ChatMessage type="assistant" message="Loading.." />
				{/if}
			</div>
			<div class="" bind:this={scrollToDiv} />
		</div>
		<form
			class="flex w-full rounded-md gap-4 bg-gray-900 p-4"
			on:submit|preventDefault={() => handleSubmit()}
		>
			<input type="text" class="input input-bordered w-full" bind:value={query} />
			<button type="submit" class="btn btn-accent"> Send </button>
		</form>
		
	</div>
{:else}
	<a href="/login" class="mt-[100px] p-3 flex justify-center items-center bg-black text-white"
		>Login to Continue</a
	>
	<p>This is just a prototype of your requirements.</p>
{/if}
