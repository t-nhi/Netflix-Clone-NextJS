import { AgeRank, Quality } from '@/app/constants/enums'

export function getQualityNameFromEnum(quality: Quality) {
    switch (quality) {
        case Quality.SD:
            return 'SD'
        case Quality.HD:
            return 'HD'
        case Quality.FULL_HD:
            return 'FULL HD'
        case Quality.QHD:
            return '2K'
        case Quality.UHD:
            return '4K'
        default:
            return quality
    }
}

export function getAgeRankNameFromEnum(age: AgeRank) {
    switch (age) {
        case AgeRank.P:
            return 'P (Mọi lứa tuổi)'
        case AgeRank.T13:
            return '13+'
        case AgeRank.T16:
            return '16+'
        case AgeRank.T18:
            return '18+'
        default:
            return String(age)
    }
}
