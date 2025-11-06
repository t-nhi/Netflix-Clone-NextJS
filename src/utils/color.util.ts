export function getHueFromId(id: string) {
    return [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
}
