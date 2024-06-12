import React, { useState } from "react";

const ImageCarousel = ({ img }) => {
  console.log(img);
  const [index, setIndex] = useState(0);
  const length = img?.length;

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };

  return (
    <div>
      <div className="carousel w-full h-72">
        {img?.map((image, i) => (
          <div
            id={`slide${i + 1}`}
            className={`carousel-item relative w-full ${
              i === index ? "active" : ""
            }`}
            key={i}
          >
            <img src={image} className="w-[35rem]" />
          </div>
        ))}
      </div>
      <div className="flex justify-between relative text-3xl  ">
        <button
          className="absolute bottom-40 right-0 text-black"
          onClick={handlePrevious}
        >
          {">"}
        </button>
        <button
          className="absolute bottom-40 left-0 text-black"
          onClick={handleNext}
        >
          {" "}
          {"<"}{" "}
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
