import React, { useState } from "react";

const AddPackageForm = ({ onAddPackage, locations }) => {
    const [newPackage, setNewPackage] = useState({
        title: "",
        price: "",
        locationId: "",
        features: { general: [], femalesAbove40: [], femalesBelow40: [], males: [] },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPackage((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFeatureChange = (e, group) => {
        const { value } = e.target;
        if (value && !newPackage.features[group].includes(value)) {
            setNewPackage((prev) => ({
                ...prev,
                features: {
                    ...prev.features,
                    [group]: [...prev.features[group], value],
                },
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPackage.title && newPackage.price && newPackage.locationId) {
            // Call the parent function to add the new package
            onAddPackage(newPackage);
            // Reset the form fields after submission
            setNewPackage({
                title: "",
                price: "",
                locationId: "",
                features: { general: [], femalesAbove40: [], femalesBelow40: [], males: [] },
            });
        } else {
            alert("Please fill in all fields.");
        }
    };

    // return (
    //     <form onSubmit={handleSubmit} className="add-package-form">
    //         <h2>Add New Package</h2>

    //         <div>
    //             <label>Title:</label>
    //             <input
    //                 type="text"
    //                 name="title"
    //                 value={newPackage.title}
    //                 onChange={handleChange}
    //                 required
    //             />
    //         </div>

    //         <div>
    //             <label>Price:</label>
    //             <input
    //                 type="text"
    //                 name="price"
    //                 value={newPackage.price}
    //                 onChange={handleChange}
    //                 required
    //             />
    //         </div>

    //         <div>
    //             <label>Location:</label>
    //             <select
    //                 name="locationId"
    //                 value={newPackage.locationId}
    //                 onChange={handleChange}
    //                 required
    //             >
    //                 <option value="">Select Location</option>
    //                 {locations.map((loc) => (
    //                     <option key={loc.id} value={loc.id}>
    //                         {loc.name}
    //                     </option>
    //                 ))}
    //             </select>
    //         </div>

    //         <div>
    //             <label>Features (General):</label>
    //             <input
    //                 type="text"
    //                 placeholder="Feature"
    //                 onBlur={(e) => handleFeatureChange(e, "general")}
    //             />
    //         </div>

    //         <div>
    //             <label>Features (Females Above 40):</label>
    //             <input
    //                 type="text"
    //                 placeholder="Feature"
    //                 onBlur={(e) => handleFeatureChange(e, "femalesAbove40")}
    //             />
    //         </div>

    //         <div>
    //             <label>Features (Females Below 40):</label>
    //             <input
    //                 type="text"
    //                 placeholder="Feature"
    //                 onBlur={(e) => handleFeatureChange(e, "femalesBelow40")}
    //             />
    //         </div>

    //         <div>
    //             <label>Features (Males):</label>
    //             <input
    //                 type="text"
    //                 placeholder="Feature"
    //                 onBlur={(e) => handleFeatureChange(e, "males")}
    //             />
    //         </div>

    //         <button type="submit">Add Package</button>
    //     </form>
    // );
};

export default AddPackageForm;
