export default function Card(props) {
  const film = props.film;
  const ratingClass = film.rating.kp>8 ? 'rating + goodRating' : 'rating + normRating';
  function openModal(film){
    // console.log(name)
    props.setToggleModal(true);
    props.setDataModal(film)

}
  return (
    <div >
      <div className="card" onClick={()=>openModal(film)}>
        <div className='card_poster'>
        <div className={ratingClass} > {film.rating.kp.toFixed(1)}
 </div>
        <img src={film.poster.url} alt="poster" className="card_poster_img" />
        </div>
        <div className="card__data">
          <div className="card__title">{film.name}
          </div>
          <div>
            {film.alternativeName}
            {film.alternativeName !== null && <span>, </span>}
            {film.year}
          </div>
          <div>{film.shortDescription}</div>
        </div>
      </div>
  
    </div>
  );
}
