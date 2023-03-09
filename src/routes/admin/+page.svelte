<script>
  import { page } from "$app/stores";
  export let data;
  const { students} = data;
</script>
<div class="container">
  <h1 class='text-2xl'>Welcome {$page.data.admin.name}</h1>
  <div class='grid grid-cols-1 lg:grid-cols-3 mt-14 gap-5 '>
    <div class='w-full bg-black text-white p-10'>
      <h2 class='text-2xl flex gap-4 items-center '><i class='fa fa-users'></i> Students</h2>
      <div class="mt-4">
        {students.length} Students
      </div>
    </div>
    <div class='w-full bg-black text-white p-10'>
      <h2 class='text-2xl flex gap-4 items-center '>
        <i class='fa fa-percentage'></i>
        Average</h2>
        <div class="mt-4">
          {students.length}%
        </div>
    </div>
    <div class='w-full bg-black text-white p-10'>
      <h2 class='text-2xl flex gap-4 items-center '>
        <i class='fa fa-edit'></i>
        Tests</h2>
      <div class="mt-4">
        {students.length} Tests
      </div>
    </div>
  </div>
</div>