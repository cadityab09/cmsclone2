import React, { useState } from "react";
import "../CSS/HealthPackage.css";
import himage from "../assets/Images/img1.png";
import AddPackageForm from "./AddHealthpackage"; // Import the Add Package form

const HealthcarePackages = () => {
    const [activeLocation, setActiveLocation] = useState(1);
    const [expandedPackageId, setExpandedPackageId] = useState(null);

    // Predefined packages
    const [packages, setPackages] = useState([
        {
            locationId: 2,
            title: "blood test Package",
            price: "₹2420",
            features: {
                femalesAbove40: ["Haemogram", "Pap Smear", "Mammography", "Physician Consultation", "Stool Occult Blood", "Chest X-Ray", "USG – Abdomen & Pelvis"],
                femalesBelow40: ["Haemogram", "Chest X-Ray", "Physician Consultation", "PAP Smear", "USG – Abdomen & Pelvis"],
                males: ["Haemogram", "Chest X-Ray", "USG – Abdomen & Pelvis", "Physician Consultation"],
            },
            locationId: 1,
            title: "Liver function test Package",
            price: "₹2420",
            features: {
                femalesAbove40: ["Haemogram", "Pap Smear", "Mammography", "Physician Consultation", "Stool Occult Blood", "Chest X-Ray", "USG – Abdomen & Pelvis"],
                femalesBelow40: ["Haemogram", "Chest X-Ray", "Physician Consultation", "PAP Smear", "USG – Abdomen & Pelvis"],
                males: ["Haemogram", "Chest X-Ray", "USG – Abdomen & Pelvis", "Physician Consultation"],
            },
        },
        {
            locationId: 3,
            title: "Basic Package",
            price: "₹2420",
            features: {
                femalesAbove40: ["Haemogram", "Pap Smear", "Mammography", "Physician Consultation", "Stool Occult Blood", "Chest X-Ray", "USG – Abdomen & Pelvis"],
                
            },
        },

        {
            locationId: 2,
            title: "Basic Package",
            price: "₹2420",
            features: {
                femalesAbove40: ["Haemogram", "Pap Smear", "Mammography", "Physician Consultation", "Stool Occult Blood", "Chest X-Ray", "USG – Abdomen & Pelvis"],
                
            },
        },
        // other predefined packages...
    ]);

    const [locations] = useState([
        { id: 1, name: "Basic health check", locId: [1, 2, 5] },
        { id: 2, name: "Operational", locId: [5,6, 7] },
        { id: 3, name: "Diabetes", locId: [3, 4, 3] },
        // other locations...
    ]);

    // Filter packages based on the active location
    const activePackage = packages.filter(pkg =>
        locations.find(loc => loc.id === activeLocation)?.locId?.includes(pkg.locationId)
    );

    const toggleDropdown = (packageId) => {
        setExpandedPackageId((prevId) => (prevId === packageId ? null : packageId));
    };

    const changeList = (locId) => {
        setActiveLocation(locId);
        setExpandedPackageId(null);
        const element = document.getElementById('healthcare-main-content');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Handle new package addition
    const handleAddPackage = (newPackage) => {
        setPackages((prevPackages) => [...prevPackages, newPackage]);
    };

    return (
        <div className="healthcare-page">
            <div className="healthcare-location-with-packages">
                <div className="healthcare-sidebar">
                    <h3>Health Packages</h3>
                    <ul className="healthcare-location-list">
                        {locations.map(loc => (
                            <li
                                key={loc.id}
                                className={`healthcare-location-item ${loc.id === activeLocation ? "active" : ""}`}
                                onClick={() => changeList(loc.id)}
                            >
                                {loc.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="healthcare-main-content" id="healthcare-main-content">
                    {activePackage.length > 0 ? (
                        <>
                            <h3>
                                Healthcare Package List -{" "}
                                {locations.find((loc) => loc.id === activeLocation)?.name}
                            </h3>
                            {activePackage.map((pkg) => (
                                <div className="healthcare-package-card" key={pkg.locationId}>
                                    <div
                                        className="healthcare-package-header"
                                        onClick={() => toggleDropdown(pkg.locationId)}
                                    >
                                        <h4>{pkg.title}</h4>
                                        <div className="healthcare-package-header-right">
                                            <span className="healthcare-package-price">{pkg.price}</span>
                                            <button className="btn">Book Appointment</button>
                                        </div>
                                    </div>

                                    {expandedPackageId === pkg.locationId && (
                                        <div className={`healthcare-dropdown-content ${expandedPackageId === pkg.locationId ? "expand" : ""}`}>
                                            <PackageFeatures features={pkg.features} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No package details available for this location.</p>
                    )}
                </div>
            </div>

            {/* Add Package Form */}
            <div className="add-package-section">
                <AddPackageForm onAddPackage={handleAddPackage} locations={locations} />
            </div>
        </div>
    );
};

const PackageFeatures = ({ features }) => {
    if (!features) {
        return <p>No features available for this package.</p>;
    }

    return (
        <div className="healthcare-package-features">
            {Object.keys(features).map((group, index) => (
                <div key={index} className="healthcare-package-features-item">
                    <h5>{group.replace(/([A-Z])/g, " $1").toUpperCase()}</h5>
                    <ul>
                        {features[group].map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default HealthcarePackages;
