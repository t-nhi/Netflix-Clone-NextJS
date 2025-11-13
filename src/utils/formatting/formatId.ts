export function maskId(id: string, visibleCount = 5): string {
    if (!id) return ''
    const visible = id.slice(0, visibleCount)
    const hiddenLength = Math.max(0, id.length - visibleCount)
    return visible + '*'.repeat(hiddenLength)
}
