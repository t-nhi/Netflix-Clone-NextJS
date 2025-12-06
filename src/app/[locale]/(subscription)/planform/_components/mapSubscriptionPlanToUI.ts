import { SubscriptionPlanType } from '@/types/models/subscription.model'
import { useTranslations } from 'next-intl'

export type TranslationFunction = ReturnType<typeof useTranslations>

export interface MapSubscriptionPlanUIProps {
    plan: SubscriptionPlanType
    t: TranslationFunction
}

const mapSubscriptionPlanToUI = ({ plan, t }: MapSubscriptionPlanUIProps) => {
    return {
        // id: plan.id,
        // name: plan.name,
        // price: plan.price.toLocaleString('vi-VN') + ' ₫',
        // quality: plan.features.hd_streaming
        //     ? t('features.videoAudioQuality') + ' (HD)'
        //     : t('features.videoAudioQuality') + ' (SD)',
        // isPopular: plan.maxDevices >= 4,
        // features: {
        //     videoQuality: t('features.videoAudioQuality'),
        //     resolution: plan.features.hd_streaming
        //         ? t('features.resolution') + ': 1080p'
        //         : t('features.resolution') + ': 480p',
        //     supportedDevices: t('features.supportedDevices'),
        //     householdDevices: plan.maxDevices.toString(),
        //     downloads: plan.features.offline_download ? plan.maxDevices.toString() : '0',
        //     spatialAudio: plan.features.family_sharing
        //         ? t('plans.premium.spatialAudio') // dùng text có sẵn
        //         : null
        // }
    }
}

export default mapSubscriptionPlanToUI
