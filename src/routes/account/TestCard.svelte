<script>
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	export let score

	let average

	const color = (total, score) => {
		if (String(score).includes('%')) {
			const _p = Number(String(score).replaceAll('%', ''))
			if (_p < 30) {
				return 'bg-red-400'
			}

			if (_p < 50) {
				return 'bg-yellow-600'
			}

			if (_p > 70) {
				return 'bg-green-500'
			}
		}

    const percentage = score / total;

		if (percentage <= 0.3) {
			return 'bg-red-400';
		}

		if (percentage < 0.7) {
			return 'bg-yellow-500';
		}

		if (percentage >= 0.7) {
			return 'bg-green-500';
		}
	}

	async function compareAverage() {
		const data = { testId: score.testId, studentId: $page.data.user.userId }
		let req = await fetch('/api/student/compare', {
			method: 'POST',
			body: JSON.stringify(data)
		})

		return await req.json()
	}

	onMount(async () => {
		average = await compareAverage()
	})
</script>

<div class="w-full flex justify-center items-center flex-col border p-4 ">
	<h2 class="text-2xl">{score.test.name}</h2>
	<div class="flex w-full gap-2 mt-5">
		<span class="w-full flex justify-center items-center">Questions</span>
		<span class="w-full flex justify-center items-center">Correct</span>
		<span class="w-full flex justify-center items-center">Grade</span>
	</div>
	<div class="flex w-full gap-2 mb-3 mt-2">
		<div class="bg-black text-[#fff] w-full h-[30px] flex justify-center items-center rounded">
			{JSON.parse(score.score).totalQuestions}
		</div>
		<div
			class={`${color(
				JSON.parse(score.score).totalQuestions,
				JSON.parse(score.score).score
			)} text-[#fff] w-full h-[30px] flex justify-center items-center rounded`}
		>
			{JSON.parse(score.score).score}
		</div>
		<div class="bg-green-500 text-[#fff] w-full h-[30px] flex justify-center items-center rounded">
			{JSON.parse(score.score).grade}
		</div>
	</div>
	<div class="flex flex-col gap-4 min-h-[300px] mt-3">
		<p>Feedback: {JSON.parse(score.score).feedback}</p>
		<p>Review: {JSON.parse(score.score).review}</p>
		<p>Tips: {JSON.parse(score.score).tips}</p>
		{#if average}
			<div class="bg-yellow-500 p-3">
				You scored {(average.studentScore / average.averageScore) * 100}% better than other
				students.
			</div>
		{/if}
	</div>
</div>
