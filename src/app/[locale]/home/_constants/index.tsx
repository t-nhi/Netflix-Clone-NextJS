import DownloadCoreSmall from '@/components/icons/download-core-small'
import ProfileCoreSmall from '@/components/icons/profile-core-small'
import TelescopeCoreSmall from '@/components/icons/telescope-core-small'
import TelevisionCoreSmall from '@/components/icons/television-core-small'
import { useTranslations } from 'next-intl'

export type FeatureType = { title: string; description: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }

export function useAppFeatures(): FeatureType[] {
    const t = useTranslations('Features')

    return [
        {
            title: t('enjoyTvTitle'),
            description: t('enjoyTvDesc'),
            Icon: TelevisionCoreSmall
        },
        {
            title: t('downloadTitle'),
            description: t('downloadDesc'),
            Icon: DownloadCoreSmall
        },
        {
            title: t('watchEverywhereTitle'),
            description: t('watchEverywhereDesc'),
            Icon: TelescopeCoreSmall
        },
        {
            title: t('kidsProfilesTitle'),
            description: t('kidsProfilesDesc'),
            Icon: ProfileCoreSmall
        }
    ]
}

export type FaqItem = {
    question: string
    answer: string
}

export function useFaqList(): FaqItem[] {
    const t = useTranslations('FAQ')

    return [
        {
            question: t('q1'),
            answer: t('a1')
        },
        {
            question: t('q2'),
            answer: t('a2')
        },
        {
            question: t('q3'),
            answer: t('a3')
        },
        {
            question: t('q4'),
            answer: t('a4')
        },
        {
            question: t('q5'),
            answer: t('a5')
        },
        {
            question: t('q6'),
            answer: t('a6')
        }
    ]
}
