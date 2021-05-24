import React from 'react';

import videoImg from '../img/video.png';

interface Props {
    video: {
		id: string,
		title: string
	},
    handleVideoSelect: (v: Props['video']) => void
}

const LibrayVideo: React.FC<Props> = ({ video, handleVideoSelect }) => {
    return (
        <div className='card'>
            <img 
                className='card-img' 
                src={videoImg} 
                alt='video_thumbnails' 
                onClick={() => handleVideoSelect(video)}
            />
            <h5 className='title'>{video.title}</h5>
            
        </div>
    )
}

export default LibrayVideo;
