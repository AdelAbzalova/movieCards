import json from '../kinopoisk.json'
import Card from './Card'
import Slider from './Slider'
import React from 'react'
import Modal from './Modal'
export default function Main(){
    const films=json['docs']
    console.log(films)
    const [toggleModal, setToggleModal]=React.useState(false);
    const [dataModal, setDataModal]=React.useState(0);
    const movieCard=films.map( (film) =>(
         <Card film={film} key={film.id} setToggleModal={setToggleModal} setDataModal={setDataModal} dataModal={dataModal}/>

    ))

    return (
        <div>

                        
                <div className="main-wrapper">
   
                <div className='main-container'>
        <div className="main-slider"><Slider films={films} setToggleModal={setToggleModal} setDataModal={setDataModal}/></div> 
        <div className="main-cards"
        >

            {movieCard}
{console.log(toggleModal, dataModal)}
            </div>
            </div>
            {toggleModal&& <Modal className='main-modal' setToggleModal={setToggleModal} dataModal={dataModal}/>}
            </div>

        </div>
    )
}