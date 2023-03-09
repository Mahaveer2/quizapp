import { client } from '$lib/database'

export async function load({params}){
  const data = await client.admin.findMany({});

  return {
    professors:data
  }
}