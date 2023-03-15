<script lang="ts">
	export let data
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import { page } from '$app/stores'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import { onMount } from 'svelte'
	import { showMessage } from '$lib/util'

	let query: string = ''
	let answer: string = ''
	let loading: boolean = false
	let submitted: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let scrollToDiv: HTMLDivElement

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
			scrollToDiv.scrollTop = scrollToDiv.scrollHeight
		}, 100)
	}

	// onMount(() => {
	//   const data = new FormData();
	//   data.append('shareLink',);
	//   fetch("/api/tester",{
	//     method:"POST",
	//     body:data
	//   })
	// })
	let newAnswer: string = ''
	let isTimeOver: boolean = false

	const handleSubmit = async () => {
		loading = true
		if(query == ""){
			showMessage({
				type:"Error",
				_message:"Please enter a valid input."
			})
		}
		chatMessages = [...chatMessages, { role: 'user', content: query }]
		query = ''
		const eventSource = new SSE('/api/tester', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({
				messages: chatMessages,
				shareLink: $page.params.link,
				isTimeOver: isTimeOver
			})
		})

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', async (e) => {
			scrollToBottom()
			try {
				loading = false
				if (e.data === '[DONE]') {
					if (timeLeft == 300) {
						startTimer()
					}
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }]
					try {
						console.log(answer)
						const jsonStr = answer.substring(answer.indexOf('{'), answer.indexOf('}') + 1)
						console.log(jsonStr)
						if (jsonStr) {
							try {
								const data = JSON.stringify(jsonStr)
								const score = JSON.parse('' + JSON.parse(data) + '')
								score.email = $page.data.user.email
								score.shareLink = $page.params.link

								try {
									if (!submitted) {
										let req = await fetch('/api/score', {
											method: 'POST',
											body: JSON.stringify(score)
										})
										submitted = true
										showMessage({
											type: 'success',
											_message: 'Test saved to profile.'
										})
									}
								} catch (e) {
									showMessage({
										type: 'Error',
										_message: e
									})
								}

								if (score) {
									answer = 'Hooray your result is :)'
								}
							} catch (e) {
								console.log(e)
							}
						} else {
						}
					} catch (e) {}
					answer = ''
					console.log(e.data)
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

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	let timeLeft: number = 300
	let credits = $page.data.user.credits
	const startTimer = () => {
		let timerId = setInterval(() => {
			timeLeft--
			if (timeLeft === 0) {
				fetch('/api/student/reduce', {
					method: 'POST',
					body: JSON.stringify({ id: $page.data.user.userId })
				})
					.then((msg) => msg.json())
					.then((res) => {
						if (credits <= 0) {
							showMessage({
								_message: 'No credits left buy more from account or wait another week.',
								type: 'Error'
							})
							loading = true
						}
						if (res.status == 200) {
							credits--
							showMessage({
								_message: 'Credit used.',
								type: 'success'
							})
						} else {
							showMessage({
								_message: 'An error occured!',
								type: 'Error'
							})
						}
					})
				clearInterval(timerId)
			}
		}, 1000)
	}

	onMount(async () => {
		if ($page.data.user) {
		}
		scrollToBottom()
	})
</script>

{#if $page.data.user}
	<div class="flex flex-col pt-4 w-full items-center absolute top-[45px]">
		<h1 class="my-4 text-sm absolute top-2 bg-[#232323] p-3 rounded-full">
			{formatTime(timeLeft)} left
		</h1>
		<div class="h-[63vh] w-full p-4 overflow-y-auto flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<ChatMessage type="assistant" message="Type start to continue start" />
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
		<form
			aria-disabled={loading}
			class="flex flex-col w-full gap-4  p-4"
			on:submit|preventDefault={() => handleSubmit()}
		>
			<textarea bind:value={query} class="p-5 w-full border" placeholder="Your Answer" />
			<button disabled={loading} class=" btn-p gap-5" type="submit">
				Send <i class="fa fa-paper-plane" /></button
			>
		</form>
	</div>
{:else}
	<a href="/login" class="mt-[100px] p-3 flex justify-center items-center bg-black text-white"
		>Login to Continue</a
	>
	<p>This is just a prototype of your requirements.</p>
{/if}
