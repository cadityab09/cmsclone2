import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import "../DoctorCSS/AddDoctorForm.css"
import AppServices from '../services/AppServices';

const DoctorForm = ({ refreshDoctors }) => {
  const [doctor, setDoctor] = useState({
    img: '',
    name: '',
    specialties: '',
    inTime: '',
    outTime: '',
    days: '',
    status: 'ENABLED'
  });


  const cropperRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDoctor({ ...doctor, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();
      setDoctor({ ...doctor, img: croppedImage });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split the days into a list
    const formattedDoctor = {
      ...doctor,
      days: doctor.days.split(',').map((day) => day.trim()),
    };

    try {
      const response = await fetch(AppServices.getUrl()+'/doctors', {
        method: 'POST',
        headers: AppServices.getHeaders(),
        body: JSON.stringify(formattedDoctor),
      });

      if (response.ok) {
        alert('Doctor saved successfully');
        setDoctor({ img: '', name: '', specialties: '', inTime: '', outTime: '', days: '' });

        // Call the refreshDoctors function to refresh the doctor list
        // refreshDoctors();
      } else {
        alert('Failed to save doctor');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the doctor');
    }
  };

  const isFormValid = () => {
    const { img, name, specialties, inTime, outTime, days } = doctor;
    return img && name && specialties && inTime && outTime && days;
  };

  return (
    <div className='add-doctor-container'>
      <form onSubmit={handleSubmit} className='add-doctor-form'>
        <div className="form-group add-doctor-form-content image-upload">
          <label className='add-doctor-form-label'>
            <span>Image Upload</span>
            <input
              type="file"
              className="form-control add-doctor-form-input"
              name="img"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          {doctor.img && (
            <div className='cropper-container'>
              <Cropper
                src={doctor.img}
                ref={cropperRef}
                aspectRatio={1}
                guides={false}
                className='add-doctor-cropper'
              />
              <button type="button" onClick={handleCrop} className="btn btn-primary mt-3">Crop Image</button>
            </div>
          )}
        </div>
        <div className="form-group add-doctor-form-content">
          <label>
            <span>Name</span>
            <input
              type="text"
              className="form-control"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Specialties</span>
            <input
              type="text"
              className="form-control"
              name="specialties"
              value={doctor.specialties}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">

        </div>
        <div className="form-group add-doctor-form-content">
          <label>
            <span>In Time</span>
            <input
              type="time"
              className="form-control"
              name="inTime"
              value={doctor.inTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Out Time</span>
            <input
              type="time"
              className="form-control"
              name="outTime"
              value={doctor.outTime}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">

        </div>
        <div className="form-group add-doctor-form-content">
          <label>
            <span>Available Days</span>
            <input
              type="text"
              className="form-control"
              name="days"
              value={doctor.days}
              onChange={handleChange}
              required
            />
          </label>
          <label>
          Status:
          <select 
            name='status'
            value={doctor.doctorStatus}
            className=""
            onChange={handleChange}
            required>
            <option value="">Select Status</option>
            <option value="ENABLED">Active</option>
            <option value="DISABLED">Inactive</option>
          </select>
        </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={!isFormValid()}>Save</button>
      </form>
    </div>
  );
};

export default DoctorForm;
