import React from 'react';
import Gallery from '../Common/ImageGallery/ImageGallery';
import './Car.css';


const Car = (props) => (
  props.car
  ? (
      <div>
        Build: 
        Dealer:
        Heading: {props.car.heading}
        vin: {props.car.vin}
        price: {props.car.price}
        {props.car.media['photo_links']
          ? <Gallery images={props.car.media['photo_links']} />
          : null
        }    
      </div> 
    )
    : null 
);
  

export default Car;