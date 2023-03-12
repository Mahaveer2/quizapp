import { client } from "$lib/database";
import { json } from "@sveltejs/kit";

export async function POST({request}){
  const data = await request.json();
  const testId = data.testId;
  const studentId = data.studentId;

  let scores = await client.score.findMany({
		include:{
			student:true,
		}
	});

	const studentTest = await client.score.findMany({
		where:{
			student:{
				id:studentId
			}
		}
	})


	const testScores = scores.filter(score => score.testId === testId);
	const sum = testScores.reduce((total, score) => total + JSON.parse(score.score).score, 0);
	const averageScore = sum / testScores.length;

	const studentScore = testScores.find(score => score.studentId === studentId);
  const studentScoreValue = JSON.parse(studentScore.score).score;

  return json({
    status:200,
    studentScore:studentScoreValue,
    averageScore,
  })
}