export function isValidDateString(s?: string) {
    if (!s) return true;
    const d = new Date(s);
    return !Number.isNaN(d.getTime());
}

export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};



