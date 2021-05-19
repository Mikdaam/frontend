import React from 'react';
import MainView from './components/MainView';
import VideoList from './components/VideoLists';

interface State {

}

function App() {
	return (
		<div>
			<h1>Hello from React</h1>
			<VideoList />
			<MainView />
		</div>
	);
}

export default App;
