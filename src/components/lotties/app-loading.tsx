import Lottie, { LottieProps } from './base/lottie'

export default function AppLoading({ ...props }: Omit<LottieProps, 'path'>) {
    return <Lottie path='/lotties/app_loading.json' loop {...props} />
}
