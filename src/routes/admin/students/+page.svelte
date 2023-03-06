<script>
  export let data;

  const {students} = data;
  console.log(students)
</script>

<div class="container">
  <h1 class='text-2xl'>Students</h1>
  <div class="overflow-x-auto mt-4">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>id</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {#each students as student}
        <tr>
          <th>{student.id}</th>
          <td>{student.email}</td>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>