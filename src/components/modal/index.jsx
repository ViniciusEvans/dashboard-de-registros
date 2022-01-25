import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import close from './assets/close-btn.svg';
import './style.scss';


function Modal({setModal, id, handleListar, title, inputs, setInputs}) {

    const {authLogin} = useContext(AuthContext);
    
    async function handleAdicionar(){
        if(!inputs.nome || !inputs.telefone || !inputs.email ) return;
        try {
            const response = await fetch('https://cubos-api-contacts.herokuapp.com/contatos',{
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authLogin}`
                }
            });
            const data = await response.json();
            if(response.ok){
                handleLimpar();
                handleListar();
            }
        } catch (error) {
            console.log(error.message);
            error(error.message);
        }       
    }

    async function handleEditar(){
        if(!inputs.nome || !inputs.telefone || !inputs.email ) return;

        try {
            const response = await fetch(' https://cubos-api-contacts.herokuapp.com/contatos/' + id,{
                method: 'PUT',
                body: JSON.stringify(inputs),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authLogin}`
                }
            });
            const data = await response.json();
            if(response.ok){
                setModal(false);
                handleLimpar();
                handleListar();
            }
        } catch (error) {
            console.log(error.message);
            error(error.message);
        }  
        
    }

    function handleLimpar(){
        const limpo = {
            email: '',
            telefone: '',
            nome: ''
        }
        setInputs(limpo);
    }
    return ( 
        <div className="modal">
            <div className="card-modal">
                <form onSubmit={e => e.preventDefault()}>
                    <img src={close} alt="close" onClick={() => setModal(false)} />
                    <h2>{title}</h2>
                    <input
                    type="text" 
                    name="nome" 
                    id="nome" 
                    placeholder='Nome'
                    value={inputs.nome}
                    onChange={e => setInputs({...inputs, nome: e.target.value})}
                    />
                    <input 
                    type="email"
                    name="email" 
                    id="email" 
                    placeholder='Email' 
                    value={inputs.email}
                    onChange={e => setInputs({...inputs, email: e.target.value})}
                    />
                    <input 
                    type="number" 
                    name="telefone" 
                    id="telefone" 
                    placeholder='Telefone' 
                    value={inputs.telefone}
                    onChange={e => setInputs({...inputs, telefone: e.target.value})}
                    />
                    <button className='btn-one' onClick={title === 'Novo contato' ? handleAdicionar : handleEditar}>adicionar</button>
                    <button className='btn-two' onClick={handleLimpar} >limpar</button>
                </form>
            </div>
        </div>
     );
}

export default Modal;