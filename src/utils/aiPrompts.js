export function studyNotesPrompt(label, context) {
  return `You are an expert software engineering interview coach. Write comprehensive, interview-focused study notes for: **"${label}"** (from "${context}").

Format with these sections:

## What It Is
1-2 sentence crisp definition.

## Why Interviewers Ask This
What they're testing, how common this is.

## How It Works
Core mechanism with technical depth.

## Code Example
Well-commented JavaScript/TypeScript example.

## Interview Q&A
3-4 realistic questions with concise answers.

## 💡 Key Points to Remember
Critical facts as bullet list.

## Common Mistakes
What candidates get wrong.

Be dense, practical, interview-specific. Include real code.`
}

export function mockQuestionPrompt(topic, difficulty, count) {
  return `Generate ${count} multiple choice interview questions about "${topic}" at ${difficulty} difficulty level.

Return ONLY a valid JSON array with NO extra text, NO markdown, NO backticks. Just raw JSON:

[
  {
    "id": 1,
    "question": "Question text here?",
    "code": "optional code snippet or empty string",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Why this answer is correct with detail"
  }
]

Rules:
- correct is 0-indexed (0=A, 1=B, 2=C, 3=D)
- Questions must be technically accurate
- ${difficulty === 'easy' ? 'Focus on basic concepts and definitions' : difficulty === 'medium' ? 'Focus on practical usage and tricky behavior' : 'Focus on edge cases, internals, and advanced patterns'}
- Include code snippets for output-prediction questions
- Explanations must be detailed and educational
- RETURN ONLY THE JSON ARRAY, nothing else`
}

export function chatPrompt(topic, context, userMessage, history) {
  const historyText = history.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`).join('\n')
  return `You are an expert software engineering interview coach helping with: "${topic}" (${context}).

${historyText ? `Conversation so far:\n${historyText}\n` : ''}
User question: ${userMessage}

Give a clear, concise, technically accurate answer. Use code examples when helpful. Keep response focused and practical for interview prep.`
}