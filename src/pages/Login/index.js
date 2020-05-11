import React, {useState} from 'react';
import { Menu } from '../../resources/components';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { MyLoading, MyModal } from '../../resources/components';
import './styles.css';
import imgSertao from '../../assets/sertao.jpg';

export default function Login(){
    const [login, setLogin] = useState('');
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [labelModal, setLabelModal] = useState('');
    const history = useHistory();

    if(localStorage.getItem('id') != null)
        history.push('/');


    function authenticate(event){
        setIsVisibleLoading(true);
        event.preventDefault();
        const data = {login,password};
        api.post('/login',data)
        .then( response => {
            localStorage.setItem('id',response.data.authorization);
            setLabelModal('Bem-vindo Roberto!');
            setIsVisibleLoading(false);
            setIsVisibleModal(true);
            history.push('/');
            
        }).catch(error => {
            setLabelModal('Login e/ou senha inválidos');
            setIsVisibleLoading(false);
            setIsVisibleModal(true);
        });
    }

    return (
        <div>
            <Menu />
            <MyModal isOpen={isVisibleModal} onRequestClose={() => setIsVisibleModal(false)} contentLabel={labelModal}/>
            { isVisibleLoading === true &&
            <div style={{display: 'flex',justifyContent:'center',margin: '2%'}}><MyLoading /></div>
            }
            <div className="body">
                <div className="login-container">
                    <img src={imgSertao} alt="sertao" />
                    <form onSubmit={authenticate}>
                        <input placeholder="Email" onChange={e => setLogin(e.target.value)} value={login} type="email"/>
                        <input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)} value={password}/>
                        <button type="submit">ENTRAR</button>
                    </form>
                    <img src={imgSertao} alt="sertao" />
                </div>
            </div>
        </div>
    );
}