import * as admin from 'firebase-admin';
import OpenAI from 'openai';

admin.initializeApp();
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const generateTaskSuggestions = async (userId: string) => {
  const events = await admin.firestore().collection(`users/${userId}/events`).get();
  const prompt = `Suggest tasks based on events: ${JSON.stringify(events.docs.map(d => d.data()))}`;
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  await admin.firestore().doc(`users/${userId}/tasks/ai`).set({
    suggestions: completion.choices[0]?.message?.content?.split('\n') || [],
  });
};