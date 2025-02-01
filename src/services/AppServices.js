import axios from "axios";
import UserStorageService from "./UserStorageService"; // Handles user token storage/retrieval

// Base URL for the API
const BASE_REST_API_URL = "http://localhost:8084/api";

class AppServices {
  // Generic method to set up headers for requests, including authentication
  getHeaders() {
    return {
      Authorization: `Bearer ${UserStorageService.getToken()}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Fetch all doctors
   * @returns {Promise<Object[]>} List of doctors
   */
  async getAllDoctors() {
    return this.handleRequest(() =>
      axios.get(`${BASE_REST_API_URL}/doctors`, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Update the status of a doctor
   * @param {string} id - Doctor ID
   * @returns {Promise<Object>} Updated doctor data
   */
  async updateDoctorStatus(id) {
    return this.handleRequest(() =>
      axios.patch(`${BASE_REST_API_URL}/doctors/${id}/toggle-status`, null, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Delete a doctor by ID
   * @param {string} id - Doctor ID
   * @returns {Promise<void>} Confirmation of deletion
   */
  async deleteDoctor(id) {
    return this.handleRequest(() =>
      axios.delete(`${BASE_REST_API_URL}/doctors/${id}`, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Fetch all appointments
   * @returns {Promise<Object[]>} List of appointments
   */
  async getAllAppointments() {
    return this.handleRequest(() =>
      axios.get(`${BASE_REST_API_URL}/appointments`, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Create a new appointment
   * @param {Object} appointment - Appointment data
   * @returns {Promise<Object>} Created appointment
   */
  async createAppointment(appointment) {
    return this.handleRequest(() =>
      axios.post(`${BASE_REST_API_URL}/appointments`, appointment, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Update an appointment by ID
   * @param {string} appointmentId - Appointment ID
   * @param {Object} appointment - Updated appointment data
   * @returns {Promise<Object>} Updated appointment
   */
  async updateAppointment(appointmentId, appointment) {
    return this.handleRequest(() =>
      axios.put(`${BASE_REST_API_URL}/appointments/${appointmentId}`, appointment, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Delete an appointment by ID
   * @param {string} appointmentId - Appointment ID
   * @returns {Promise<void>} Confirmation of deletion
   */
  async deleteAppointment(appointmentId) {
    return this.handleRequest(() =>
      axios.delete(`${BASE_REST_API_URL}/appointments/${appointmentId}`, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Fetch a specific appointment by ID
   * @param {string} appointmentId - Appointment ID
   * @returns {Promise<Object>} Appointment details
   */
  async getAppointmentById(appointmentId) {
    return this.handleRequest(() =>
      axios.get(`${BASE_REST_API_URL}/appointments/${appointmentId}`, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Fetch all rooms
   * @returns {Promise<Object[]>} List of rooms
   */
  async getAllRooms() {
    return this.handleRequest(() =>
      axios.get(`${BASE_REST_API_URL}/rooms`, {
        headers: this.getHeaders(),
      })
    );
  }

  

  /**
   * Create a new doctor
   * @param {Object} doctor - Doctor data
   * @returns {Promise} Axios response
   */
  async updateRoom(roomId, roomData) {
    return this.handleRequest(() =>
      axios.put(`${BASE_REST_API_URL}/rooms/${roomId}`, roomData, {
        headers: this.getHeaders(),
      })
    );
  }

  async updateDoctor(doctor) {
    try {
      const response = await axios.post(
        `${BASE_REST_API_URL}/doctors`,
        doctor,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (err) {
      console.error("Error creating doctor:", err);
      throw err;
    }
  }

  /**
   * Fetch the count of patients
   * @returns {Promise<number>} Count of patients
   */
  async getPatientsCount() {
    return this.handleRequest(() =>
      axios.get(`${BASE_REST_API_URL}/dashboard/patients-count`, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Fetch the count of pending approvals
   * @returns {Promise<number>} Count of pending approvals
   */
  async getPendingApprovalsCount() {
    return this.handleRequest(() =>
      axios.get(`${BASE_REST_API_URL}/appointments/pending-count`, {
        headers: this.getHeaders(),
      })
    );
  }

  /**
   * Generic method to handle all requests
   * @param {Function} apiCall - API call function
   * @returns {Promise<any>} Response data or error
   */
  async handleRequest(apiCall) {
    try {
      const response = await apiCall();
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response || error.message);
      throw error.response?.data || error.message;
    }
  }
}

export default new AppServices();
