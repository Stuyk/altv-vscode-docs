export function sleep(ms: number) {
    return new Promise((resolve: Function): void => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
