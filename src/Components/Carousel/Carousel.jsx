import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import {img} from './img/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";
const CarouselEffect = () => {
  return (
    <div className="carousel_wrapper">
      <Carousel
        autoPlay={false}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      
      >
        {img.map((imageItemLink) => {
          return (
            <div key={imageItemLink} className="front_img_wrapper">
              <img src={imageItemLink} className="front_img" />
            </div>
          );
        })}
      </Carousel>
      <div className='hero__img'></div>
    </div>
  );
}

export default CarouselEffect