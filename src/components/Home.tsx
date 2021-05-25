import React, { useState, useEffect } from 'react';
import MainView from './MainView';
import VideoList from './VideoLists';

import { fecthVideos, searchVideos, addVideo, deleteVideo } from './../api/index';

export interface Video {
	id: string;
	title: string;
};

export interface YoutubeVideo extends Video {
	description: string;
	imgUrl: string;
};

export interface State {
	library: {
		name: string,
		videos: Video[]
	};
	selectedVideo: Video | null;
	results: YoutubeVideo[];
};

const Home = () => {
    const [library, setLibrary] = useState<State['library']>({name: '', videos: []});
	const [videoSelected, setVideoSelected] = useState<State['selectedVideo']>(null);
	const [results, setResults] = useState<State['results']>([]);

	const { result } = JSON.parse(localStorage.getItem('profile') || '{}');
	console.log(result);
	
	useEffect(() => {
		const getVideos = async (username: string): Promise<void> => {
			const res = await fecthVideos(username);
			setLibrary(res.data);
		}
		
		getVideos(result.username);

	}, []);

	const search = async (query: string, limits: number): Promise<void> => {
		const response = await searchVideos(query, limits);

		const res = response.data.items.map((item: any): YoutubeVideo => {
			const yVideo: YoutubeVideo = {
				id: item.id.videoId,
				title: item.snippet.title,
				description: item.snippet.description,
				imgUrl: item.snippet.thumbnails.medium.url
			}
			return yVideo;
		});

		// console.log(response.data);
		// console.log(res);
		setVideoSelected(null);

		setResults(res);
	};

	const addVideoToLibrary = async (video: YoutubeVideo): Promise<void> => {
		const newVideo = {
			title: video.title,
			id: video.id
		}
		const response = await addVideo(newVideo, result.username);
		setLibrary(response.data);
	}

	const deleteVideoLibrary = async (id: string) : Promise<void> => {
		await deleteVideo(id, result.username);
		setLibrary({
			...library,
			videos: library.videos.filter((video) => video.id !== id)
		});
	};

	const handleVideoSelect = (video: State['selectedVideo']) => {
		setResults([]);
		setVideoSelected(video);
	};

    return (
        <div className='main'>
            <div className='container'>
                <VideoList library={library} deleteVideo={deleteVideoLibrary} handleVideoSelect={handleVideoSelect} />
                <MainView videoSelected={videoSelected} search={search} results={results} addVideo={addVideoToLibrary} />
            </div>
        </div>
    )
}

export default Home;
