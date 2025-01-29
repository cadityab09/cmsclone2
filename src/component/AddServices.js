import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ServiceForm = ({ addOrUpdateService }) => {
  const [service, setService] = useState({
    id: Date.now(), // Generate a unique ID for the new service
    title: '',
    description: '',
    icon: '', // You can use an icon name or an image for the icon
    link: '#', // Default link
    img: '', // This will hold the base64 string for the image
  });

  const cropperRef = useRef(null); // Reference to the cropper instance

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setService({ ...service, img: reader.result }); // Store the image as base64
      };
      reader.readAsDataURL(file); // Convert the image to a base64 string
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL(); // Get the cropped image as base64
      setService({ ...service, img: croppedImage }); // Update the service image with the cropped one
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (service.title && service.description && service.img) {
      addOrUpdateService(service); // Add or update the service in the parent
      setService({
        id: Date.now(), // Reset ID for next service
        title: '',
        description: '',
        icon: '',
        link: '#',
        img: '', // Reset the image field
      });
    }
  };

  const isFormValid = () => {
    const { title, description, img } = service;
    return title && description && img; // Ensure that the title, description, and image are provided
  };

  return (
   <div className='d-flex justify-content-center align-items-center h-100'>
     <form onSubmit={handleSubmit}>
      {/* Service Title */}
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

      {/* Service Description */}
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

      {/* Service Image Upload */}
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
            {/* Cropper for the uploaded image */}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={!isFormValid()} // Disable the button if the form is not valid
      >
        Save Service
      </button>
    </form>
    </div>
  );
};

export default ServiceForm;
