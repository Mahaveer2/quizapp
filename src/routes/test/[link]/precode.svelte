<script lang="ts">
	import { showMessage } from '$lib/util'
	import Message from './Message.svelte'

	export let data
	let answer = ''
	let scrollToDiv: HTMLDivElement
	const { questions } = data
	console.log(questions)

	interface Message {
		role: 'user' | 'bot'
		message: string
		effect: boolean
	}

	interface TestData {
		questions: number
		score: number
		feedback: string
		review: string
		tips: string
	}

	let testData: TestData = {}
	let score = 0
	let currentQuestion = 0

	let messages: Message[] = [
		{
			role: 'bot',
			message: "Type 'start' to start the test.",
			effect: false
		}
	]
	let started = false

	const checkAnswer = async (question: string, answer: string) => {
		if (answer.toLocaleLowerCase().includes('start') && !started) {
			started = true
			messages = [
				...messages,
				{
					role: 'bot',
					message: `This is your Question no.${currentQuestion + 1} : ${
						questions[currentQuestion].questionText
					}`,
					effect: true
				}
			]
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
			return
		} else if (!answer.toLocaleLowerCase().includes('start') && !started) {
			messages = [
				...messages,
				{ role: 'bot', message: `Please start the test by typing 'start'`, effect: true }
			]
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
			return
		}

		if (started) {
			currentQuestion++
			let req = await fetch('/api/tester', {
				method: 'POST',
				body: JSON.stringify({ question: question, answer: answer })
			})

			let res = await req.json()
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })

			if (res.trim().toLocaleLowerCase() == 'yes') {
				score += 1
				messages = [
					...messages,
					{
						role: 'bot',
						message: `Correct now lets move onto new question: ${questions[currentQuestion].questionText} `,
						effect: true
					}
				]
				return {}
			} else {
				messages = [
					...messages,
					{
						role: 'bot',
						message: `Incorrect now lets move onto new question: ${questions[currentQuestion].questionText} `,
						effect: true
					}
				]
				return {}
			}
		}
	}

	const handleSubmit = () => {
		if (answer == '') {
			showMessage({
				_message: 'Please enter something.',
				type: 'Error'
			})
			return;
		}
		if(currentQuestion >= questions.length){
			messages = [
					...messages,
					{
						role: 'bot',
						message: `Test is finished!`,
						effect: true
					}
				]
			return {};
		}
		messages = [...messages, { role: 'user', message: answer }]
		scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
		checkAnswer(questions[currentQuestion].questionText, answer)
		answer = ''
	}
</script>

<div class="container mt-14">
	<h1 class="text-2xl">{data.name}</h1>
	<div class="renderer border p-3 mt-5 h-[50vh] overflow-y-auto">
		{#each messages as message}
			<Message effect={message.effect} role={message.role} message={message.message} />
		{/each}
		<div class="" bind:this={scrollToDiv} />
	</div>
	<form on:submit|preventDefault={handleSubmit} class="mt-4">
		<textarea bind:value={answer} class="p-5 w-full border" placeholder="Your Answer" />
		<button class="btn-p w-full flex gap-5">
			Submit
			<i class="fa fa-paper-plane" />
		</button>
	</form>
</div>
