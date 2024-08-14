import girls from "../../assets/bracelet-slide.jpg";
import women from "../../assets/women-slider.jpg";
import { useEffect, useState } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [girls];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="carousel lg:h-96 h-56 w-full  relative ">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-item absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            className="w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
