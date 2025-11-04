export function isNewMovieRelease(releaseDate: string): boolean {
    try {
        const release = new Date(releaseDate)
        const now = new Date()
        const oneMonthsAgo = new Date()
        oneMonthsAgo.setMonth(now.getMonth() - 1)
        return release >= oneMonthsAgo && release <= now
    } catch (error) {
        console.error('Error parsing release date:', error)
        return false
    }
}
