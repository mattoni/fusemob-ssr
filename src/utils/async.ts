export async function forTimeToPass(ms: number) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}
