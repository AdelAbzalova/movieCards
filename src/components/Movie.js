import React from 'react'
import okko_logo from '../assets/okko_logo.png'
import ivi_logo from '../assets/ivi_logo.png'
import kion_logo from '../assets/kion_logo.png'


export default function Movie(props){
    const film=props.film;
    const ratingKP = film.rating.kp>8 ? 'movie-goodMovie' : 'movie-normMovie';
    const ratingIMDB=film.rating.imdb>8 ? 'movie-goodMovie' : 'movie-normMovie';
    const [okko, setOkko]=React.useState();
    const [ivi, setIvi]=React.useState();
    const [kion, setKion]=React.useState();
    // let movieLogo='movie_logo'
    React.useEffect(() => {
        if(film.watchability.items!==null){
        for(let item of film.watchability.items){
            if(item.name==='Okko'){
                setOkko(item.url);
            }
            if(item.name==='Иви'){
                setIvi(item.url);
            }
            if(item.name==='KION'){
                setKion(item.url);
            }
        }
    }
        console.log('list', okko, ivi, kion)
      },[film.watchability.items,ivi, kion, okko]);

    function openCinema(cinema){
        window.location.href= cinema
        // movieLogo='movie_logo movie-logo_clicked'
    }
    // function changeLogo(){
    //     movieLogo='movie_logo movie-logo_clicked'
    //     console.log('changeLogo')
    // }


return (
    <div>
        <div className='movie-wrapper'>
            <div >
                <img src={film.poster.previewUrl} alt={film.name} className="movie-poster"/> 
                <div className='movie-rating'>
    <span className={ratingKP}>{film.rating.kp.toFixed(1)}</span> KP <span className={ratingIMDB}>{film.rating.imdb.toFixed(1)}</span> IMDB
    </div>
    </div>
  <div className='movie-description'>

  <h1 className='movie-header'>
    {film.name}

  </h1>

       <h4>{film.alternativeName} 
       {film.alternativeName !== null && <span>, </span>}
       {film.year}</h4>
       {/* <div className='movie-rating'>
    <span className={ratingKP}>{film.rating.kp.toFixed(1)}</span> KP <span className={ratingIMDB}>{film.rating.imdb.toFixed(1)}</span> IMDB

    </div> */}
       <div><b>Продолжительность:</b> {film.movieLength} минут</div>
<div style={{marginBottom:'15px'}}> <b>Описание: </b>{film.description}</div>
{(okko||ivi||kion)&& <div> 
<hr />
 <h4 className='movie-watch-header'>Смотреть:</h4> 
<div className='movie-cinemas'>

        {okko && <img src={okko_logo} className='movie_logo' onClick={()=> openCinema(okko)} alt='okko_logo'/> }
        {ivi &&  <img src={ivi_logo} className='movie_logo' onClick={()=> openCinema(ivi)} alt='ivi_logo'/> }
        {kion && <img src={kion_logo} className='movie_logo' onClick={()=> openCinema(kion)} alt='kion_logo'/> }
        </div>

  </div>
}
  </div>
  </div>
  


    </div>
)
}