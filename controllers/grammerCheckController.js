const { OpenAI } = require('openai');
const { z } = require('zod');
const { zodResponseFormat } = require('openai/helpers/zod');
const adjustIndexes = require('../utils/adjustIndexes');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const GrammarErrorSchema = z.object({
	errors: z.array(
		z.object({
			word: z.string(),
			startIndex: z.number(),
			endIndex: z.number(),
			suggestion: z.string(),
		})
	),
});

exports.checkGrammar = async (req, res) => {
	try {
		const { text } = req.body;
		if (!text || typeof text !== 'string') {
			return res.status(400).json({ error: 'Valid text is required' });
		}

		// Normalize the text
		const normalizedText = text.trim().replace(/\s+/g, ' ');
		console.log('Normalized Text:', normalizedText);
		
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{
					role: 'system',
					content: `Analyze the given sentence and identify any grammatical, spelling, or punctuation errors.
Return character-based indexes that match the original sentence exactly, including spaces and punctuation.

For each error, return:
- 'word': the incorrect word or phrase
- 'startIndex': the starting character index (0-based)
- 'endIndex': the ending character index (exclusive)
- 'suggestion': the corrected word or phrase

Ensure accuracy in:
- Incorrect spelling
- Subject-verb agreement
- Wrong word usage
- Missing or misplaced punctuation
- Extra or missing words
- Incorrect verb tense

Only return a structured JSON array of errors.`,
				},
				{ role: 'user', content: normalizedText },
			],
			response_format: zodResponseFormat(GrammarErrorSchema, 'grammar_errors'),
		});
		
		console.log(completion.choices[0]?.message);

		const grammarData = JSON.parse(completion.choices[0]?.message?.content);
		if (!grammarData || !grammarData.errors) {
			throw new Error('An error occurred.');
		}

		console.log('Grammar Check Output:', grammarData);

		const adjustedErrors = adjustIndexes(grammarData.errors, normalizedText);

		res.json({ errors: adjustedErrors });
	} catch (error) {
		console.error('Error in grammar check:', error?.message || error);
		res.status(500).json({ error: 'Something went wrong. Please try again later.' });
	}
};
