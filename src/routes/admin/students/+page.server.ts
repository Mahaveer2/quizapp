import {client} from "$lib/database";
import { json } from "@sveltejs/kit";

export async function load(){
  const students = await client.student.findMany();

  return {
    students:students
  };
}