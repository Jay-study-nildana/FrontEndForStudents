//QuickKeenSliderDemo
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"
import "../../css/keensliderdemo1.css";

let imagesMap = new Map();
imagesMap.set(1,"https://images.unsplash.com/photo-1590004953392-5aba2e72269a");
imagesMap.set(2,"https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a");
imagesMap.set(3,"https://images.unsplash.com/photo-1590004987778-bece5c9adab6");
imagesMap.set(4,"https://images.unsplash.com/photo-1590005176489-db2e714711fc");

// const images = [
//   ['1','https://images.unsplash.com/photo-1590004953392-5aba2e72269a'],
//   ['2','https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a'],
//   ['3','https://images.unsplash.com/photo-1590004987778-bece5c9adab6'],
//   ['4','https://images.unsplash.com/photo-1590005176489-db2e714711fc'],
// ];

const images = [
    'https://images.unsplash.com/photo-1590004953392-5aba2e72269a',
    'https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a',
    'https://images.unsplash.com/photo-1590004987778-bece5c9adab6',
    'https://images.unsplash.com/photo-1590005176489-db2e714711fc',
  ];

// @ts-ignore
const QuickKeenSliderDemo = (props) => {
    const [details, setDetails] = React.useState(null)

    const [sliderRef] = useKeenSlider({
      loop: true,
      slides: images.length,
      move(s) {
          // @ts-ignore
        setDetails(s.details())
      },
      initial: 2,
    })
  // @ts-ignore
    function positionStyle(idx) {
      if (!details) return {}
      // @ts-ignore
      const position = details.positions[idx]
      // @ts-ignore
      const x = details.widthOrHeight * position.distance
      const scale_size = 0.7
      const scale = 1 - (scale_size - scale_size * position.portion)
      return {
        transform: `translate3d(${x}px, 0px, 0px) scale(${scale})`,
        WebkitTransform: `translate3d(${x}px, 0px, 0px) scale(${scale})`,
      }
    }
  
    return (
        // @ts-ignore
      <div ref={sliderRef} className="keen-slider zoom-out">
        {images.map((src, idx) => (
          <div
            key={idx}
            style={positionStyle(idx)}
            className="keen-slider__slide zoom-out__slide"
          >
            <img src={src} />
          </div>
        ))}
      </div>
    )
}

export default QuickKeenSliderDemo;
