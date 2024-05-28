import React from 'react'
import Cards from './Cards'
import data from './data'
import css from './card.css'

export default function CardList() {
    const cards = data.map(items =>{
      return(
        <Cards key={items.id} items={items}/>
      )
    })
  return (
    <div className='divCards'>
      {cards}
    </div>
  )
}

