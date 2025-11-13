import StatCard from '@/app/[locale]/admin/dashboard/_components/admin-stat/stat-card'
import { stats } from '@/app/[locale]/admin/dashboard/_mock/stats.mock'
import { FaUsers, FaFilm, FaPlayCircle, FaChartBar, FaReceipt } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

export default function AdminStats() {
    const t = useTranslations('AdminPage.dashboardPage.statscard')

    const titles: Record<string, string> = {
        totalUsers: t('totalUsers'),
        totalMovies: t('totalMovies'),
        activeSubscriptions: t('activeSubcriptions'),
        totalRevenue: t('totalRevenue'),
        ordersToday: t('ordersToday')
    }

    const icons: Record<string, React.ComponentType> = {
        totalUsers: FaUsers,
        totalMovies: FaFilm,
        activeSubscriptions: FaPlayCircle,
        totalRevenue: FaChartBar,
        ordersToday: FaReceipt
    }

    return (
        <div className='grid grid-cols-5 gap-10 justify-items-center'>
            {stats.map((stat) => {
                const Icon = icons[stat.key]
                return <StatCard key={stat.key} title={titles[stat.key]} value={stat.value} icon={Icon} />
            })}
        </div>
    )
}
