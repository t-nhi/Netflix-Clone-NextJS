import StickyHeaderWrapper from './_components/sticky-header-wrapper'
import DetailFilm from './_components/film-infor/information-film'
import { filmDetail } from '@/_mock/index'
import CommentBlock from '@/app/[locale]/movies/[slug]/_components/comments/comment-block'
import Footer from '@/components/footer'
import VideoPlay from '@/app/[locale]/movies/[slug]/_components/social/video-play'
import SuggestForYou from '@/app/[locale]/movies/[slug]/_components/suggest/suggest-for-you'

export default function MovieDetailPage() {
    return (
        <div className='bg-[#141414] text-white min-h-screen flex flex-col'>
            <StickyHeaderWrapper buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white' />
            <main className='flex-1 w-full'>
                <section className='w-full max-h-screen rounded-none'>
                    <VideoPlay title={filmDetail.title} />
                </section>
                <section className='w-full py-2'>
                    <DetailFilm informationFilm={filmDetail} />
                </section>
                <section className='w-full py-2'>
                    <SuggestForYou />
                </section>
                <section id='comment-block' className='w-full pb-10 pt-4'>
                    <CommentBlock informationFilm={filmDetail} />
                </section>
            </main>
            <Footer className='px-6 md:px-8 lg:px-15 border-t-[0.3px] border-white/10' />
        </div>
    )
}
