import React from 'react';
import '../CSS/Location.css';
import Maulilogo from '../assets/Images/hos1.jpeg';
import map from '../assets/Images/map1.jpeg'

const Locations = () => {
  const locations = [
    {
      id: 1,
      name: 'City, Beed',
      address: 'Jadhav Hospital kada',
      image: Maulilogo
    },
    // {
    //   id: 2,
    //   name: 'Nagar Road, Pune',
    //   address: 'Near Hermes Heritage, Nagar Rd, Shastrinagar, Yerawada, Pune - 411006',
    //   image: Maulilogo
    // },
    // {
    //   id: 3,
    //   name: 'Hadapsar, Pune',
    //   address: 'S. No. 163, Bhosale Garden Rd, Bhosale Nagar,Hadapsar, Pune - 411028',
    //   image: Maulilogo
    // },
    // {
    //   id: 4,
    //   name: 'Hadapsar Annexe',
    //   address: '163A/1A/7, First Floor, 163A/1A/6, Near, Bhosale Garden Rd, Pune - 411028',
    //   image:Maulilogo
    // }
  ];

  return (
    <section className="locations">
      <div className="locations-container">
        <h2>Our Location</h2>
        <p>Mauli Hospitals is the Best realtion chain of hospitals in Maharashtra</p>

        <div className="locations-grid">
          {locations.map((location) => (
            <div key={location.id} className="location-card">
              <div className="location-image">
                <img src={location.image} alt={location.name} />
              </div>
              <div className="location-content">
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <div className="location-buttons">
                  <button className="map-btn">
                  <img src={map} alt="Mauli Hospital" />
                  </button>
                  <button className="facilities-btn">View Facilities</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="navigation-arrows">
          <button className="nav-arrow prev">‹</button>
          <button className="nav-arrow next">›</button>
        </div>
      </div>
    </section>
    
  );
};

export default Locations; 