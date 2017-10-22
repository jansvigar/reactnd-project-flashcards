import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

export function calculateScore(correctAnswer, totalCards) {
  const rawScore = correctAnswer / totalCards;
  return Number(rawScore * 100).toFixed(2);
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem('flashcards:notification');
}

export function createNotification() {
  return {
    title: 'Quiz time',
    body: "Don't forget to complete a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem('flashcards:notification')
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day',
            });
            AsyncStorage.setItem('flashcards:notification', JSON.stringify(true));
          }
        });
      }
    });
}
