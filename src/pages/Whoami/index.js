import React from 'react';
import { Menu } from '../../resources/components';
import imgProfile from '../../assets/profile.jpg';
import './styles.css';

export default function Whoami(){
    return (
        <div>
            <Menu />
            <div className="body">
                <div className="whoami-container">
                    <div className="whoami-container-header">
                        <h1>Olá eu sou Roberto</h1>
                        <img src={imgProfile} alt="meu perfil"/>
                    </div>
                    <p>Olá eu sou Roberto</p>
                </div>
            </div>
        </div>
    );
}