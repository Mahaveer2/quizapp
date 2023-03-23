<script>
	import { page } from '$app/stores'
	import Chart from './components/Chart.svelte'
	export let data
	const { students, sessions } = data

	const today = new Date()
	const dayOfWeek = today.getDay()
	const startOfWeek = new Date(today)
	startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek)
	const endOfWeek = new Date(startOfWeek)
	endOfWeek.setDate(endOfWeek.getDate() + 7)
	console.log('Start of week:', startOfWeek)
	console.log('End of week:', endOfWeek)
	const filteredData = sessions.filter((item) => {
		const createdAt = new Date(item.createdAt)
		const result = createdAt >= startOfWeek && createdAt < endOfWeek
		return result
	})
</script>

<div class="container">
	<h1 class="text-2xl">Welcome {$page.data.admin.name}</h1>
	<div class="grid grid-cols-1 lg:grid-cols-2 mt-14 gap-5 ">
		<div class="w-full bg-black text-white p-10">
			<h2 class="text-2xl flex gap-4 items-center "><i class="fa fa-users" /> Students</h2>
			<div class="mt-4">
				{students.length} Students
			</div>
		</div>
		<div class="w-full bg-black text-white p-10">
			<h2 class="text-2xl flex gap-4 items-center ">
				<i class="fa fa-dollar" />
				Total Sessions
			</h2>
			<div class="mt-4">
				{sessions.length} Sessions
			</div>
		</div>
		<div class="w-full bg-black text-white p-10">
			<h2 class="text-2xl flex gap-4 items-center ">
				<i class="fa fa-edit" />
				Tests
			</h2>
			<div class="mt-4">
				{data.testCount} Tests
			</div>
		</div>
    <div class="w-full bg-black text-white p-10">
			<h2 class="text-xl flex gap-4 items-center ">
				<i class="fa fa-dollar" />
				Sessions this week
			</h2>
			<div class="mt-4">
				{filteredData.length} sessions
			</div>
		</div>
	</div>
</div>
