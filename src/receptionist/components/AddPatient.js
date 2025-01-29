import React, { useState } from 'react';
import '../rec-css/AddPatient.css';

function AddPatient() {
  // State to manage marital status and number of children visibility
  const [isMarried, setIsMarried] = useState(false);
  const [numChildren, setNumChildren] = useState('');

  const handleMaritalStatusChange = (event) => {
    setIsMarried(event.target.value === 'married');
    setNumChildren(''); // Reset number of children if marital status changes
  };

  return (
    <div className="add-patient-body pt-4">
      <h1>Add Patient</h1>
      <form className="add-patient-form">
        <div className='add-patient-form-labels'>
          <label className='name-label'>
            Name:
            <input type="text" placeholder="Enter patient name" required />
          </label>
          <label className='age-label'>
            Age:
            <input type="number" placeholder="Enter patient age" required />
          </label>
        </div>
        <div className='add-patient-form-labels'>
        <label>
          Contact:
          <input type="tel" placeholder="Enter contact number" required />
        </label>

        <label>
          Gender:
          <select required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        </div>


        <div className='add-patient-form-labels'>
        <label>
          Father name:
          <input type="text" placeholder="Enter father name" />
        </label>
        <label>
          Mother name:
          <input type="text" placeholder="Enter mother name" />
        </label>
        </div>
        

        <div className='add-patient-form-labels'>
        <label>
          Profession:
          <input type="text" placeholder="Enter Profession" />
        </label>
        <label>
          Marital Status:
          <select onChange={handleMaritalStatusChange} className='mt-2'>
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </label>
        </div>
        


        {isMarried && (
          <div className='form-row'>
            <label>
              Wifi's name:
              <input type="text" placeholder="Enter wife name" />
            </label>
            <label>
              Number of Children:
              <input
                type="number"
                value={numChildren}
                onChange={(e) => setNumChildren(e.target.value)}
                placeholder="Enter number of children"
              />
            </label>
          </div>
        )}

        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;
