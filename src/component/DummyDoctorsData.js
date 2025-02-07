import React, { useState, useRef } from "react";
import "../CSS/DummyDoctors.css"
import img1 from "../assets/img/doc1.jpg";
import img2 from "../assets/img/doc2.jpg";
import img3 from "../assets/img/doc3.jpg";
import img4 from "../assets/img/doc4.jpg";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DummyDoctorsData = () => {
  const [doctors] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      specialties: "Cardiologist",
      img: img1,
      experience: "10 years",
      location: "New York, USA",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialties: "Neurologist",
      img: img2,
      experience: "8 years",
      location: "Los Angeles, USA",
    },
    {
      id: 3,
      name: "Dr. Robert Brown",
      specialties: "Pediatrician",
      img: img3,
      experience: "12 years",
      location: "Chicago, USA",
    },
    {
      id: 4,
      name: "Dr. Alice Johnson",
      specialties: "Dermatologist",
      img: img4,
      experience: "7 years",
      location: "San Francisco, USA",
    },
    {
      id: 5,
      name: "Dr. John Doe",
      specialties: "Cardiologist",
      img: img1,
      experience: "10 years",
      location: "New York, USA",
    },
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="dummy-doctor-view">
      <div className="dummy-doctor-card-list">
        <h1>Our Doctors</h1>
        <p style={{fontFamily: "ui-rounded", fontWeight: "bold"}} className="mb-0">Meet our team of highly skilled and compassionate doctors, specializing in diverse fields to provide you with personalized and exceptional care.</p>

        <div className="dummy-imagescard mt-4">
          {/* Swiper Component */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            // spaceBetween={20}
            // slidesPerView={3}
            loop={true}
            
            autoplay={isModalOpen ? false : { delay: 2000 }} 
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              // when window width is >= 1200px
              1200: {
                slidesPerView: 4, // 4 slides per view on large screens (lg)
              },
              // when window width is >= 992px
              992: {
                slidesPerView: 3, // 3 slides per view on medium screens (md)
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3, // 1 slide per view on small screens (sm)
              },
              // default settings for smaller screens (mobile)
              0: {
                slidesPerView: 1, // 1 slide per view on mobile
              }
            }}
          >
            {doctors.map((doctor) => (
              <SwiperSlide key={doctor.id}>
                <div className="dummy-doctor-list-item">
                  <div className="dummy-doctor-list-item-card">
                    <img
                      src={doctor.img}
                      className="card-img-top"
                      alt={doctor.name}
                    />
                    <div className="dummy-doctor-card-body">
                      <h5 className="card-title">{doctor.name}</h5>
                      <p className="card-text">( {doctor.specialties} )</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewDetails(doctor)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && selectedDoctor && (
        <div
          id="modal-overlay"
          className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"
          style={{ zIndex: "1050" }}
        >
          <div
            id="modal-content"
            className="modal-content bg-white rounded-3 p-4 position-relative dummy-doctor-model-content"
            style={{ maxWidth: "500px" }}
          >
            <button
              id="modal-close-btn"
              className="btn-close position-absolute top-0 end-0 mt-2 me-2"
              aria-label="Close"
              onClick={closeModal}
            ></button>
            <div className="text-center">
              <img
                src={selectedDoctor.img}
                alt={selectedDoctor.name}
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h3>{selectedDoctor.name}</h3>
              {Object.entries(selectedDoctor).map(([key, value]) => {
                if (key === "id" || key === "img" || key === "status") {
                  return null;
                }
                return (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                    {value}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DummyDoctorsData;
