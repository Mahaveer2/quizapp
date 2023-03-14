<script>
	import { invalidate } from '$app/navigation'
	import { showMessage } from '$lib/util'
  import Fuse from 'fuse.js';
	export let data
	let loading = []
	let deleteLoad = [];
	let { students } = data
  let originalStudents = data.students
  let temp = [];

	const fuse = new Fuse(originalStudents, {
		keys: ['firstName', 'lastName','email']
	})

  const search = (searchText) => {
    let res = fuse.search(searchText);
    if(searchText == " " || searchText.length == ""){
      students = originalStudents;
      return;
    }else{

    temp = [];
			res.forEach((e) => {
				temp.push(e.item);
				temp = temp;
			});
      students = temp;
    }
  }

	const verifyStudent = async (id, index) => {
		const data = { id: id }
		loading[index] = true
		await fetch('/api/student/verify', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		loading[index] = false
		students[index].verified = !students[index].verified
		students = students
	}

  const deleteStudent = async(id,index) => {
    if(!confirm("Are you sure you want to delete")){
      return false;
    }

		deleteLoad[index] = true

    const data = {id:id}

    let req = await fetch("/api/student",{
      method:"DELETE",
      body:JSON.stringify(data)
    })

    let res = await req.json();
		deleteLoad[index] = false
    if(res.status == 200){
      showMessage({
        _message:"Deleted student succesfully!",
        type:"success"
      });
    }else{
      showMessage({
        _message:req.message,
        type:"Error"
      });
      return false;
    }
    students.splice(index, 1);
    students = students;
  }
</script>

<div class="container">
	<h1 class="text-2xl">Students</h1>
  <input class="p-5 w-full border mt-4 mb-2" placeholder="Search Here ..." on:keyup={(e) => search(e.target.value)} />
	<div class="overflow-x-auto mt-4">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>id</th>
					<th>Email</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Verified</th>
				</tr>
			</thead>
			<tbody>
				{#each students as student, index}
					<tr>
						<th>{student.id}</th>
						<td>{student.email}</td>
						<td>{student.firstName}</td>
						<td>{student.lastName}</td>
						<td>
							{#if student.verified}
								<button
									aria-busy={loading[index]}
									on:click={() => verifyStudent(student.id, index)}
									class="btn btn-warning">Disverify</button
								>
							{:else}
								<button
									aria-busy={loading[index]}
									on:click={() => verifyStudent(student.id, index)}
									class="btn btn-black">Verify</button
								>
							{/if}
              <button
									aria-busy={deleteLoad[index]}
									on:click={() => deleteStudent(student.id, index)}
									class="btn btn-error">Delete</button
								>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
