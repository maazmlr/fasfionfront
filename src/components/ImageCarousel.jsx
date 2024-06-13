import React, { useState } from "react";

const ImageCarousel = ({ img, captions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? img?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === img?.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full  h-64 flex items-center justify-center overflow-hidden">
      <div
        className="w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {img?.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`carousel-${index}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
      {captions && captions[currentIndex] && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-2 rounded">
          {captions[currentIndex]}
        </div>
      )}
      <button
        onClick={goToPrevious}
        className="absolute left-0 p-3 m-2 bg-transparent h-full bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition duration-300"
      >
      </button>
      <button
        onClick={goToNext}
        className="absolute  right-0 p-3 m-2 h-full bg-transparent bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition duration-300"
      >
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {img?.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
