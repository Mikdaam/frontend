import React from 'react';
import LibrayVideo from './LibrayVideo';
import { State as IProps, Video } from '../App';

export interface Props {
    library: IProps['library'],
    handleVideoSelect: (v: Video) => void
}

const VideoLists: React.FC<Props> = ({ library, handleVideoSelect }) => {
    return (
        <div className='sidebar'>
            <h4>{library.name.toUpperCase()} Library</h4>
            {library.videos.map((video) => (
                <LibrayVideo key={video.id} video={video} handleVideoSelect={handleVideoSelect} />
            ))}
        </div>
    )
}

export default VideoLists
