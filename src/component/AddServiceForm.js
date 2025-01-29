import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ServiceForm = ({ addOrUpdateService }) => {
  const [service, setService] = useState({
    id: Date.now(),
    title: '',
    description: '',
    icon: '',
    link: '#',
    img: '',
  });

  const cropperRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setService({ ...service, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();
      setService({ ...service, img: croppedImage });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (service.title && service.description && service.img) {
      addOrUpdateService(service);
      setService({
        id: Date.now(),
        title: '',
        description: '',
        icon: '',
        link: '#',
        img: '',
      });
    }
  };

  const isFormValid = () => {
    const { title, description, img } = service;
    return title && description && img;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Service Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={service.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Service Description</label>
        <textarea
          className="form-control"
          name="description"
          value={service.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Service Image</label>
        <input
          type="file"
          className="form-control"
          name="img"
          onChange={handleFileChange}
          accept="image/*"
        />
        {service.img && (
          <>
            <div className="mt-3">
              <Cropper
                src={service.img}
                ref={cropperRef}
                style={{ width: '100%', height: 400 }}
                aspectRatio={1}
                guides={false}
              />
            </div>
            <button type="button" onClick={handleCrop} className="btn btn-primary mt-3">
              Crop Image
            </button>
          </>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={!isFormValid()}
      >
        Save Service
      </button>
    </form>
  );
};

export default ServiceForm;
