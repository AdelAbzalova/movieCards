import React, { useState } from 'react';

export default function Slider(props){
  const [startIdx, setStartIdx] = useState(0);

  const totalImages = props.films.length;
  const imagesPerPage = 6;
console.log(totalImages)
//   const images = Array.from({ length: totalImages }, (_, index) => index + 1);
const images=[...Array(totalImages).keys()]
  const handleClickNext = () => {
    setStartIdx(startIdx + 1);
    
  };

  const handleClickPrev = () => {
    setStartIdx(startIdx - 1);
    // console.log(startIdx)
  };
  function openModal(film){
    // console.log(name)
    props.setToggleModal(true);
    props.setDataModal(film);
}

  return (
    <div className="slider-container">
      {startIdx >= 1 ? (
      
        <button className="prev-button" onClick={handleClickPrev}> {`<`} </button>

      ) :         <button className="prev-button" onClick={handleClickPrev} hidden> {`<`} </button>} 
      
      <div className="slider-images">
      {/* <div className={ratingClass} > {props.films[imageIndex].rating.kp.toFixed(1)}
 </div> */}
        {images.slice(startIdx, startIdx + imagesPerPage).map((imageIndex) => (
          <img
            key={props.films[imageIndex].id}
            className="slider-image"
            // src={`path/to/images/${image}.jpg`}
            src={props.films[imageIndex].poster.url}
            alt={props.films[imageIndex].name}
            onClick={()=>openModal(props.films[imageIndex])}

          />
        ))}

      </div>
      
      {startIdx + imagesPerPage < totalImages && (
        <button className="next-button" onClick={handleClickNext}> {'>'} </button>
      )}
    </div>
  );
};


