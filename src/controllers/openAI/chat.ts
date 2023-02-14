import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Configuration, OpenAIApi } from 'openai';

export const ChatOpenAIController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const question = req.body.question;

        if (!question) return res.status(400).json({ error: "Question missing" });

        if (question.length > 100) return res.status(400).json({ error: "Question to long" });

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${question}`,
            max_tokens: 999,
            temperature: 0.9,
            presence_penalty: 0,
            frequency_penalty: 0.6,
            stop: [" Human:", " AI:"],
        });

        const quote = completion.data.choices[0].text;

        res.status(200).json({ message: quote });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}