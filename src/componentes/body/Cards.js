import React from 'react'

export default function Cards(props) {
  return (
    <div className='card2'>
        <img src={props.items.image} alt='logo' />
        <div>
            <h5>{props.items.title}</h5>
            <span className='plataforma'>Plataforma <br></br>{props.items.plataforma} <br></br>Precio: {props.items.precio}</span>
            <p>{props.items.descripcion}</p>
            <button type="button" class="btn btn-outline-primary">Comprar</button>
        </div>
      
    </div>
  )
}
