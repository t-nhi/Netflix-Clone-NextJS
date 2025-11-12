export enum ChunkUploadStatus {
    INITIATED = 'INITIATED', // Upload session created
    IN_PROGRESS = 'IN_PROGRESS', // Chunks being uploaded
    COMPLETED = 'COMPLETED', // All chunks uploaded
    MERGING = 'MERGING', // Merging chunks into final file
    FAILED = 'FAILED', // Upload failed
    EXPIRED = 'EXPIRED' // Upload session expired
}
