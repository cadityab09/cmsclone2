import React, { useState, useRef, useEffect } from 'react';
import '../CSS/PatientExperience.css';
import video1 from '../assets/Videos/video1.mp4';
import video2 from '../assets/Videos/video2.mp4';
import video3 from '../assets/Videos/video3.mp4';
// import video4 from '../assets/Videos/video4.mp4';
// import video5 from '../assets/Videos/video5.mp4';

const PatientExperience = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const videoRef = useRef(null);

  const videos = [ video3,video1, video2,];

  const testimonials = [
    {
      id: 1,
      name: 'Shyam Singhal',
      content: 'बीड सर्वोत्तम रुग्णालयांपैकी एक. येथील कर्मचारी, डेकेअर टीम, डायलिसिस आणि बिलिंग विभाग या सर्वांनी अपवादात्मक सेवा दिली.',
      rating: 5
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      content: 'अत्याधुनिक उपकरणांसह उत्कृष्ट आरोग्य सुविधा. डॉक्टर अत्यंत कुशल आहेत आणि कर्मचारी खूप काळजी घेणारे आहेत.',
      rating: 5
    },
    {
      id: 3,
      name: 'Priya Sharma',
      content: 'माऊली हॉस्पिटलमधील उत्कृष्ट अनुभव. वैद्यकीय पथक व्यावसायिक आहे आणि सुविधा जागतिक दर्जाच्या आहेत.',
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <span key={index} className="star">⭐</span>
    ));
  };

  const handleVideoEnd = () => {
    setActiveVideoIndex((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="patient-experience">
      <div className="experience-container">
        <div className="video-section">
          <h2>Our Mauli Hospital</h2>
          <p>Hear directly from those we've treated at Mauli Hospitals</p>
          
          <div className="video-container">
          <video 
              src={videos[activeVideoIndex]} 
              autoPlay 
              ref={videoRef}
              // loop 
              muted 
              controls 
              className="patient-video"
              onEnded={handleVideoEnd}
              // onEnded={() => setActiveVideoIndex((prev) => (prev + 1) % videos.length)}
            >
              Your browser does not support the video tag.
            </video>

            <div className="video-navigation">
              <button className="nav-btn prev" onClick={() => setActiveVideoIndex((prev) => prev > 0 ? prev - 1 : videos.length - 1)}>❮</button>
              <div className="video-dots">
                {videos.map((_, index) => (
                  <button 
                    key={index}
                    className={`dot ${activeVideoIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveVideoIndex(index)}
                  />
                ))}
              </div>
              <button className="nav-btn next" onClick={() => setActiveVideoIndex((prev) => (prev + 1) % videos.length)}>❯</button>
            </div>
          </div>
        </div>

        <div className="testimonials-section">
          <h2>Patient Speaks</h2>
          <p>आमच्या रुग्णांकडून आशा आणि उपचारांच्या खऱ्या कथा</p>
          
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial ${index === activeTestimonialIndex ? 'active' : ''}`}
              >
                <h3>{testimonial.name}</h3>
                <p>{testimonial.content}</p>
                <div className="rating">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
            
            <div className="testimonial-navigation">
              <button className="nav-btn prev" onClick={() => setActiveTestimonialIndex((prev) => prev > 0 ? prev - 1 : testimonials.length - 1)}>❮</button>
              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    className={`dot ${activeTestimonialIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveTestimonialIndex(index)}
                  />
                ))}
              </div>
              <button className="nav-btn next" onClick={() => setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length)}>❯</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientExperience;