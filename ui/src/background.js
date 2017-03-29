require('./polyfill');
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


function getReminders() {
    const store = localStorage.store ? JSON.parse(localStorage.store) : null;

    if (!store || !store.reminder) return Promise.resolve([]);

    const location = store.reminder.currentLocation;

    return reminderHelpers.getBy({
        status: config.status.unread,
        location,
    }).catch(() => {
        if (!store || !store.reminder.reminders) return [];
        const reminders = Object.values(store.reminder.reminders);
        return reminders.filter((reminder) => reminder.location === location);
    });
}

function checkDue() {
    getReminders().then((reminders) => {
        const updatedNotified = {};
        let showNotification = false;
        const overdueReminders = reminders.filter((reminder) => {
            if (new Date(reminder.dueDate) > Date.now()) return;
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
        iconUrl: 'notification.png',
        message: text,
        title: 'Scheduled reminder(s):',
    };

    if (buttons) params.buttons = [
        {title: 'Read now'},
    ];

    chrome.notifications.create(id, params);
}