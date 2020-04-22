import React from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Whoami(){
    return(
    <div>
        <div className="menu">
        <ul>
        <li><Link className="link" to="/">INÍCIO</Link></li>
        <li><Link className="link" to="/">BIBLIOTECA</Link></li>
        <li>
        <div className="profile">
            <p>Blog By Roberto</p>
        </div>
        </li>
        <li><Link className="link" to="/quemsoueu">QUEM SOU EU</Link></li>
        <li><Link className="link" to="/contato">CONTATO</Link></li>
        </ul>
    </div>
    <div className="body">
        <h1>Quem sou eu</h1>
    </div>
  </div>);
}