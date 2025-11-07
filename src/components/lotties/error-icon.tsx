import Lottie, { LottieProps } from './base/lottie'

export default function ErrorIcon({ ...props }: Omit<LottieProps, 'path'>) {
    return <Lottie {...props} autoplay path='/lotties/error_icon.json' />
}
