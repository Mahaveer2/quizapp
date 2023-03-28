import { json } from "@sveltejs/kit";

export async function GET(){
  return json("Welcome to profbot api");
}