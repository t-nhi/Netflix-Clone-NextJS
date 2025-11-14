import Google from '@/components/icons/google'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

const handleGoogleSignIn = () => {
    toast('Google Sign-In clicked (mock)')
    console.log('Google Sign-In clicked')
}
export default function LoginWithGGButton() {
    const loginT = useTranslations('LoginPage')

    return (
        <Button
            type='button'
            onClick={handleGoogleSignIn}
            className='bg-white/20 text-white dark:hover:bg-neutral-700 font-semibold netflix-sans-bold h-10 flex items-center justify-center gap-2 cursor-pointer'
        >
            <Google />
            {loginT('googleSignIn')}
        </Button>
    )
}
