import React, { useState } from 'react';
import { Menu } from '../../resources/components';
import './styles.css';
import imgProfile from '../../assets/profile.jpg';
import api from '../../services/api';
import { MyLoading } from '../../resources/components';

export default function Contact(){
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    function sendContact(event){
        event.preventDefault();
        setIsVisibleLoading(true);
        const data = {name,email,message};
        api.post('/sendContact',data)
        .then(response => {
            
            console.log(response);
        })
        .catch(response => {
            
            console.log(response);
        });
    }


    return (
        <div>
            <Menu />
            { isVisibleLoading === true &&
            <div style={{display: 'flex',justifyContent:'center',margin: '2%'}}><MyLoading /></div>
            }

            <div className="body">
                <div className="contact-container">
                    <form onSubmit={sendContact}>
                    <div className="contact-container-header">
                        <div className="contact-container-header-input">
                            <input placeholder="seu nome" onChange={e => setName(e.target.value)} value={name} required/>
                            <input placeholder="seu e-mail" type="email" onChange={e => setEmail(e.target.value)} value={email} required/>
                        </div>
                        <div className="contact-container-header-info">
                            <img src={imgProfile} alt="Meu perfil"/>
                            <p>Preencha os campos abaixo para falar comigo</p>
                            
                        </div>
                    </div>
                    <div className="contact-container-footer">
                        <textarea placeholder="sua mensagem" onChange={e => setMessage(e.target.value)} value={message} required/>
                        <button type="submit">ENVIAR</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}