import React from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import sertao from '../../assets/sertao.jpg';
import { AiFillLike } from "react-icons/ai";

export default function Home(){
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
        <div className="post">
            <div className="post-header">
                <img src={profile} />
                <h3>Título da postagem</h3>
            </div>
            <div className="post-body">
                <p>Texto da postagemTexto da postagemTexto da postagemTexto da postagemTexto da postagemTexto da postagemTexto da postagemTexto da postagemTexto da postagemTexto da postagem</p>
            </div>
            <div className="post-footer">
            <section><AiFillLike color="#00ffff" size={20}/><p>2 pessoas curtiram isso</p></section>
            <p>Postado em 24/04/2020</p>
            </div>
        </div>

    </div>
  </div>
        );
};