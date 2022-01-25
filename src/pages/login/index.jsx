import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/AuthContext';
import image from './assets/imagem-esquerda.svg';
import './style.scss';


const notify = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
const success =() => toast.success('Até logo', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();
    const {authLogin, setAuthlogin, goodbye, setGoodbye} = useContext(AuthContext);

    if(authLogin){
        history.push('/home');
    }
    useEffect(()=>{
        if(goodbye){
            success();
            setGoodbye(false);
        }
    }, [goodbye])
    async function handleLogin(){
        if(!email || !senha) {
            return;
        }
        try {
            const response = await fetch('https://cubos-api-contacts.herokuapp.com/login',{
                method: 'POST',
                body:JSON.stringify({
                    "email": email,
                    "senha": senha
                }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            if(response.status === 200){
                setAuthlogin(data.token);
                history.push("/home");
            }
            else{
                notify(data);
                return;
            }
        } catch (error) {
            console.log(error.message);
            notify(error.message);
        }       
    }

    return(
        <div className='masterLogin'>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />

            <div style={{backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover', width: '50%'}} />
            <div className='login'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <span>Bem vindo</span>
                    <h1>Faça o login com sua conta</h1>
                    <input 
                    id='email' 
                    type="text" 
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    />                   
                    <input 
                    id='password' 
                    type="text" 
                    placeholder='Senha'
                    onChange={e => setSenha(e.target.value)}
                    value={senha}
                    />
                    <button  className='button' onClick={handleLogin}>login</button>
                </form>
                <div 
                className='register-link'
                style={{marginTop: '60px'}}
                >
                    <span style={{marginRight: '20px'}}>Não tem cadastro?</span>
                    <Link to="/cadastro">Clique aqui</Link>
                </div>
            </div>
        </div>
    );

};