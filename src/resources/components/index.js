import React from 'react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { format } from '../functions'

export const MyLoading = ({type='spin',color='#000000'}) => (
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
);

export function Menu(){
    return (
        <div className="menu">
            <ul>
            <li><Link className="link" to="/">INÍCIO</Link></li>
            <li><Link className="link" to="/biblioteca">BIBLIOTECA</Link></li>
            <li className="profile">
                <p>Blog By Roberto</p>
            </li>
            <li><Link className="link" to="/quemsoueu">QUEM SOU EU</Link></li>
            <li><Link className="link" to="/contato">CONTATO</Link></li>
            </ul>
        </div>
    );
}

export const MyModal = ({isOpen, onRequestClose, style, contentLabel}) => (
    <Modal isOpen={isOpen} style={style} onRequestClose={onRequestClose} contentLabel={contentLabel}/>
);

export const DateFormat = ({date}) => (
    <i>{format(date)}</i>
);