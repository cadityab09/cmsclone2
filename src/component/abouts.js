import React from "react";
import img from "../assets/img/about.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/about.css"; // For any additional custom styles

const About = () => {
  return (
    <div className="container min-vh-100 d-flex flex-column flex-lg-row justify-content-between align-items-center py-5">
      <div className="col-12 col-lg-6 mb-4 mb-lg-0">
        <h1 className="about-title mb-4">About Us</h1>
        <p className="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
          labore rerum tempore tenetur commodi natus quos itaque voluptatum
          repudiandae nostrum accusantium vero voluptate aspernatur totam,
          laboriosam aut, et quae consequatur?
        </p>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora quia
          suscipit illum, numquam incidunt nostrum dolor officia doloremque
          cupiditate, placeat explicabo sed iure atque neque quidem ipsam!
          Dolor, minus reiciendis.
        </p>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, illum.
          Accusantium ab expedita veniam nobis aut, in rerum repellendus!
          Exercitationem libero recusandae corrupti accusantium reiciendis in
          placeat illo maxime ea.
        </p>
      </div>
      <div className="col-12 col-lg-6 d-flex justify-content-center">
        <img src={img} className="img-fluid rounded" alt="About us" />
      </div>
    </div>
  );
};

export default About;
