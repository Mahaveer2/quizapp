<script lang="ts">
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
	let objDiv: HTMLDivElement;

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
			scrollToDiv.scrollTop = scrollToDiv.scrollHeight
		}, 100)
	}

	const getMessages = async () => {
		const form = new FormData()
		form.append('studentId', $page.data.user.userId)
		const req = await fetch('/api/chat/get', {
			method: 'POST',
			body: form
		})

		let json = await req.json()
		const data = json.data.map((data) =>
			[
				{ role: 'user', content: data.prompt },
				{ role: 'assistant', content: data.returnMsg }
			].map(({ role, content }) => ({ role, content }))
		)

		const map2 = [].concat(...data)

		chatMessages = [...chatMessages, ...map2]
		return json
	}

	const handle = async (prompt: string, answer: string) => {
		let form = new FormData()
		form.append('prompt', prompt)
		form.append('answer', answer)
		form.append('id', $page.data.user.userId)
		let res = await fetch('/api/chat/add', {
			method: 'POST',
			body: form
		})
	}

	const handleSubmit = async () => {
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]

		const eventSource = new SSE('/api/chat', {
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
					let q = await handle(query, answer)
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
			getMessages()
			scrollToBottom()
			setTimeout(() => {
				objDiv.scrollTop = objDiv.scrollHeight;
				console.log(objDiv)
			},2000)
		}
	})
</script>

{#if $page.data.user}
	<div class="flex flex-col pt-4 w-full items-center absolute top-[45px]">
		<div bind:this={objDiv} class="h-[75vh] w-ful p-4 overflow-y-auto flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<ChatMessage type="assistant" message="Hello, ask me anything you want!" />
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
		<form class="flex w-full  gap-4 p-4" on:submit|preventDefault={() => handleSubmit()}>
			<input type="text" bind:value={query} class="p-5 w-full border" placeholder="Your Answer" />
			<button type="submit" class="btn-p"> Send </button>
		</form>
	</div>
{:else}
	<div class="flex justify-center items-center flex-col">
		<div class="w-full  h-[calc(100vh-60px)] relative">
			<div class="content absolute top-[20%] pl-[8vw] left-[0] flex flex-col w-full justify-start gap-10">
				<img src="/ai.jpg" class="w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] lg:absolute right-[-0px] top-[-10%] z-[-2]"/>
				<h1 class="text-black text-6xl font-semibold">Welcome to ProfBot </h1>
				<p class="text-black max-w-[800px] w-[60vw]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quidem mollitia hic? Quis, est quibusdam. Tenetur quaerat consequatur odit veniam provident dolorum quae nesciunt unde cum nobis voluptatem, corporis quia.</p>
				<a href="/login" class="btn-p w-[200px]">

					Get Started
					</a>
			</div>
			
		</div>
	</div>
{/if}
