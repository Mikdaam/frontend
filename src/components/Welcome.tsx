import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { logIn, signUp } from '../api';

export interface Form {
    username: string;
    password: string;
};

interface Props {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Welcome: React.FC<Props> = ({ setIsAuth }) => {
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [form, setForm] = useState<Form>({username: '', password: ''});
    const [message, setMessage] = useState<string>('');
    const history = useHistory();

    const swicthMode = (): void => {
        setIsSignup((prevState) => !prevState);
        setForm({username: '', password: ''});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name] : value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        // Vérification
        if (!form.username) {
            alert('Veuillez tapez un nom d\'utilisateur et un mot de passe');
            return;
        }
        
        if (isSignup) {
            try {
                const { data } = await signUp(form);
                setMessage(data.message);
                setIsSignup(false);
                setForm({username: '', password: ''});
            } catch (error) {
                console.log(error.response);
                setMessage(error.response.data.message);
            }
        } else {
            try {
                const { data } = await logIn(form);
                localStorage.setItem('profile', JSON.stringify(data));
                console.log(data);
                setIsAuth(true);
                history.push('/home');
            } catch (error) {
                console.log(error.response);
                setMessage(error.response.data.message);
            }
           
        }
    };

    return (
        <div className="login-box">
            <span>{message && (
                <ul>
                    <li>{message}</li>
                </ul>
            )}
                
            </span>
            <h2>{isSignup? 'Créez un compte' : 'Connectez - vous'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input 
                        type='text' 
                        name='username'
                        value={form.username}
                        onChange={handleChange}
                        placeholder='Username'
                    />
                </div>
                <div className="user-box">
                    <input 
                        type='password'
                        name='password' 
                        value={form.password}
                        onChange={handleChange}
                        placeholder='Password'
                    />
                </div>
                <button type='submit'>
                    {isSignup ? 'Créez un compte' : 'Se connecter'}
                </button>
            </form>
            <p onClick={swicthMode} className='link'>
                {isSignup ? 'Déjà un compte ? Connectez-vous' : 
                            'Pas de compte ? Créez un compte'}
            </p>
        </div>
    );
};

export default Welcome;
