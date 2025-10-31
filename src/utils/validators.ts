export function isValidDateString(s?: string) {
    if (!s) return true;
    const d = new Date(s);
    return !Number.isNaN(d.getTime());
}

export function checkStartBeforeEnd(start?: string, end?: string) {
    if (!start || !end) return true;
    const s = new Date(start);
    const e = new Date(end);
    return s.getTime() <= e.getTime();
}
