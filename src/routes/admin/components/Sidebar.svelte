<script>
	import SideLink from './SideLink.svelte'
	import { page } from '$app/stores';
	import DropDown from './DropDown.svelte'
	const ico = $page.data.admin.email[0];
</script>

<div
	class="lg:w-[300px] bg-black text-white flex flex-col h-[100vh] left-0 md:left-0 w-[90px] fixed top-0"
>
	<div class="flex justify-center w-full">
		<h2 class="text-2xl font-regular text-center mt-10 bg-[rgba(255,255,255,.1)] rounded-full w-[60px] h-[60px]  md:w-[60px] md:h-[60px] flex justify-center items-center">{ico}</h2>
		</div>
	<div class="flex flex-col w-full mt-14">
		<SideLink title="Dashboard" icon="fa fa-gauge" href="/admin" />
		<SideLink title="Students" icon="fa fa-users" href="/admin/students" />
		<DropDown href='/admin/test' name='Tests'>
			<SideLink title="View Tests" icon="fa fa-book" href="/admin/test/" />
			<SideLink title="Create Test" icon="fa fa-plus" href="/admin/test/create" />
		</DropDown>
		<SideLink title="Professors" icon="fa fa-plus" href="/admin/professor" />
		<SideLink title="Settings" icon="fa fa-gear" href="/admin/settings" />
	</div>
	<div class="mt-auto">
		<form action="/logout" method="POST">
			<button
				class="w-full flex justify-center items-center h-[50px] bg-[rgba(255,255,255,.05)] gap-5"
				type="submit"
			>
				<i class="fa fa-sign-out" />

				<span class="hidden lg:block">Logout</span>
			</button>
		</form>
	</div>
</div>
