import { writable } from "svelte/store";

export const loading = writable(false);

export const message = writable({
  message:"",
  show:false,
  type:"",
});