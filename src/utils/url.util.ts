export function getServerUrl(path: string): string {
    const normalized = path.startsWith('/') ? path : '/' + path
    return 'http://localhost:9000' + normalized
}
