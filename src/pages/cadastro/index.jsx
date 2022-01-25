import { useState, useContext } from 'react';
import { Link, useHistory} from 'react-router-dom';
import './style.scss';
import image from './assets/imagem-direita.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });


export default function Cadastro(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleRegister(){
        if(!email || !senha || !nome) {
            return;
        }
        try {
            const response = await fetch('https://cubos-api-contacts.herokuapp.com/usuarios',{
                method: 'POST',
                body:JSON.stringify({
                    "nome": nome,
                    "email": email,
                    "senha": senha
                }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data)
            if(response.status === 200){
                history.push('/login');
            }else{
                notify(data)
            }

        } catch (error) {
            console.log(error.message);   
        }       
    }
    function handleCancelar(){
        history.push('/login')
    }

    return(
        <div className='master-registro'>
            <div style={{backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover', width: '50%'}} />
            <div className='registro'>
                <form onSubmit={e => e.preventDefault()}>
                    <h2>Cadastre-se</h2>
                    <input 
                    id='nome' 
                    type="text" 
                    placeholder='Nome'
                    onChange={e => setNome(e.target.value)}
                    value={nome}
                    />                   
                    <input 
                    id='email' 
                    type="email" 
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    />                   
                    <input 
                    id='password' 
                    type="password" 
                    placeholder='Senha'
                    onChange={e => setSenha(e.target.value)}
                    value={senha}
                    />
                    <button className='btn btn-confirm' onClick={handleRegister}>registrar</button>
                    <button className='btn btn-cancel' onClick={handleCancelar}>cancelar</button>
                    
                </form>
                <div 
                className='login-link'
                style={{marginTop: '60px'}}
                >
                    <span style={{marginRight: '20px'}}>Já tem cadastro?</span>
                    <Link to="/login">Clique aqui</Link>
                </div>
            </div>
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
        </div>
    );

};