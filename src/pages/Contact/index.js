import React, { useState } from 'react';
import { Menu } from '../../resources/components';
import './styles.css';
import imgProfile from '../../assets/profile.jpg';
import api from '../../services/api';

export default function Contact(){
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function sendContact(event){
        event.preventDefault();
        const data = {name,email,message};
        api.post('/sendContact',data)
        .then(response => {
            console.log(response.data);
        });
    }

    return (
        <div>
            <Menu />
            <div className="body">
                <div className="contact-container">
                    <form onSubmit={sendContact}>
                    <div className="contact-container-header">
                        <div className="contact-container-header-input">
                            <input placeholder="seu nome" onChange={e => setName(e.target.value)} value={name}/>
                            <input placeholder="seu e-mail" type="email" onChange={e => setEmail(e.target.value)} value={email}/>
                        </div>
                        <div className="contact-container-header-info">
                            <img src={imgProfile} />
                            <p>Preencha os campos abaixo para falar comigo</p>
                            
                        </div>
                    </div>
                    <div className="contact-container-footer">
                        <textarea placeholder="sua mensagem" onChange={e => setMessage(e.target.value)} value={message}/>
                        <button type="submit">ENVIAR</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}