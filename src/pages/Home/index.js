import React from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import sertao from '../../assets/sertao.jpg';

export default function Home(){
    return( 
    <div>
        <div className="menu">
        <ul>
        <li><Link className="link" to="/">INÍCIO</Link></li>
        <li><Link className="link" to="/">BIBLIOTECA</Link></li>
        <li>
            <p>Blog By Roberto</p>
        </li>
        <li><Link className="link" to="/quemsoueu">QUEM SOU EU</Link></li>
        <li><Link className="link" to="/contato">CONTATO</Link></li>
        </ul>
    </div>
    <div className="body">
        <h1>Home</h1>
    </div>
  </div>
        );
};