const config = require('../config');
const reminderHelpers = require('./helpers/reminder');

let notified = {};

if (window.chrome && window.chrome.notifications) {
    chrome.notifications.onButtonClicked.addListener((notificationId) => {
        const reminderIds = notificationId.split(' ');
        reminderIds.forEach((id) => window.open(notified[id].url));
    });

    checkDue();
}


function getReminders () {
    return reminderHelpers.getByStatus(config.status.unread)
        .catch(() => {
            const store = localStorage.store ? JSON.parse(localStorage.store) : null;
            if (!store || !store.reminder.reminders) return [];
            return store.reminder.reminders;
        });
}

function checkDue() {
    getReminders()
        .then(reminders => {
            const updatedNotified = {};
            let showNotification = false;
            const overdueReminders = Object.values(reminders).filter((reminder) => {
                if (reminder.dueDate > Date.now()) return;
                updatedNotified[reminder._id] = reminder;
                if (!notified[reminder._id]) showNotification = true;
                return reminder;
            });
            notified = updatedNotified;

            if (!showNotification) return setTimeout(checkDue, config.bgCheckInterval);

            if (overdueReminders.length > config.readLimit) {
                createNotification(
                    Date.now().toString(),
                    `You have ${overdueReminders.length} overdue reminders`
                );
            } else {
                createNotification(
                    overdueReminders.map(r => r._id).join(' '),
                    `You have ${overdueReminders.length} overdue reminder(s)`,
                    true
                );
            }

            return setTimeout(checkDue, config.bgCheckInterval);
        });
}

function createNotification(id, text, buttons) {
    const params = {
        type: 'basic',
        iconUrl: 'icon.png',
        message: text,
        title: 'Scheduled reminder(s):',
    };

    if (buttons) params.buttons = [
        {title: 'Read now'},
    ];

    chrome.notifications.create(id, params);
}