<script lang="ts">
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import { page } from '$app/stores'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import { loading as load } from '$lib/store'
	import { onMount } from 'svelte'
	import { showMessage } from '$lib/util'

	let query: string = ''
	let answer: string = ''
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let scrollToDiv: HTMLDivElement
	let objDiv: HTMLDivElement

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
			scrollToDiv.scrollTop = scrollToDiv.scrollHeight
		}, 200)
	}

	const getMessages = async () => {
		const form = new FormData()
		load.set(true)
		form.append('studentId', $page.data.user.userId)
		const req = await fetch('/api/chat/get', {
			method: 'POST',
			body: form
		})

		let json = await req.json()
		scrollToBottom();
		load.set(false)
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
		if(query.trim() == ""){
			showMessage({
				type:"Error",
				_message:"Please type a valid input!"
			})
			return;
		}
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]
query = '';
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
					answer = ''
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
		showMessage({
			type:"Error",
			_message:"Error processing your request!"
		})
		console.error(err)
	}

	onMount(async () => {
		if ($page.data.user) {
			load.set(true)
			getMessages()
			scrollToBottom()
			
			setTimeout(() => {
				scrollToBottom()
				objDiv.scrollTop = objDiv.scrollHeight
				load.set(false)
			}, 200)
		}
	})
</script>

{#if $page.data.user}
	<div class="flex flex-col pt-4 w-full items-center absolute top-[45px] w-full">
		<div bind:this={objDiv} class="h-[65vh] w-full p-4 overflow-y-auto flex flex-col gap-4">
			<div class="flex flex-col gap-2 w-full">
				<ChatMessage type="assistant" message={`Hello ${$page.data.user.firstName}, i am profbot , your tutor for any class, ask me anything you want`} />
				{#each chatMessages as message}
					<ChatMessage type={message.role} message={message.content} />
				{/each}
				{#if answer}
					<ChatMessage type="assistant" message={answer} />
				{/if}
				{#if loading}
					<ChatMessage type="assistant" message="Loading..." />
				{/if}
			</div>
			<div class="" bind:this={scrollToDiv} />
		</div>
		<form class="flex w-full flex-col  gap-4 p-4" on:submit|preventDefault={() => handleSubmit()}>
			<input type="text" bind:value={query} class="p-5 w-full border" placeholder="Ask here.." />
			<button disabled={loading} type="submit" class="btn-p gap-5"> Send <i class="fa fa-paper-plane" /></button>
		</form>
	</div>
{:else}
	<div class="flex items-center mt-[0px] flex-co z-[23232] h-[100vh] w-full justify-center">
		<div class="container flex justify-between">
			<div class="left w-[500px] relative">
				<img src="/logor.png" class="w-[300px] mb-2"/>
				<p>Thank you for visiting our beta site. ProfBot is a work in progress focused on using chatbots in the classroom to increase student success.</p>
			</div>
			<div class="mt-[-40px] hidden md:block">
				<img src="/logosm.png" class="w-[200px] h-[220px] rounded"/>
			</div>
		</div>
	</div>
{/if}
