import React from 'react';
import { Video as Props } from '../App';


const VideoPlayer: React.FC<Props> = ({ id, title }) => {
    return (
        <div className="video-player">
            <h5>{title}</h5>
            <iframe
                title={id}
                className="video-iframe"
                allowFullScreen
                src={`https://www.youtube.com/embed/${id}`}
            />
        </div>
    )
}

export default VideoPlayer;
