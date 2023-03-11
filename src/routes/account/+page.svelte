<script>
	import { page } from '$app/stores'
	export let form
	export let data

	const { credits } = data.credits
	const scores = data.results[0].scores;
	console.log(scores)

	const color = (total,score) => {
		const percentage = score/total;

		if(String(score).includes('%')){
			const _p = Number(String(score).replaceAll('%',''));
			if(_p < 30){
				return 'bg-red-400'
			}

			if(_p < 50){
				return 'bg-yellow-600'
			}

			if(_p > 70){
				return 'bg-green-500'
			}
		}
		
		if(percentage <= 0.3){
			return "bg-red-400";
		}

		if(percentage <= 0.5){
			return "bg-yellow-600";
		}

		if(percentage >= 0.7){
			return "bg-green-500";
		}
	}
	// console.log(scores)
</script>

<div class="mt-14 container">
	<h1 class="text-2xl">Account</h1>
	<div class="w-full bg-black text-white flex justify-center p-5 mt-10 flex-col gap-5">
		<h1 class="text-3xl ">Credits</h1>
		<h3 class="text-xl">
			{credits} credits.
		</h3>
		<div class="flex flex-wrap gap-5">
			<form method="POST" action="?/pay">
				<input type="hidden" name="email" value={$page.data.user.email} />
				<input type="hidden" name="amount" value="5" />
				<button class="btn-p border border-gray-500">5 Credits $5</button>
				{#if form?.invalid}
					<p class="error text-red-400 mt-4">You have entered the wrong credentials.</p>
				{/if}

				{#if form?.credentials}
					<p class="error text-red-400 mt-4">You have entered the wrong credentials.</p>
				{/if}
			</form>
			<form method="POST" action="?/pay">
				<input type="hidden" name="email" value={$page.data.user.email} />
				<input type="hidden" name="amount" value="1" />
				<button class="btn-p border border-gray-500">Buy Credit $1</button>
				{#if form?.invalid}
					<p class="error text-red-400 mt-4">You have entered the wrong credentials.</p>
				{/if}

				{#if form?.credentials}
					<p class="error text-red-400 mt-4">You have entered the wrong credentials.</p>
				{/if}
			</form>
		</div>
	</div>
	<div class='grid grid-cols-1 lg:grid-cols-3 mt-10 gap-3'>
		 {#each scores as score}
		 <div class='w-full flex justify-center items-center flex-col border p-4'>
			<h2 class='text-2xl'>{score.test.name}</h2>
			<div class='flex w-full gap-2 mt-5'>
				<span class='w-full flex justify-center items-center'>Questions</span>
				<span class='w-full flex justify-center items-center'>Correct</span>
				<span class='w-full flex justify-center items-center'>Grade</span>
			</div>
			<div class='flex w-full gap-2 mb-3 mt-2'>
				<div class='bg-black text-white w-full h-[30px] flex justify-center items-center rounded'>{JSON.parse(score.score).totalQuestions}</div>
				<div class={`${color(JSON.parse(score.score).totalQuestions,JSON.parse(score.score).score)} text-white w-full h-[30px] flex justify-center items-center rounded`}>{JSON.parse(score.score).score}</div>
				<div class='bg-green-500 text-white w-full h-[30px] flex justify-center items-center rounded'>{JSON.parse(score.score).grade}</div>
			</div>
			<div class='flex flex-col gap-4'>
				<p>Feedback: {JSON.parse(score.score).feedback}</p>
				<p>Review: {JSON.parse(score.score).review}</p>
				<p>Tips: {JSON.parse(score.score).tips}</p>
			</div>
		</div>
		 {/each}
	</div>
</div>
