// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toPositiveInt(v: any, fallback = 1) {
    const num = typeof v === "string" ? parseInt(v, 10) : Number(v);
    if (!Number.isInteger(num) || num <= 0) return fallback;
    return num;
}