export const isArrayEmpty = (arr) => arr.length === 0;
export const parseDatetime = (seconds) => {
    const d = new Date(seconds * 1000);
    const time = d.toLocaleTimeString();
    const date = d.toLocaleDateString();
    if (time === '12:00:00 AM') {
        return `${date}, ${time}`
    } else {
        return `${time}`
    }
}