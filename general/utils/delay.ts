export async function delay(timeInMilliseconds: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeInMilliseconds);
    });
}
