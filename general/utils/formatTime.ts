export function formatTime(time: string): string {
    const date = new Date(time);
    return date.toLocaleString();
}
