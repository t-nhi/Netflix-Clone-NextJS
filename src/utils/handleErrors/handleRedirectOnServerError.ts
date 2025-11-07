export function handleErrorApiOnNextServer(error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).digest?.includes('NEXT_REDIRECT')) throw error
    console.error('Error fetching data:', error)
}
