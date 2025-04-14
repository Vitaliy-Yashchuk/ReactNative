// notifications.test.ts
import { scheduleTaskNotification } from '../src/services/notifications';

jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: jest.fn(),
}));

describe('Notification Service', () => {
  it('планує нотифікацію для завдання', async () => {
    const mockSchedule = require('expo-notifications').scheduleNotificationAsync;
    
    const task = {
      title: 'Тестове завдання',
      deadline: new Date(Date.now() + 3600000) // Через 1 годину
    };

    await scheduleTaskNotification(task.title, task.deadline);
    
    expect(mockSchedule).toHaveBeenCalledWith({
      content: {
        title: 'Нагадування про завдання',
        body: task.title,
      },
      trigger: {
        date: task.deadline,
      },
    });
  });
});