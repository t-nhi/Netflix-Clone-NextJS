import SelectLanguage from '@/components/locale-switcher-select'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import React from 'react'

interface FooterProps {
    className?: string
}

export default function Footer({ className }: FooterProps) {
    const t = useTranslations('Footer')

    const footerLinks = [
        [
            { label: t('links.faq'), href: '#' },
            { label: t('links.investorRelations'), href: '#' },
            { label: t('links.privacy'), href: '#' },
            { label: t('links.speedTest'), href: '#' }
        ],
        [
            { label: t('links.helpCentre'), href: '#' },
            { label: t('links.jobs'), href: '#' },
            { label: t('links.cookiePreferences'), href: '#' },
            { label: t('links.legalNotices'), href: '#' }
        ],
        [
            { label: t('links.account'), href: '#' },
            { label: t('links.waysToWatch'), href: '#' },
            { label: t('links.corporateInformation'), href: '#' },
            { label: t('links.onlyOnNetflix'), href: '#' }
        ],
        [
            { label: t('links.mediaCentre'), href: '#' },
            { label: t('links.termsOfUse'), href: '#' },
            { label: t('links.contactUs'), href: '#' }
        ]
    ]

    return (
        <footer className={cn('w-full text-muted-foreground p-4 md:py-18 px-6 md:px-8 lg:px-37 text-sm', className)}>
            <Link href='#' className='block mb-6 text-base underline '>
                {t('contactUs')}
            </Link>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                {footerLinks.map((col, i) => (
                    <ul key={i} className='space-y-3'>
                        {col.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className='hover:underline text-sm'>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className='mb-6'>
                <SelectLanguage />
            </div>
            <div>{t('companyName')}</div>
        </footer>
    )
}
