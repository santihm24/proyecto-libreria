
import React from 'react'

import Footer from './footer/Footer';
import CardList from './body/CardList';
import Header from './header/Header';
import Carrusel from './carrusel/Carrusel';

function Inicio() {
  return (
   <div>
      <Header/>
      <Carrusel/>
      <CardList/>
      <Footer/>

   </div>
     
  );
}

export default Inicio
