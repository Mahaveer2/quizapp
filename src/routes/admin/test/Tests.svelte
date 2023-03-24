<script>
	import { goto } from '$app/navigation'
	import { showMessage } from '$lib/util'
	import { onMount } from 'svelte'

	let data = []
	let busy = false
	const getTests = async () => {
		busy = true
		const response = await fetch('/api/test/')
		let res = await response.json()
		data = res.data
		busy = false
		console.log(res.data)
	}

	onMount(() => {
		getTests()
	})

	const deleteTest = async (shareLink) => {
		if (!confirm('Are you sure you want to delete this test?')) {
			return false
		}

		const form = new FormData()
		form.append('shareLink', shareLink)

		try {
			let req = await fetch('/api/test/delete', {
				method: 'POST',
				body: form
			})
			let res = await req.json()
			if (res.status == 200) {
				showMessage({
					type: 'success',
					_message: 'Test deleted successfully!'
				})
			}

			getTests()
		} catch (e) {
			console.log(e)
		}
	}
</script>

<div class="overflow-x-auto mt-10">
	<table class="table table w-full">
		<thead>
			<tr>
				<th>#</th>
				<th>Test</th>
				<th>Sessions</th>
				<th>Share Link</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#if busy}
				loading...
			{/if}
			{#if !busy}
				{#if !data.length}No tests found...{/if}
			{/if}
			{#if data}
				{#each data as test, index}
					<tr>
						<th>{index + 1}</th>
						<td>{test.name}</td>
						<td>{test?.scores?.length}</td>
						<td>
							<a class="link" href={`/test/${test.shareLink}`}>{test.shareLink}</a>
						</td>
						<td>
							<button class="btn btn-error" on:click={() => deleteTest(test.shareLink)}
								>Delete</button
							>
							<button class="btn btn-black" on:click={() => goto('test/edit/' + test.shareLink)}
								>Edit</button
							>
						</td>
					</tr>
				{/each}
			{/if}
			<!-- row 2 -->
		</tbody>
	</table>
</div>
