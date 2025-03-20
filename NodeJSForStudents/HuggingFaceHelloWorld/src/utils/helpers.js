export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}