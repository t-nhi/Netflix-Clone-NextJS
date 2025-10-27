export interface SubscriptionPlanType {
    id: string
    name: string
    quality: string
    price: string
    color: string
    isPopular?: boolean
    features: {
        videoQuality: string
        resolution: string
        supportedDevices: string
        householdDevices: string
        downloads: string
        spatialAudio?: string
    }
}
