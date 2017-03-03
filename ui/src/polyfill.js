const oldOpen = window.open;
window.open = (url) => {
    if (url.indexOf('http') !== 1) url = `http://${url}`;
    oldOpen(url);
};
