import { client } from "$lib/database";
import { json } from "@sveltejs/kit";

export async function POST({request}){
  const data = await request.json();
  const testId = data.testId;

  let scores = await client.score.findMany({
		where:{
			test:{
				id:testId,
			}
		},
		include:{
			student:true,
		}
	});

	const testScores = scores.filter(score => score.testId === testId);
	const sum = testScores.reduce((total, score) => total + JSON.parse(score.score).score, 0);
	const averageScore = sum / testScores.length;

  return json({
    status:200,
    averageScore,
  })
}