const notified = [];
const interval = 10 * 1000;
const readLimit = 5;

if (chrome.notifications) {
    chrome.notifications.onButtonClicked.addListener((notificationId) => {
        const reminderIds = notificationId.split(' ');
        const reminders = getReminders();
        reminderIds.forEach((id) => window.open(reminders[id].url));
    });

    checkDue();
}

function getReminders() {
    const store = localStorage.store ? JSON.parse(localStorage.store) : null;
    if (!store || !store.reminder.reminders) return [];
    return store.reminder.reminders;
}

function checkDue() {
    const overdueReminders = Object.values(getReminders()).filter((reminder) => {
            if (reminder.dueDate > Date.now() || notified.indexOf(reminder._id) !== -1) return;
            notified.push(reminder._id);
            return reminder;
        });

    if (!overdueReminders.length) return setTimeout(checkDue, interval);

    if (overdueReminders.length > readLimit) {
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

    return setTimeout(checkDue, interval);
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