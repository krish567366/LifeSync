import { suggestTasks } from '../services/AIService';

test('AI suggests tasks based on calendar events', async () => {
  const userId = 'user123';
  const tasks = await suggestTasks(userId);
  expect(tasks.length).toBeGreaterThan(0);
});