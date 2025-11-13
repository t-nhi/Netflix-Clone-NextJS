import AdminStats from '@/app/[locale]/admin/dashboard/_components/admin-stat/admin-stat'
import DirectorLineChart from '@/app/[locale]/admin/dashboard/_components/chart/director-line-chart'
import KnowledgeForYou from '@/app/[locale]/admin/dashboard/_components/knowledge-for-you'
import TopFilms from '@/app/[locale]/admin/dashboard/_components/top-films'

export default function DashboardPage() {
    return (
        <div>
            <div className='py-8 px-4 md:px-8 space-y-8'>
                <AdminStats />
                <DirectorLineChart />
                <div className='flex gap-6 xl:flex-row flex-col'>
                    <TopFilms classNames='flex-1' />
                    <KnowledgeForYou />
                </div>
            </div>
        </div>
    )
}
