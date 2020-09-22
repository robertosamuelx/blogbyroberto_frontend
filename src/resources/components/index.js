import React from 'react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { formatDate } from '../functions';
import {FaPowerOff} from 'react-icons/fa';
import { AiOutlineFile } from 'react-icons/ai';
import { GrDocumentPdf, GrDocumentWord, GrDocumentExcel } from 'react-icons/gr';

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
                    <p><Link to="/admin">Blog By Roberto</Link></p>
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
    <i>{formatDate(date)}</i>
);

const iconImgStyle = {
    width: '50px',
    height: '50px',
    border: 'solid 1px #2b2727'
};

export function FileIcon ({file}) {
    const type = String(file.fileName);
    const color = "#000000";
    const size =  50  ;

    if(type.endsWith('.pdf'))
        return <GrDocumentPdf color={color} size={size}/>
    else if(type.endsWith('.doc') || type.endsWith('.docx'))
        return <GrDocumentWord color={color} size={size}/>
    else if(type.endsWith('.xls') || type.endsWith('.xlsx'))
        return <GrDocumentExcel color={color} size={size}/>
    else if(type.endsWith('.jpeg') || type.endsWith('.jpg'))
        return <img src={file.url} style={iconImgStyle}/>
    else {
        return <AiOutlineFile color={color} size={size} />
    }
};