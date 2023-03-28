<script>
	import { page } from '$app/stores'
	import { showMessage } from '$lib/util'
	import Modal from '../admin/components/Modal.svelte'
	import TestCard from './TestCard.svelte'
	export let form
	export let data
	let loading = false;

	const { credits } = data.credits
	const scores = data.results[0].scores
	let isModal = false

	const handleStudentChange = async (e) => {
		const data = new FormData(e.target);
		data.append("email",$page.data.user.email);
		loading = true;
		let req = await fetch("/api/student/change",{
			method:"POST",
			body:data
		})

		loading = false;

		let res = await req.json();

		if(res.status == 200){
			isModal = false;
			showMessage({
				type:"success",
				_message:"Account Updated Succesfully!"
			})
		}else{
			showMessage({
				type:"Error",
				_message:res.message
			})
		}
	}
</script>

<div class="mt-14 container">
	<div class="flex justify-between flex-col md:flex-row gap-3 w-full">
		<h1 class="text-2xl">Account</h1>
		<button on:click={() => (isModal = true)} class="btn btn-accent"
			>Change Account settings.</button
		>
	</div>
	<div class="w-full bg-black text-white flex justify-center p-5 mt-10 flex-col gap-5 border border-white">
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
	<!-- <div class="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-3">
		{#each scores as score}
			<TestCard {score} />
		{/each}
	</div> -->
	<Modal title="Change account details" bind:isModalOpen={isModal}>
		<form on:submit|preventDefault={(e) => handleStudentChange(e)}>
			<div class="form-control w-full ">
				<label class="label">
					<span class="label-text">First Name</span>
				</label>
				<input
					type="text"
					required
					bind:value={$page.data.user.firstName}
					name="fname"
					placeholder="First name"
					class="input input-bordered w-full "
				/>
			</div>
			<div class="form-control w-full ">
				<label class="label">
					<span class="label-text">Last Name</span>
				</label>
				<input
					type="text"
					required
					name="lname"
					bind:value={$page.data.user.lastName}
					placeholder="Last name"
					class="input input-bordered w-full "
				/>
			</div>
			<div class="form-control w-full ">
				<label class="label">
					<span class="label-text">Current Password</span>
				</label>
				<input
					type="password"
					required
					name="oldpass"
					placeholder="Current Password"
					class="input input-bordered w-full "
				/>
			</div>
			<div class="form-control w-full ">
				<label class="label">
					<span class="label-text">New Password</span>
				</label>
				<input
					type="password"
					required
					name="newpass"
					placeholder="New Password"
					class="input input-bordered w-full "
				/>
			</div>
			<button aria-busy={loading} class="btn-p w-full mt-4 cursor-pointer rounded-lg gap-3">
				<i class="fa fa-cogs">

				</i>
				Change</button>
		</form>
	</Modal>
</div>
