<script>
	export let form
</script>

<div class="flex justify-center items-center flex-col mt-14">
	<form method="POST" action="?/register" class="flex flex-col gap-5 mt-[50px] w-[70%]">
		<h1 class="text-3xl my-3">Sign up</h1>
		<p>After registering your account will be given to verify by the admins.</p>
		<input class="p-5 w-full border" type="email" name="email" required placeholder="Enter Email" />
		<div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
			<input class="p-5 w-full border" type="text" name="fname" required placeholder="First Name" />
			<input class="p-5 w-full border" type="text" name="lname" required placeholder="Last Name" />
		</div>
		<input
			class="p-5 w-full border"
			type="password"
			name="password"
			placeholder="Enter Password"
			required
		/>
		<button class="btn-p">Submit</button>
		{#if form?.invalid}
			<p class="bg-[rgba(255,255,255,.1)] p-3" style="color:rgba(250,100,100) !important">
				Username and password is required.
			</p>
		{/if}

		{#if form?.invalidEmail}
			<p class="bg-[rgba(255,255,255,.1)] p-3" style="color:rgba(250,100,100) !important">
				The email is not supported.
			</p>
		{/if}
		{#if form?.credentials}
			<p class="bg-[rgba(255,255,255,.1)] p-3" style="color:rgba(250,100,100) !important">
				Email already exists!.
			</p>
		{/if}
	</form>
</div>
