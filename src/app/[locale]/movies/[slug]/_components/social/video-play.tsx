'use client'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

import { MediaPlayer, MediaProvider, Poster, Track, Title, useMediaState } from '@vidstack/react'
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default'
import ArrowLeftIcon from '@/components/icons/arrow-left'

interface VideoPlayProps {
    title?: string
}

export default function VideoPlay({ title }: VideoPlayProps) {
    return (
        <div className='w-full rounded-none'>
            <MediaPlayer
                src={{
                    src: 'https://tiktok-clone-taplamit.s3.ap-southeast-2.amazonaws.com/videos-hls/FF2_a_vyVj68aOyI4V1nZ/master.m3u8',
                    type: 'application/x-mpegurl'
                }}
                viewType='video'
                streamType='on-demand'
                playsInline
                crossOrigin
                title={title}
                poster='/images/home/inception-vertical.jpg'
                className='w-full max-h-screen rounded-none bg-black relative'
            >
                <MediaProvider>
                    <Poster className='vds-poster object-contain w-full h-full' />
                    <Track src='/subtitles/vi.vtt' kind='subtitles' label='Tiếng Việt' default />
                </MediaProvider>

                <TitleOverlay />

                <DefaultVideoLayout
                    thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
                    icons={defaultLayoutIcons}
                    className='!rounded-none'
                />
            </MediaPlayer>

            <style jsx global>{`
                media-player {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    aspect-ratio: 16 / 9;
                    background: black;
                    border-radius: 0 !important;
                    overflow: hidden;
                }
                media-player video {
                    width: 100%;
                    height: auto;
                    max-height: 100%;
                    object-fit: contain;
                    background: black;
                    display: block;
                    border-radius: 0 !important;
                }
                .vds-poster,
                .vds-video-layout {
                    border-radius: 0 !important;
                }
            `}</style>
        </div>
    )
}

function TitleOverlay() {
    const controlsVisible = useMediaState('controlsVisible')
    return (
        <div
            className={`absolute top-0 left-0 w-full px-4 pt-4 flex items-center text-white font-medium text-2xl z-50 transition-all duration-300 ${
                controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
            }`}
        >
            <ArrowLeftIcon className='w-10 h-10 mr-2 cursor-pointer' onClick={() => window.history.back()} />
            <Title />
        </div>
    )
}
