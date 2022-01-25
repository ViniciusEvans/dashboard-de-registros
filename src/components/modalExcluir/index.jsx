import './style.scss'
import close from './assets/close-btn.svg'
import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';


function ModalExcluir({handleListar, setModalExcluir, id}){
    const {authLogin} = useContext(AuthContext);


    async function handleDeletar(evt){
        try {
            const response = await fetch('https://cubos-api-contacts.herokuapp.com/contatos/' + id, {
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authLogin}`
                }
            });
            handleListar();
            setModalExcluir(false)
        } catch (error) {
            console.log(error.message)
        }
    }
return ( 
    <div className="modal-excluir">
        <div className="card-modal">
            <div>
                <img src={close} alt="close" onClick={() => setModalExcluir(false)} />
                <h2>Excluir contato?</h2>    
                <button className='btn-one' onClick={handleDeletar}>Excluir</button>
                <button className='btn-two' onClick={() => setModalExcluir(false)} >cancelar</button>
            </div>
        </div>
    </div>
 );
}

export default ModalExcluir;