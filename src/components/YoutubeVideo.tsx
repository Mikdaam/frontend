import React from 'react';
import { YoutubeVideo as IProps } from './Home';

interface Props {
    video: IProps;
    addVideo: (v: IProps) => void;
}

const YoutubeVideo: React.FC<Props> = ({ video, addVideo }) => {
    return (
        <div className='youtube-card'>
            <img src={video.imgUrl} alt='Image1' className='youtube-img' />
            <div className='content'>
                <h2>{video.title}</h2>
                <p>{video.description}</p>
                <button onClick={() => addVideo(video)} >
                    Ajouter à la bibliothèque <i className='far fa-plus-square'></i>
                </button>
            </div>
        </div>
    );
}

export default YoutubeVideo;
