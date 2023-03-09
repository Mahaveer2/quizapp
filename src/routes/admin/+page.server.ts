import { client } from "$lib/database";

export async function load(){
  const students = await client.student.findMany();

  return {
    students,
  }
}