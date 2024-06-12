import React, { useState } from "react";

const ImageCarousel = ({ img }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? img.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === img.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <button
        onClick={goToPrevious}
        className="absolute left-0 p-2 bg-gray-800 text-white"
      >
        &#8592;
      </button>
      <img
        src={img[currentIndex]}
        alt={`carousel-${currentIndex}`}
        className="w-full h-full object-cover"
      />
      <button
        onClick={goToNext}
        className="absolute right-0 p-2 bg-gray-800 text-white"
      >
        &#8594;
      </button>
    </div>
  );
};

export default ImageCarousel;
