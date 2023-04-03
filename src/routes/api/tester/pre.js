import { OPENAI_KEY } from '$env/static/private';
import { getTokens } from '$lib/tokenizer';
import { json } from '@sveltejs/kit';
import { client } from "$lib/database";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
export const POST = async ({ request, locals }) => {
    try {
        if (!OPENAI_KEY) {
            throw new Error('OPENAI_KEY env variable not set');
        }
        const requestData = await request.json();
        let prompt = `The question is ${requestData.question} and answer is ${requestData.answer} if the answer is correct say yes else no ;your response must be in yes or no`;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        const output = response.data.choices[0].text;
        return json(output);
    }
    catch (err) {
        console.error(err);
        return json({ error: 'There was an error processing your request' }, { status: 500 });
    }
};
//# sourceMappingURL=pre.js.map