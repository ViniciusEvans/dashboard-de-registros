import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../components/modal';
import ModalExcluir from '../../components/modalExcluir';
import AuthContext from '../../context/AuthContext';
import lapis from './assets/lapis.svg';
import lixeira from './assets/lixeira.svg';
import vector from './assets/Vector.svg';
import './style.scss';



export default function Dashboard(){
    const {authLogin, remove, setGoodbye} = useContext(AuthContext);
    const [contatos, setContatos] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [inputs, setInputs] = useState({
        email: '',
        telefone: '',
        nome: ''
    });

    const error = async (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    useEffect(()=>{
        handleListar()
    }, []);
    async function handleListar(){
        try {
            const response = await fetch('https://cubos-api-contacts.herokuapp.com/contatos',{
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authLogin}`
                }
            });
            const data = await response.json();
            setContatos([...data]);
            if(response.status !== 200){
                error(data);
                remove();
            }
        } catch (error) {
            console.log(error.message);
            error(error.message);
        }       
    }

    function handleSair(){
        remove();
        setGoodbye(true);
    }

    async function handleEditar(e){
        const data = contatos.filter((c) => String(c.id) === e.target.parentElement.id);
        const novosInputs = {
            email: data[0].email,
            telefone: data[0].telefone,
            nome: data[0].nome
        };
        setId(e.target.parentElement.id)
        setInputs(novosInputs)
        setModal(true); 
        setTitle('Editar contato');
}

    return(
        <div className='dashboard'>
            <header>
                <h1>KONTACTS</h1>
                <button 
                className='btn-out' 
                onClick={() => handleSair()}
                >
                <img 
                src={vector} 
                alt="sair dashboard" 
                />
                </button>
            </header>
            <div className="main-section">
                <button className='add-btn' onClick={() => {setModal(true); setTitle('Novo contato')}} >Adicionar</button>
                {modal && <Modal setModal={setModal} handleListar={handleListar} title={title} inputs={inputs} setInputs={setInputs} id={id} contatos={contatos} />}
                {modalExcluir && <ModalExcluir setModalExcluir={setModalExcluir} handleListar={handleListar} id={id} />}
                <div className='table'>
                    <div className="table-head">
                        <span>Nome</span>
                        <span>Email</span>
                        <span>Telefone</span>
                    </div>
                    <div className="table-body" key='1002'>
                        {contatos.map(function (contato){
                            return(
                            <div className="table-row" >
                                <span>{contato.nome}</span>
                                <span>{contato.email}</span>
                                <span>{contato.telefone}</span>
                                <div className='btn-edit-delete' id={contato.id}>
                                    <img src={lapis} alt="editar" onClick={(e) => handleEditar(e)} />
                                    <img src={lixeira} alt="excluir" onClick={(e) => {
                                        setModalExcluir(true)
                                        setId(e.target.parentElement.id)
                                        }} />
                                </div>
                            </div>
                            );
                        })}
                    </div>
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
        
    )

}