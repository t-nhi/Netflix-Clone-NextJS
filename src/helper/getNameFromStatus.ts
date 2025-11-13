import { AgeRank } from '@/constants/movie/age-rank.enum'
import { VideoQuality } from '@/constants/video/video-quality.enum'

export function getQualityNameFromEnum(quality: VideoQuality) {
    switch (quality) {
        case VideoQuality.SD:
            return 'SD'
        case VideoQuality.HD:
            return 'HD'
        case VideoQuality.FULL_HD:
            return 'FULL HD'
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
