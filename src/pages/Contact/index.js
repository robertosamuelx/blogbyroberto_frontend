import React from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Contact(){
    return(
    <div>
        <div className="menu">
        <ul>
        <li><Link className="link" to="/">INÍCIO</Link></li>
        <li><Link className="link" to="/">BIBLIOTECA</Link></li>
        <li className="profile">
            <p>Blog By Roberto</p>
        </li>
        <li><Link className="link" to="/quemsoueu">QUEM SOU EU</Link></li>
        <li><Link className="link" to="/contato">CONTATO</Link></li>
        </ul>
    </div>
    <div className="body">
        <h1>Contato</h1>
    </div>
  </div>);
}