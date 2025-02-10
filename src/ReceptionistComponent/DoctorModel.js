import React from 'react';

const DoctorModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{doctor.name}</h5>
              <button type="button" className="close" onClick={onClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={doctor.img} className="img-fluid rounded mb-3" alt="Doctor" />
              <p><strong>Specialties:</strong> {doctor.specialties}</p>
              <p><strong>In Time:</strong> {doctor.inTime}</p>
              <p><strong>Out Time:</strong> {doctor.outTime}</p>
              <p><strong>Available Days:</strong> {doctor.days.join(', ')}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
  );
};

export default DoctorModal;