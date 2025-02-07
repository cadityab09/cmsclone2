import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../CSS/EnquiryFormMap.css";

// Styles for the Google Map container
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Default map center coordinates
const center = {
  lat: 19.213904324724332, // San Francisco latitude
  lng: 75.76120355621494, // San Francisco longitude
};

export default function EnquiryFormMap() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDb3RcAVo2eEDVIoOBPFitgyBeFaW6QKH4", // Replace with your API key
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry submitted:", formData);
  };

  if (loadError) {
    return <div className="enquiry-container">Failed to load Google Maps</div>;
  }

  return (
    <div className="enquiry-container">
      {/* Form Section */}
      <div className="enquiry-form-container">
        <h2>Add Enquiry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Map Section */}
      <div className="enquiry-map-container">
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Adding a marker */}
          <Marker
            position={center} // Marker position
            title="This is a marker" // Tooltip when hovered
          />
        </GoogleMap>
      ) : (
        <div>Loading Google Map...</div>
      )}
    </div>

    </div>
  );
}
