import { client } from "$lib/database";

export async function load(){
  const students = await client.student.findMany();
  const profCount = await client.admin.count();
  const testCount = await client.test.count();
  return {
    students,
    profCount,
    testCount
  }
}