import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const DoctorForm = ({ addOrUpdateDoctor }) => {
  const [doctor, setDoctor] = useState({
    img: '',
    name: '',
    specialties: '',
    inTime: '',
    outTime: '',
    days: '',
  });

  const cropperRef = useRef(null);  // Create a reference to the cropper instance

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDoctor = { ...doctor, days: doctor.days.split(',').map(day => day.trim()) };
    addOrUpdateDoctor(formattedDoctor);
    setDoctor({ img: '', name: '', specialties: '', inTime: '', outTime: '', days: '' });
  };

  const isFormValid = () => {
    const { img, name, specialties, inTime, outTime, days } = doctor;
    return img && name && specialties && inTime && outTime && days;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Image Upload</label>
        <input
          type="file"
          className="form-control"
          name="img"
          onChange={handleFileChange}
          accept="image/*"
        />
        {doctor.img && (
          <>
            <Cropper
              src={doctor.img}
              ref={cropperRef}
              style={{ width: '100%', height: 400 }}
              aspectRatio={1}
              guides={false}
            />
            <button type="button" onClick={handleCrop} className="btn btn-primary mt-3">Crop Image</button>
          </>
        )}
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={doctor.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Specialties</label>
        <input
          type="text"
          className="form-control"
          name="specialties"
          value={doctor.specialties}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>In Time</label>
        <input
          type="time"
          className="form-control"
          name="inTime"
          value={doctor.inTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Out Time</label>
        <input
          type="time"
          className="form-control"
          name="outTime"
          value={doctor.outTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Available Days (comma-separated)</label>
        <input
          type="text"
          className="form-control"
          name="days"
          value={doctor.days}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3" disabled={!isFormValid()}>Save</button>
    </form>
  );
};

export default DoctorForm;
