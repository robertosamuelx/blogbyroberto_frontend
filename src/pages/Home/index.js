import React from 'react';
import '../../global.css';
import './styles.css';
import praia from '../../assets/praia.jpg';
import profile from '../../assets/profile.jpg';
import sertao from '../../assets/sertao.jpg';

export default function Home(){
    return(
        
        <div className="container">
            <div className="header">
                <img src={praia} alt="praia em fortaleza"/>
            </div>
            <div className="menu">
                <ul>
                    <li>INÍCIO</li>
                    <li>?</li>
                    <li>
                        <div className="profile">
                            <img src={profile} alt="Meu Perfil" />
                            <p>Blog By Roberto</p>
                        </div>
                    </li>
                    <li>QUEM SOU EU</li>
                    <li>CONTATO</li>
                </ul>
            </div>
            <div className="body" >
                <img src={sertao} />
            </div>
        </div>
        
        );
};