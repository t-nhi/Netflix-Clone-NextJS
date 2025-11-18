interface buildFileFromUrlProps {
    url: string
    filename?: string
}
export async function buildFileFromUrl({ url, filename }: buildFileFromUrlProps): Promise<File> {
    const response = await fetch(url)
    const data = await response.blob()
    const name = filename || url.split('/').pop() || 'file'
    const metadata = { type: data.type }
    return new File([data], name, metadata)
}
