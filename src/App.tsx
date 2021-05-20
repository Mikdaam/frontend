import React, { useState, useEffect } from 'react';
import { fecthVideos, searchVideos, addVideo } from './api/index';
import MainView from './components/MainView';
import VideoList from './components/VideoLists';

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

function App() {
	const [library, setLibrary] = useState<State['library']>({name: '', videos: []});
	const [videoSelected, setVideoSelected] = useState<State['selectedVideo']>(null);
	const [results, setResults] = useState<State['results']>([]);

	useEffect(() => {
		const getVideos = async (): Promise<void> => {
			const res = await fecthVideos();
			setLibrary(res.data);
		}

		getVideos();
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
		const response = await addVideo(newVideo);
		setLibrary(response.data);
	}

	const handleVideoSelect = (video: State['selectedVideo']) => {
		setResults([]);
		setVideoSelected(video);
	};

	return (
		<div className='main'>
			<div className='container'>
				<VideoList library={library} handleVideoSelect={handleVideoSelect} />
				<MainView videoSelected={videoSelected} search={search} results={results} addVideo={addVideoToLibrary} />
			</div>
		</div>
	);
};

export default App;
