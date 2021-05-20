import axios from 'axios';
import { State as Lib, Video } from '../App';

// REQUEST ON MY API
//const base_url: string = 'http://localhost:5000/api/library/john';
const base_url: string = 'https://youtube-library-api.herokuapp.com/api/library/john';

export const fecthVideos = () => axios.get<Lib['library']>(base_url);
export const addVideo = (newVideo: Video) => axios.post<Lib['library']>(base_url, newVideo);
export const updateTitle = (id: string, newTitle: {}) => axios.patch(`${base_url}/video/${id}`, newTitle);
export const deleteVideo = (id: string) => axios.delete(`${base_url}/video/${id}`);


// REQUEST ON YOUTUBE API
const youtube_base_url: string = 'https://www.googleapis.com/youtube/v3/search';
const KEY: string = 'AIzaSyDG9Mog94ohWCnwYVc5Oa_I3YQSU0sQa-M';

export const searchVideos = (query: string, limit: number) => {
    return axios.get(`${youtube_base_url}?part=snippet&type=video&q=${query}&maxResults=${limit}&key=${KEY}`)
}