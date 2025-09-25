import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'

const TrailersSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
    const isPlayable = typeof ReactPlayer.canPlay === 'function' 
        ? ReactPlayer.canPlay(currentTrailer?.videoUrl)
        : Boolean(currentTrailer?.videoUrl)

    if(!isPlayable){
        return null
    }

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            <div className='relative leading-none'>
                <BlurCircle top='-100px' right='-100px' />
                <ReactPlayer 
                    url={currentTrailer.videoUrl} 
                    controls={true}
                    light={currentTrailer.image}
                    className='mx-auto max-w-full' 
                    width='960px' 
                    height='540px' 
                />
            </div>
        </div>
    )
}

export default TrailersSection