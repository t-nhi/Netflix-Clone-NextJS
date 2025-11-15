export default function getFullURLFromPathName(src: string): string {
    const normalizedSrc = src.startsWith('/') ? src : '/' + src
    return 'http://localhost:9000' + normalizedSrc
}
