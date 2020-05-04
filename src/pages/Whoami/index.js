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
                        <h1>olá eu sou roberto</h1>
                        <img src={imgProfile} />
                    </div>
                    <p>dsads adsa dsad asdasddsad sadsadsad asdsadsa dsadsdsa dsa dsad sad sad sadasdsadsa sadsadsad sadas sadsa dsadsadsad sadsadsa dsadsads adsdsadd sadasdsd saddsa dsadsa dsadsadsa dasd</p>
                </div>
            </div>
        </div>
    );
}