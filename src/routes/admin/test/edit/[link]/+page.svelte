<script lang="ts">
	import { loading } from '$lib/store'
	import Modal from '../../../components/Modal.svelte'
  import { showMessage } from '$lib/util'
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'


  export let data;
  const {test} = data;

  
  let isModalOpen = false

  const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			}
		}
	})

  interface Question {
		questionText: string;
		correctAnswer: string;
		marks:number;
	}

  let questions:Question[] = test.questions;

	let currentQuestion: Question = {
		questionText: '',
		correctAnswer: '',
		marks:1,
	}

	const pushQuestion = () => {
		questions.push(currentQuestion)
		questions = questions
		currentQuestion = {
			questionText: '',
			correctAnswer: '',
			marks:1,
		}
		isModalOpen = false
	}

	const handleDelete = (i: Number) => {
		if (confirm('Do you want to delete this question?')) {
			questions.splice(i, 1)
			questions = questions
		}
	}

	const handleSubmit = async (e) => {
		const form = new FormData(e.target)
		form.append('questions', JSON.stringify(questions))

		if(form.get("name")?.toString().trim() == ""){
			showMessage({
				_message:"Please enter a valid name.",
				type:"Error"
			});
			return;
		}

		if (questions.length <= 0) {
			alert('No questions')
			return false
		}

		try {
			loading.set(true);
			let req = await fetch(`/api/test/${test.shareLink}`, {
				method: 'POST',
				body: form
			})

			let res = await req.json()

			if (res.status == 200) {
        loading.set(false);
        showMessage({
          type:"success",
          _message:"Test updated succesfully!"
        })
			}
		} catch (e) {
			console.error(e)
		}
	}
</script>

<div class="container mt-14">
  <h1 class="text-2xl">{test.name}</h1>
  <form on:submit|preventDefault={(e) => handleSubmit(e)} >
    <input name="name" class="border p-5 w-full my-3" placeholder="Enter Test Name" bind:value={test.name}>
    <button class="btn-p w-full">Submit</button>
  </form>
  <section class="mt-10 gap-3">
		{#each questions as question, index}
			<div
				class="flex flex-col w-full gap-5 border border-1 p-5"
				in:receive={{ key: index }}
				out:send={{ key: index }}
			>
				<button
					on:click={() => handleDelete(index)}
					class="bg-red-100 border border-red-600 w-[80px] text-red-600 rounded-lg p-2 "
				>
					<i class="fa fa-trash" /></button
				>
				<div class="form-control w-full ">
					<label class="label">
						<span class="label-text">What is your Question?</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full "
						bind:value={questions[index].questionText}
					/>
				</div>
				<div class="form-control w-full ">
					<label class="label">
						<span class="label-text">What is your Answer?</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full "
						bind:value={questions[index].correctAnswer}
					/>
				</div> 
				<div class="form-control w-full ">
					<label class="label">
						<span class="label-text">Marks</span>
					</label>
					<input
						type="number"
						placeholder="Type here"
						class="input input-bordered w-full "
						bind:value={questions[index].marks}
					/>
				</div>
			</div>
		{/each}
    <button
		disabled={questions.length >= 20}
		on:click={() => (isModalOpen = true)}
		class="btn-p mt-4 cursor-pointer disabled:bg-[rgba(0,0,0,.8)]">Add Question +</button
	>
	</section>
		
</div>
<div class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box">
		<div class="flex justify-between items-center w-full">
			<h3 class="text-lg font-bold">Create Question!</h3>
			<button class="text-xl cursor-pointer" on:click={() => (isModalOpen = false)}>&times;</button>
		</div>
		<form on:submit|preventDefault={pushQuestion}>
			<div class="form-control w-full ">
				<label class="label">
					<span class="label-text">What is your Question?</span>
				</label>
				<input
					type="text"
					bind:value={currentQuestion.questionText}
					placeholder="Type here"
					required
					class="input input-bordered w-full "
				/>
			</div>
			<div class="form-control w-full ">
				<label class="label">
					<span class="label-text">What is your Answer?</span>
				</label>
				<input
					type="text"
					required
					bind:value={currentQuestion.correctAnswer}
					placeholder="Type here"
					class="input input-bordered w-full "
				/>
			</div>
			<div class="form-control w-full ">
				<label class="label">
					<span class="label-text">Marks for this question</span>
				</label>
				<input
					type="number"
					required
					bind:value={currentQuestion.marks}
					placeholder="Marks"
					class="input input-bordered w-full "
				/>
			</div>
			<button disabled={questions.length >= 20} class="btn-p w-full mt-4 cursor-pointer rounded-lg"
				>Add +</button
			>
		</form>
	</div>
</div>
