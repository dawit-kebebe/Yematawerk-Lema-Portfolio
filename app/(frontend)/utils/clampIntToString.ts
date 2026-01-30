export function clampToString(v?: string | number, fallback = "1") {
    if (v === undefined || v === null) return fallback;
    return String(v);
}
