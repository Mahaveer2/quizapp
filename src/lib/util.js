import { message } from "$lib/store"

export function showMessage({type,_message}){
  message.set({
    message:_message,
    type,
    show:true,
  })
  setTimeout(() => {
    message.set({
      message:"",
      type:'',
      show:false,
    })
  },1000)
}