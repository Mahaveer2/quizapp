<script>
  import { page } from "$app/stores";
  export let data;
  const { students} = data;
</script>
<div class="container">
  <h1 class='text-2xl'>Welcome {$page.data.admin.name}</h1>
  <div class='grid grid-cols-1 lg:grid-cols-3 mt-14 gap-5 '>
    <div class='w-full p-3 bg-black text-white p-10'>
      <h2 class='text-2xl flex gap-2 items-center '><i class='fa fa-users'></i> Students</h2>
      {students.length} students
    </div>
    <div class='w-full p-3 bg-black text-white p-10'>
      <h2 class='text-2xl flex gap-2 items-center '>
        <i class='fa fa-percentage'></i>
        Average</h2>
      {students.length}%
    </div>
    <div class='w-full p-3 bg-black text-white p-10'>
      <h2 class='text-2xl flex gap-2 items-center '>
        <i class='fa fa-edit'></i>
        Tests</h2>
      {students.length} Tests
    </div>
  </div>
</div>