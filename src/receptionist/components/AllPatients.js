import React from 'react';
import '../rec-css/AllPatients.css';

function AllPatients() {
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      contact: '123-456-7890',
      gender: 'Male',
      email: 'john.doe@example.com',
      isMarried: 'Yes',
      children: '2',
      family: {
        wife: 'Jane Doe',
        childrenNames: ['Alice', 'Bob'],
      },
    },
    {
      id: 2,
      name: 'Emily Smith',
      age: 25,
      contact: '987-654-3210',
      gender: 'Female',
      email: 'emily.smith@example.com',
      isMarried: 'No',
      children: '0',
      family: {
        wife: '',
        childrenNames: [],
      },
    },
  ];

  return (
    <div className="all-patients-container mt-4">
      <h1>All Patients</h1>
      <div className="patients-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Email</th>
              {/* <th>Married</th> */}
              {/* <th>Children</th> */}
              {/* <th>Family Info</th> */}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.contact}</td>
                <td>{patient.gender}</td>
                <td>{patient.email}</td>
                {/* <td>{patient.isMarried}</td> */}
                {/* <td>{patient.children}</td> */}
                {/* <td>
                  {patient.family.wife && <p>Wife: {patient.family.wife}</p>}
                  {patient.family.childrenNames.length > 0 && (
                    <p>
                      Children: {patient.family.childrenNames.join(', ')}
                    </p>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllPatients;
