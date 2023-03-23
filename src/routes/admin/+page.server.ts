import { client } from "$lib/database";

export async function load(){
  const students = await client.student.findMany();
  // const profCount = await client.admin.count();
  const testCount = await client.test.count();
  const sessions = await client.paymentSessions.findMany();
  return {
    students,
    sessions,
    testCount
  }
}