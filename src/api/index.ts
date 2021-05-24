import axios from 'axios';
import { State as Lib, Video } from '../components/Home';
import { Form } from '../components/Welcome';

// REQUEST ON MY API

// const API = axios.create({ baseURL: 'http://localhost:5000/api' });
const API = axios.create({ baseURL: 'https://youtube-library-api.herokuapp.com/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') || '{}').token}`;
    }

    return req;
});

export const fecthVideos = (username: string) => API.get<Lib['library']>(`/library/${username}`);
export const addVideo = (newVideo: Video, username: string) => API.post<Lib['library']>(`/library/${username}`, newVideo);
export const updateTitle = (id: string, newTitle: {}, username: string) => API.patch(`/library/${username}/video/${id}`, newTitle);
export const deleteVideo = (id: string, username: string) => API.delete(`/library/${username}/video/${id}`);

export const signUp = (formData: Form) => API.post(`/user/signup`, formData);
export const logIn = (formData: Form) => API.post(`/user/login`, formData);

// REQUEST ON YOUTUBE API
const youtube_base_url: string = 'https://www.googleapis.com/youtube/v3/search';
const KEY: string = 'AIzaSyDG9Mog94ohWCnwYVc5Oa_I3YQSU0sQa-M';

export const searchVideos = (query: string, limit: number) => {
    return axios.get(`${youtube_base_url}?part=snippet&type=video&q=${query}&maxResults=${limit}&key=${KEY}`)
}