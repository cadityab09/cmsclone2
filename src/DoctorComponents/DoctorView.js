import React, { useState } from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import SideNavContent from './SideNavContent';
import DashboardOverview from './DashboardOverview';
import AddPatient from './AddPatient';
// import CreateAppointment from '../DoctorComponents/CreateAppointment';
import AddEnquiry from './AddEnquiries';
import AllPatients from './AllPatients';
import Room from '../RoomComponents/Rooms';
import AppointmentsAdd from '../component/appointment/AppointmentsAdd';
import AppointmentViewById from '../component/appointment/AppointmentViewById';
import Appointment from '../component/appointment/Appointment';
import AppointmentUpdate from '../component/appointment/AppointmentUpdate';
import UserStorageService from '../services/UserStorageService';
import ServiceForm from '../component/AddServiceForm';
import { RiMicroscopeLine } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import "../DoctorCSS/DoctorView.css";
import ViewServices from './ViewService';
import AddDoctorForm from "./AddDoctorForm"
import DoctorInfo from "./DoctorInfo";
import AddRoom from '../RoomComponents/AddRoom';
import doc1 from '../assets/img/doc1.jpg';
import doc2 from '../assets/img/doc2.jpg';
import doc3 from '../assets/img/doc3.jpg';
import doc4 from '../assets/img/doc4.jpg';
import doc5 from '../assets/img/doc5.jpg';
import doc6 from '../assets/img/doc6.jpg';

function DoctorView() {
    const [sideNavStatus, setSideNavStatus] = useState(true);


    const subpatient = [
        { number: '1', name: 'Add patient', icon: 'fas fa-user-plus', url: '/DoctorDashboard/add-patient', isSubitem:false, },
        { number: '2', name: 'view patient', icon: 'fas fa-user', url: '/DoctorDashboard/AllPatient' },
    ]
    const subappointment = [
        { number: '4', name: 'Create Appointment', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/create-appointment' },
        { number: '5', name: 'View-Appointment', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/list-appointment' },
    ]
    const subservice = [
        { number: '1', name: 'Create Service', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/create-service' },
        { number: '2', name: 'View Service', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/view-service' },
    ]
    const subdoctor = [
        { number: '1', name: 'Add Doctor', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/add-doctor' },
        { number: '2', name: 'View Doctor', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/view-doctor' },
    ]
    const subroom = [
      { number: '1', name: 'Add bed', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/add-room' },
      { number: '2', name: 'View bed', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/view-room' },
  ]

    const [menuItems, setMenuItems] = useState([

        { number: '1', name: 'dashboard', icon: 'fas fa-home', url: '/DoctorDashboard', isSubitem: false },
        { number: '2', name: 'patient', icon: 'fas fa-user-plus', url: '/DoctorDashboard/add-patient', isSubitem: true, subitem: subpatient, isExpanded: false },
        { number: '4', name: 'Appointment', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/create-appointment', isSubitem: true, subitem: subappointment, isExpanded: false },
        { number: '6', name: 'view Enquiries', icon: 'fas fa-question-circle', url: '/DoctorDashboard/AddEnquiry', isSubitem: false },
        { number: '7', name: 'room', icon: 'fa-solid fa-hospital', url: '/DoctorDashboard/room', isSubitem: true, subitem: subroom, isExpanded: false },
        { number: '8', name: 'Service', icon: 'fa-solid fa-hospital', url: '/DoctorDashboard/service', isSubitem: true, subitem: subservice, isExpanded: false },
        { number: '9', name: 'Doctors', icon: 'fa-solid fa-hospital', url: '/DoctorDashboard/doctors', isSubitem: true, subitem: subdoctor, isExpanded: false },
    
    ]);
    
    const toggleSubmenu = (number) => {
        setMenuItems((prevItems) =>
            prevItems.map((item) =>
                item.number === number ? { ...item, isExpanded: !item.isExpanded } : item
            )
        );
    };
    
    const changeSideNavStatus = () => {
        setSideNavStatus(!sideNavStatus);
        console.log(sideNavStatus);
    };
    // if(UserStorageService.getToken()==null || UserStorageService.getUser()==null) {
    //     return(
    //         <>
    //             <div className='unilligible' style={{alignItems:'center', marginTop:'300px'}}>
    //                 <h1>Page 404 error</h1>
    //             </div>
    //         </>
    //     );
    // }
    // console.log(UserStorageService.getToken());
    const [doctors, setDoctors] = useState([
        {
          img: doc1,
          name: "Dr. Serena Mitchell",
          specialties: "Orthopedic Surgeon",
          inTime: "9:00 AM",
          outTime: "5:00 PM",
          days: ["Monday", "Wednesday", "Friday"]
        },
        {
          img: doc2,
          name: "Dr. Julian Bennett",
          specialties: "Cardiologist",
          inTime: "10:00 AM",
          outTime: "4:00 PM",
          days: ["Tuesday", "Thursday"]
        },
        {
          img: doc3,
          name: "Dr. Julian Bennett",
          specialties: "Cardiologist",
          inTime: "10:00 AM",
          outTime: "4:00 PM",
          days: ["Tuesday", "Thursday"]
        },
        {
          img: doc4,
          name: "Dr. Julian Bennett",
          specialties: "Cardiologist",
          inTime: "10:00 AM",
          outTime: "4:00 PM",
          days: ["Tuesday", "Thursday"]
        },
        {
          img: doc5,
          name: "Dr. Julian Bennett",
          specialties: "Cardiologist",
          inTime: "10:00 AM",
          outTime: "4:00 PM",
          days: ["Tuesday", "Thursday"]
        },
        {
          img: doc6,
          name: "Dr. Julian Bennett",
          specialties: "Cardiologist",
          inTime: "10:00 AM",
          outTime: "4:00 PM",
          days: ["Tuesday", "Thursday"]
        },
        // Other initial doctors
      ]);

      const [roomlist, setroomlist] = useState([
        {
          img: doc1,
          name: "Dr. Serena Mitchell",
          specialties: "Orthopedic Surgeon",
          inTime: "9:00 AM",
          outTime: "5:00 PM",
          days: ["Monday", "Wednesday", "Friday"]
        },
      ])

    const [servicesData, setServicesData] = useState({
        title: "Our Services",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, quidem.",
        buttonLabel: "See Services",
        services: [
          {
            id: 1,
            icon: <RiMicroscopeLine size={50} className="text-primary mb-3" />,
            title: "Lab Test",
            description: "Comprehensive lab testing services for diagnostics.",
            link: "#",
            img: "", // Placeholder for the image
          },
          {
            id: 2,
            icon: <MdHealthAndSafety size={50} className="text-primary mb-3" />,
            title: "Health Check",
            description: "Regular health check-ups to ensure your well-being.",
            link: "#",
            img: "", // Placeholder for the image
          },
          {
            id: 3,
            icon: <FaHeartbeat size={50} className="text-primary mb-3" />,
            title: "Heart Health",
            description: "Specialized care for maintaining a healthy heart.",
            link: "#",
            img: "", // Placeholder for the image
          },
        ],
      });
    
      const addOrUpdateService = (newServiceData) => {
        setServicesData((prevData) => ({
          ...prevData,
          services: [...prevData.services, newServiceData], // Add new service to the list
        }));
      };

      const addOrUpdateDoctor = (newDoctor) => {
        setDoctors((prevDoctors) => {
          const index = prevDoctors.findIndex(doc => doc.name === newDoctor.name);
          if (index > -1) {
            const updatedDoctors = [...prevDoctors];
            updatedDoctors[index] = newDoctor;
            return updatedDoctors;
          }
          return [...prevDoctors, newDoctor];
        });
      };

    return (
        <>
            <Navbar changeSideNavStatus={changeSideNavStatus} />
            <div className="main-view">
                    <div className={`side-navbar`}>
                        <SideNavContent list={menuItems} sideNavStatus={sideNavStatus} toggleSubmenu={toggleSubmenu} />
                    </div>
                    <div className="main-content">
                       
                        <div className="main-content-routes">
                            <Routes>
                                <Route path="/" element={<DashboardOverview />} />
                                <Route path="/DashboardOverview" element={<DashboardOverview />} />
                                <Route path="/AllPatient" element={<AllPatients />} />
                                <Route path="/add-patient" element={<AddPatient />} />
                                <Route path="/create-appointment" element={<AppointmentsAdd />} />
                                <Route path="/list-appointment" element={<Appointment />} />
                                <Route path="/view-appointment/:id" element={<AppointmentViewById />} />
                                <Route path="/edit-appointment/:id" element={<AppointmentUpdate />} />
                                <Route path="/AddEnquiry" element={<AddEnquiry />} />
                                <Route path="/Room" element={<Room />} />
                                <Route path="/add-doctor" element={<AddDoctorForm addOrUpdateDoctor={addOrUpdateDoctor} />} />
                                <Route path="/view-doctor" element={<DoctorInfo doctors={doctors} setDoctors={setDoctors}/>} />
                                <Route path="/view-service" element={<ViewServices servicesData={servicesData} setServicesData={setServicesData} />} />
                                <Route path="/add-room" element={<AddRoom roomlist={roomlist} setroomlist={setroomlist}/>} />
                                <Route path="/view-room" element={<Room roomlist={roomlist} setroomlist={setroomlist} />} />
                                <Route path="/create-service" element={<ServiceForm addOrUpdateService={addOrUpdateService} />
                                
} />
                            </Routes>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default DoctorView;
