import React, { useEffect, useState } from "react";
import "../DoctorCSS/DoctorInfo.css";
import img1 from '../assets/img/doc1.jpg'
import img2 from '../assets/img/doc2.jpg'
import img3 from '../assets/img/doc3.jpg'
import img4 from '../assets/img/doc4.jpg'

const DummyDoctorsData = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dummy doctor data
    const dummyDoctors = [
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
            status: "ENABLED",
        },
        {
            id: 3,
            name: "Dr. Robert Brown",
            specialties: "Pediatrician",
            img: img3,
            experience: "12 years",
            location: "Chicago, USA",
            status: "ENABLED",
        }, ,
        {
            id: 4,
            name: "Dr. Robert Brown",
            specialties: "Pediatrician",
            img: img4,
            experience: "12 years",
            location: "Chicago, USA",
            status: "ENABLED",
        }
    ];

    useEffect(() => {
        setDoctors(dummyDoctors);
    }, []);

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
        <div className="enabled-doctor-view">
            <div className="enabled-doctor-card-list">
                <div className="enabled-doctor-header">
                    <h1>Our Doctors</h1>
                    <p style={{ fontFamily: "ui-rounded", fontWeight: "bold" }} className="mb-0">Meet our team of highly skilled and compassionate doctors, specializing in diverse fields to provide you with personalized and exceptional care.</p>
                </div>
                <div className="imagescard mt-4">
                    <div className="enabled-doctor-list-container">
                        {doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <div className="enabled-doctor-list-item" key={doctor.id}>
                                    <div className="enabled-doctor-list-item-card">
                                        <img
                                            src={doctor.img}
                                            className="card-img-top"
                                            alt={doctor.name}
                                        />
                                        <div className="enabled-doctor-card-body">
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
                            ))
                        ) : (
                            <p className="text-center">Doctors are not Available.</p>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedDoctor && (
                <div
                    id="modal-overlay"
                    className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"
                    style={{ zIndex: "1050" }}
                >
                    <div
                        id="modal-content"
                        className="modal-content bg-white rounded-3 p-4 position-relative"
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
                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
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