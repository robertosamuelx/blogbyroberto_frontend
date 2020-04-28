import React from 'react';
import Routes from './routes';
import './global.css';
import praia from '../src/assets/praia.jpg';
import praia2 from '../src/assets/praia2.jpg';
import praia3 from '../src/assets/praia3.jpg';
import praia4 from '../src/assets/praia4.jpg';

export default function App () {

  return (
    
    <div className="container">
      <div className="header">
        <img src={praia} alt="praias em fortaleza"/>
        <img src={praia2} alt="praias em fortaleza"/>
        <img src={praia3} alt="praias em fortaleza"/>
        <img src={praia4} alt="praias em fortaleza"/>
      </div>
   
        <Routes />
    </div>
  );
};