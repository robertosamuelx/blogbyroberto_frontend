import React from 'react';
import ReactLoading from 'react-loading';

const MyLoading = ({type='spin',color='#000000'}) => (
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
);

export default MyLoading;