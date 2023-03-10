import { json } from "@sveltejs/kit";

export async function GET(){
  return json("THE API IS WORKING...");
}