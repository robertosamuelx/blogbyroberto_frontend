import React from 'react';
import Modal from 'react-modal';

const MyModal = ({isOpen, onRequestClose, style, contentLabel}) => (
    <Modal isOpen={isOpen} style={style} onRequestClose={onRequestClose} contentLabel={contentLabel}/>
);

export default MyModal;