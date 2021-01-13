import Carousel from 'react-elastic-carousel';
import React from 'react';
import Item from './CarouselItem';

export default function Carousell(props) {
    let data=props.arr;
    let breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 }
    ];
    let images = data.map((curr) => {
        return <div className="item"><Item src={curr} /></div>
    });
    return (
        <div className="carousel" >
            <Carousel breakPoints={breakPoints} >
                {images}
            </Carousel>
        </div>
    );
}
