import localFont from 'next/font/local'

export const NetflixSans = localFont({
    src: [
        {
            path: '../assets/fonts/NetflixSans_W_Rg.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../assets/fonts/NetflixSans_W_Md.woff2',
            weight: '600',
            style: 'normal'
        },
        {
            path: '../assets/fonts/NetflixSans_W_Bd.woff2',
            weight: '700',
            style: 'normal'
        },
        {
            path: '../assets/fonts/NetflixSans_W_Blk.woff2',
            weight: '900',
            style: 'normal'
        },
        {
            path: '../assets/fonts/netflix-sans-core-variable-full.woff2',
            weight: '100 900',
            style: 'normal'
        }
    ],
    display: 'swap',
    variable: '--font-netflix-sans'
})

export const NetflixIcons = localFont({
    src: '../assets/fonts/nf-icon-v1-93.woff',
    display: 'swap',
    variable: '--font-netflix-icons'
})
