<script>
	import { page } from '$app/stores'
	import { showMessage } from '$lib/util'
	let loading = false

	async function changeDetails(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		loading = true
		let req = await fetch('/api/account', {
			method: 'PATCH',
			body: JSON.stringify(Object.fromEntries(formData))
		})

		let res = await req.json()

		if (res.status == 200) {
			showMessage({
				_message: 'Profile updated succesfully',
				type: 'Success'
			})
		}else {
			showMessage({
				_message: res.message,
				type: 'Error'
			})
		}
		loading = false
	}
</script>

<div class="container">
	<div class="flex justify-between w-full items-center">
		<h2 class="text-2xl">Settings</h2>
	</div>
	<form on:submit={(e) => changeDetails(e)} class="mt-10 flex flex-col gap-5">
		<input
			value={$page.data.admin.email}
			class="p-5 w-full border"
			type="email"
			name="email"
			required
			placeholder="Enter Email"
		/>
		<input
			value={$page.data.admin.name}
			class="p-5 w-full border"
			type="text"
			name="name"
			required
			placeholder="Enter Name"
		/>
		<input
			class="p-5 w-full border"
			type="password"
			name="oldpassword"
			required
			placeholder="Old Password"
		/>
		<input
			class="p-5 w-full border"
			type="password"
			name="newpassword"
			required
			placeholder="New Password"
		/>
		<button aria-busy={loading} class="btn-p">Submit</button>
	</form>
</div>
