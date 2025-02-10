import { useEffect, useState } from "react";
import "../DoctorCSS/ViewEnquiry.css";
import axios from "axios";
import AppServices from "../services/AppServices";

export default function ViewEnquiry() {

    const [enquiryList, setEnquiryList] = useState([]);

    const handleMarkAsRead = async (enquiry) => {
        try {
            enquiry.enquiryStatus = "READ";
            const data = await axios.put(AppServices.getUrl() + "/enquiry/update", enquiry, { headers: AppServices.getHeaders() }); // Fetch from the backend
            console.log(data.data);
            const enqList=enquiryList.map((enq)=>enq.id===enquiry.id ? data.data : enq)
            setEnquiryList([...enqList]);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    }

    const fetchEnquiry = async () => {

        try {
            const data = await axios.get(AppServices.getUrl() + "/enquiry/view", { headers: AppServices.getHeaders() }); // Fetch from the backend
            console.log(data);

            setEnquiryList(data.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchEnquiry();
    }, []);

    return (
        <div className="view-enquiry-container" >
            <h2>View Enquiries</h2>
            <div className="enquiry-table-container">
                <table className="enquiry-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date and Time</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiryList.length > 0 ? (
                            enquiryList.map((enquiry, index) => (
                                <tr key={index}>
                                    <td>{enquiry.id}</td>
                                    <td>{enquiry.name}</td>
                                    <td>{enquiry.email}</td>
                                    <td>{enquiry.phone}</td>
                                    <td>{enquiry.dateTime}</td>
                                    <td>{enquiry.message}</td>
                                    <td style={{color: enquiry.enquiryStatus=="READ" ?"green":"grey"}}>{enquiry.enquiryStatus=="READ" ? "Read" : "Unread"}</td>
                                    <td>
                                        {enquiry.enquiryStatus=="READ" ?
                                            "" :
                                            <button className="mark-as-read-btn" onClick={() => handleMarkAsRead(enquiry)}>
                                                Mark as Read
                                            </button>
                                        }

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-record">
                                    No record found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

