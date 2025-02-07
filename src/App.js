import React, { useRef, useState } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Header from './component/Header';
import Hero from './component/Hero';
import HealthPackage from './component/HealthPackage';
// import Location from './component/Location'
import Footer from './component/Footer'
import WhyChoose from './component/WhyChoose';
import PatientExperience from './component/PatientExperience'
import DoctorLoginForm from './component/DoctorLoginForm'
import Login from './component/DoctorLoginForm';
import Doctordashboard from './DoctorComponents/DoctorView';
import NurseLoginForm from '../src/component/NurseLoginForm'
import Map from './component/enquiries&Map'
// import NurseDashboard from '../src/component/Nursedashboard'
// import DoctorsInfo from './component/DoctorsInfo'
// import DashboardOverview from '../src/DoctorComponents/DashboardOverview';
// import AddPatient from '../src/DoctorComponents/AddPatient';
// import CreateAppointment from '../src/DoctorComponents/CreateAppointment';
// import AddEnquiries from '../src/DoctorComponents/AddEnquiries';
// import AllPatient from '../src/DoctorComponents/AllPatients';

import Appointment from './component/appointment/Appointment';
import AppointmentsAdd from './component/appointment/AppointmentsAdd';
import AppointmentUpdate from './component/appointment/AppointmentUpdate';
import AppointmentViewById from './component/appointment/AppointmentViewById';
// import Nursedashboard from "../src/receptionist/components/Receptionist_view";
import About from './component/abouts';
import Home from './component/home';
import Services from './component/Services'
import DoctorInfo from './component/DoctorsInfo'
import EnabledDoctors from "./component/DoctorsInfo";

import Scroll from './component/ScrollingTitle'
import HospitalSpecialities from './component/HospitalSpecialities';
import DummyDoctorsData from './component/DummyDoctorsData';
import EnquiryFormMap from './component/EnquiryFormMap';


function App() {

  const [isMainMenuOpen, setisMainMenuOpen] = useState(false);
  const doctorRef = useRef(null);
  const PackageRef = useRef(null);
  const whyChooseRef = useRef(null);
  const aboutUsRef = useRef(null);
  const footerRef = useRef(null);

  const scollTODoctor=()=>{
    if (doctorRef.current){
      doctorRef.current.scrollIntoView({behavior:'smooth'});
    }  
  }
  const scollTOPackage=()=>{
    if (PackageRef.current){
      PackageRef.current.scrollIntoView({behavior:'smooth'});
    }  
  }
  const scrollToAboutUs=()=>{
    if (aboutUsRef.current){
      aboutUsRef.current.scrollIntoView({behavior:'smooth'});
    }  
  }
  const scrollToWhyChoose=()=>{
    if (whyChooseRef.current){
      whyChooseRef.current.scrollIntoView({behavior:'smooth'});
    }  
  }
  const scrollToFooter=()=>{
    if (footerRef.current){
      footerRef.current.scrollIntoView({behavior:'smooth'});
    }  
  }

  const MobileMenuCloseFunc = () => {
    if(isMainMenuOpen == true){
      setisMainMenuOpen(false);
    }
  };

  return (
    
    <div className="App" onClick={MobileMenuCloseFunc}>
      <>
      
      <Router>
        
        <Routes>
          <Route path="/" element={
            <>
             <Header isMainMenuOpen={isMainMenuOpen} setisMainMenuOpen={setisMainMenuOpen} scollTODoctor={scollTODoctor} scrollToWhyChoose={scrollToWhyChoose} scollTOPackage={scollTOPackage}
              scrollToAboutUs={scrollToAboutUs} scrollToFooter={scrollToFooter} MobileMenuLinkFunc={MobileMenuCloseFunc}/>
            {/* <Scroll/> */}
            <div>
              {/* <Hero /> */}
            <Home/>
              </div>
              <div ref={aboutUsRef}>
              <About/>
              </div>
              {/* <div ref={PackageRef}>
              <HealthPackage  />
              </div> */}
              {/* <Services/> */}
              <HospitalSpecialities />
              {/* <DoctorInfo/> */}
              <div ref={doctorRef}>
              <DummyDoctorsData />
              </div>
              <PatientExperience />
               
              <div ref={whyChooseRef}>
                <WhyChoose />
              </div> 
              <div >
                <EnquiryFormMap />
              </div>
              {/* <Map/> */}
              <div ref={footerRef}>
              <Footer/>
              </div>
              
            </>
          
        } />
          <Route path="/DoctorLoginForm" element={<DoctorLoginForm />} /> 
          <Route path="/DoctorDashboard/*" element={<Doctordashboard/>} /> 
          <Route path="/NurseLoginForm" element={<NurseLoginForm />} />
          {/* <Route path="/Nursedashboard/*" element={<Nursedashboard/>} /> */}
          {/* <Route path="/AllPatient" element={<AllPatient/>} />
          <Route path="/add-patient" element={<AddPatient />} /> */}
          {/* <Route path="/create-appointment" element={<CreateAppointment />} /> */}
          {/* <Route path="/add-enquiries" element={<AddEnquiries />} />     
          <Route path="/list-appointment" element={<Appointment/>} />     
          <Route path="/create-appointment" element={<AppointmentsAdd/>} />    */}  
          <Route path="/add-appointment" element={<AppointmentsAdd/>} />     
          <Route path="/edit-appointment/:id" element={<AppointmentUpdate/>} />     
          <Route path="/view-appointment/:id" element={<AppointmentViewById/>} />
          <Route path="/" element={<EnabledDoctors />} />     
        </Routes>
      </Router>
      <Router>
        
       
      </Router>
    <Router>
      <Routes>
        <Route path="/Adminlogin" element={<Login />} />
          
        <Route path="/doctor" element={<Navigate to="/doctorlogin" />} /> {/* Redirect unknown routes */}
        
      </Routes>
    </Router>
    </>
    </div>
   
  );
}

export default App;
