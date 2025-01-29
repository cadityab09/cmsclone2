import React, { useState, useEffect } from 'react';
import '../CSS/Hero.css';
import { useNavigate } from 'react-router-dom';
import hos1 from '../assets/Images/hos9.jpg';
import hos2 from '../assets/Images/hos8.jpeg';
import hos3 from '../assets/Images/hos10.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const heroImages = [
    {
      id: 1,
      src: hos1,
      alt: 'Hospital Service 1',
    },
    {
      id: 2,
      src: hos2,
      alt: 'Hospital Service 2',
    },
    {
      id: 3,
      src: hos3,
      alt: 'Hospital Service 3',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === heroImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === heroImages.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? heroImages.length - 1 : currentSlide - 1);
  };

  return (
    <section className="hero">
      <div className="hero-slider">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={image.src} alt={image.alt} />
            <div className="hero-content container">
              <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <button
                    className="hero-cta btn btn-lg"
                    onClick={() => navigate('/appointment')}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-btn prev" onClick={prevSlide}>
        &#8249;
      </button>
      <button className="slider-btn next" onClick={nextSlide}>
        &#8250;
      </button>

      <div className="slider-dots">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
