export default async function handler(req, res) {
  const { grade, outcome } = req.body;
  const prompt = `You are an encouraging, justice-centered songwriting coach. A ${grade} student wants to write a song to show they understand this learning outcome: "${outcome}". Guide them through:

1. Brainstorming concepts and metaphors.
2. Thinking of rhyming words connected to big ideas.
3. A deeper theme that can drive a powerful song.

Be kind, supportive, and help them make sense of what they know.`;

  const completion = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const json = await completion.json();
  const result = json.choices?.[0]?.message?.content || 'Sorry, something went wrong.';
  res.status(200).json({ result });
}
