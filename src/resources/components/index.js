import React from 'react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { format } from '../functions';
import {FaPowerOff} from 'react-icons/fa';

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
                {localStorage.getItem('id') == null &&
                <p>Blog By Roberto</p>
                }
                {localStorage.getItem('id') != null &&
                    <FaPowerOff color="#ffffff" size={22} onClick={()=>{localStorage.removeItem('id')}}/>
                }
            </li>
            <li><Link className="link" to="/quemsoueu">QUEM SOU EU</Link></li>
            <li><Link className="link" to="/contato">CONTATO</Link></li>
            </ul>
        </div>
    );
}

const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      boxShadow: '0px 0px 5px black',
      backgroundColor: 'lavenderblush',
      width: '20%',
      height: '10%',
      borderRadius: '10px',
      color: 'black',
      fontFamily: 'Quantico',
      display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  };

export const MyModal = ({isOpen, onRequestClose, contentLabel}) => (
    <Modal isOpen={isOpen} style={modalStyles}  onRequestClose={onRequestClose}>{contentLabel}</Modal>
);

export const DateFormat = ({date}) => (
    <i>{format(date)}</i>
);