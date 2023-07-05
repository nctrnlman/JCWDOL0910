import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function Carousel() {
  const slides = [
    {
      url: "https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-shoes-bags/subhome-xmedia-23//w/1920/IMAGE-landscape-default-fill-238b74a2-da3c-44c1-9d7f-7be52dd904a8-default_0.jpg?ts=1685992924605",
    },
    {
      url: "https://e1.pxfuel.com/desktop-wallpaper/512/823/desktop-wallpaper-lifestlye-of-a-minimalist-clothes-aesthetic-minimalist.jpg",
    },
    {
      url: "https://i5.walmartimages.com/asr/339db0e6-8bba-469f-ba4b-5f4ae6726aed.8515c769b7a7cf27d28dd5f1782a2a5f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff",
    },
    {
      url: "https://www.stirpad.com/images/news/230104040835_n.jpg",
    },
    {
      url: "https://www.usinenouvelle.com/mediatheque/1/7/5/001410571_illustration_large.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div
      className="hero min-h-screen mt-16 mb-5"
      style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
      <div className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex justify-center absolute bottom-4 w-full">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${
              slideIndex === currentIndex ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
