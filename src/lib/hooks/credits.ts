import { client } from '$lib/database'
import moment from 'moment'

export async function runCreditLogic(email: string) {
	let isCredit = await client.freeCredits.findMany({
		where: {
			used: false,
			student: {
				email: email
			}
		}
	})

	const createCredit = async () => {
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

	if (isCredit.length <= 0) {
		await createCredit()
	}

	isCredit.forEach(async (credit) => {
		if (moment().isAfter(credit.expiresAt)) {
			if (credit.used) {
				await client.student.update({
					where: {
						email: email
					},
					data: {
						credits: {
							decrement: 1
						}
					}
				})
			}
			await createCredit()
		}
		if (moment().isBefore(credit.expiresAt) && !credit.used) {
			await client.student.update({
				where: {
					email: email
				},
				data: {
					credits: {
						increment: 1
					}
				}
			})

			await client.freeCredits.update({
				where: {
					id: credit.id
				},
				data: {
					used: true
				}
			})
		} else {
		}
	})
}
