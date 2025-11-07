import { SubscriptionPlanType } from '@/types/models/subscription.model'

export const mockSubscriptionPlans: SubscriptionPlanType[] = [
    {
        id: 'mobile',
        name: 'Mobile',
        quality: '480p',
        price: '74,000 ₫',
        color: 'from-blue-600 to-blue-800',
        features: {
            videoQuality: 'Khá',
            resolution: '480p',
            supportedDevices: 'Điện thoại di động, máy tính bảng',
            householdDevices: '1',
            downloads: '1'
        }
    },
    {
        id: 'basic',
        name: 'Basic',
        quality: '720p',
        price: '114,000 ₫',
        color: 'from-blue-700 to-purple-700',
        features: {
            videoQuality: 'Tốt',
            resolution: '720p (HD)',
            supportedDevices: 'TV, máy tính, điện thoại di động, máy tính bảng',
            householdDevices: '1',
            downloads: '1'
        }
    },
    {
        id: 'standard',
        name: 'Standard',
        quality: '1080p',
        price: '231,000 ₫',
        color: 'from-purple-600 to-purple-800',
        features: {
            videoQuality: 'Tuyệt vời',
            resolution: '1080p (Full HD)',
            supportedDevices: 'TV, máy tính, điện thoại di động, máy tính bảng',
            householdDevices: '2',
            downloads: '2'
        }
    },
    {
        id: 'premium',
        name: 'Premium',
        quality: '4K + HDR',
        price: '273,000 ₫',
        color: 'from-purple-700 to-red-600',
        isPopular: true,
        features: {
            videoQuality: 'Tốt nhất',
            resolution: '4K (Ultra HD) + HDR',
            supportedDevices: 'TV, máy tính, điện thoại di động, máy tính bảng',
            householdDevices: '4',
            downloads: '6',
            spatialAudio: 'Âm thanh không gian (âm thanh đa chiều)'
        }
    }
]
