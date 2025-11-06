import AppLoading from '@/components/lotties/app-loading'
import RefreshToken from './refresh-token'

export default function RefreshTokenPage() {
    return (
        <div className='m-auto flex flex-col items-center'>
            <AppLoading loop className='size-18' />
            <h1 className='text-center font-semibold text-xl'>Redirecting...</h1>
            <RefreshToken />
        </div>
    )
}
