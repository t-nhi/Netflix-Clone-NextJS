import AppLoading from '@/components/lotties/app-loading'
import Logout from './logout'

export default function LogoutPage() {
    return (
        <div className='m-auto flex flex-col items-center'>
            <AppLoading loop className='size-18' />
            <h1 className='text-center font-semibold text-xl'>Redirecting...</h1>
            <Logout />
        </div>
    )
}
