// e2e/tests/main.spec.js
describe('LifeSync Core Features', () => {
    it('should automate tasks', async () => {
      await device.launchApp();
      await element(by.text('Add Task')).tap();
      await expect(element(by.text('Task Created'))).toBeVisible();
    });
  });