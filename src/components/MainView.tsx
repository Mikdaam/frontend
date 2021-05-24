import React, { useState } from 'react';
import { State as IProps, YoutubeVideo as YVideo } from './Home';

import VideoPlayer from './VideoPlayer';
import YoutubeVideo from './YoutubeVideo';
// import Spinner from './Spinner';

interface Props {
    videoSelected : IProps['selectedVideo'];
    search: (q: string, l: number) => void;
    addVideo: (v: YVideo) => void;
    results: IProps['results'];
};

interface Input {
    query: string;
    limits: number
};

const MainView: React.FC<Props> = ({ videoSelected, search, results, addVideo }) => {

    const [input, setInput] = useState<Input>({query: '', limits: 5});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name] : value
        });
    };

    // const handleClick = (): void => {

    // };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        // Vérification
        if (!input.query) {
            alert('Veuillez tapez un mot à rechercher!!!');
            return;
        }
        
        search(input.query, input.limits);

        setInput({
            query: '',
            limits: 5
        });

    };

    return (
        <div className='main-view'>
            <form onSubmit={handleSubmit} className='form'>
                <input
                    type='text'
                    placeholder='Make a search .........'
                    name='query'
                    value={input.query}
                    onChange={handleChange}
                />

                <select 
                    value={input.limits}
                    onChange={handleChange}
                    name='limits'
                >
                    <option value='5' >5</option>
                    <option value='10' >10</option>
                    <option value='15' >15</option>
                    <option value='25' >25</option>
                </select>
                <button type='submit'>
                    <i className="fas fa-search"></i>
                </button>
            </form>
            
            {videoSelected && 
                ( <VideoPlayer 
                    id={videoSelected.id} 
                    title={videoSelected.title} />
                )
            }

            {/* Amélioration avant le mardi 😏🙄 */}
            {/* { !results.length ? <Spinner /> : results.map((result) => (
                <YoutubeVideo 
                    key={result.id}
                    video={result} 
                    addVideo={addVideo} 
                />
            ))} */}

            {results.map((result) => (
                <YoutubeVideo 
                    key={result.id}
                    video={result} 
                    addVideo={addVideo} 
                />
            ))}

            {!videoSelected && !results.length && (
                <div className='center'>
                    Veuillez faire une recherche
                    <ul>
                        <li>Ajouter une video à la bibliothèque</li>
                        <li>Visualiser la video en cliquant dessus</li>
                    </ul>
                </div>
            )}

        </div>
    );
}

export default MainView;
