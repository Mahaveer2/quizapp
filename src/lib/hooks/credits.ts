import { client } from '$lib/database'
import moment from 'moment'

export async function runCreditLogic(email: string) {
  // find all credits for the given email
  let isCredit = await client.freeCredits.findMany({
    where: {
      student: {
        email: email
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // filter out expired or used credits
  const validCredits = isCredit.filter(credit => {
    return moment().isBefore(credit.expiresAt) && !credit.used;
  });

  // remove expired or used credits from the database
  const expiredCredits = isCredit.filter(credit => {
    return moment().isAfter(credit.expiresAt) || credit.used;
  });

  for (const credit of expiredCredits) {
		if(!credit.used){
			await client.student.update({
				where:{
					email:email,
				},
				data:{
					credits:{
						decrement:1
					}
				}
			})
		}
    await client.freeCredits.update({
      where: {
        id: credit.id,
      },
			data:{
				used:true
			}
    });
  }

  // create a new credit if there are no valid credits
  if (validCredits.length <= 0) {
    await client.freeCredits.create({
      data: {
        used: false,
        student: {
          connect: {
            email: email
          }
        }
      }
    })
  }
}
