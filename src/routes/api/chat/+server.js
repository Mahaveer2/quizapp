import { OPENAI_KEY } from '$env/static/private';
import { getTokens } from '$lib/tokenizer';
import { json } from '@sveltejs/kit';
export const POST = async ({ request }) => {
    try {
        if (!OPENAI_KEY) {
            throw new Error('OPENAI_KEY env variable not set');
        }
        const { messages } = await request.json();
        if (!messages) {
            throw new Error('no messages provided');
        }
        const prompt = 'You are a study helper chat bot your name is profbot and your goal is to help users learn;if by chance any one asks for quiz him or test tell him to go to navigation and see a link called test;if anyone asks to quiz me tell him about the navigation link if he stills asks to quiz create a quiz';
        const chatRequestOpts = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: "If user asks for quiz or says to test him about a topic you should give him a link : <a href='/test'>The tests are here</>"
                },
                {
                    role: 'system',
                    content: 'Your only role is to give the users the link of test exactly like what i described'
                },
                {
                    role: 'system',
                    content: 'if the user asks something random then say that: i am not built for this purpose here is the test link'
                },
                ...messages
            ],
            temperature: 0.2,
            stream: true
        };
        const { body } = await fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                Authorization: `Bearer ${OPENAI_KEY}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(chatRequestOpts)
        });
        return new Response(body, {
            headers: {
                'Content-Type': 'text/event-stream'
            }
        });
    }
    catch (err) {
        console.error(err);
        return json({ error: 'There was an error processing your request' }, { status: 500 });
    }
};
//# sourceMappingURL=+server.js.map