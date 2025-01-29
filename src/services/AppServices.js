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
   * Fetch all appointments
   * @returns {Promise} Axios response
   */
  async getAllAppointments() {
    try {
      const response = await axios.get(`${BASE_REST_API_URL}/appointments`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching all appointments:", err);
      throw err;
    }
  }

  /**
   * Create a new appointment
   * @param {Object} appointment - Appointment data
   * @returns {Promise} Axios response
   */
  async createAppointment(appointment) {
    try {
      const response = await axios.post(
        `${BASE_REST_API_URL}/appointments`,
        appointment,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (err) {
      console.error("Error creating appointment:", err);
      throw err;
    }
  }

  /**
   * Delete an appointment by ID
   * @param {string} appointmentId - ID of the appointment to delete
   * @returns {Promise} Axios response
   */
  async deleteAppointment(appointmentId) {
    try {
      const response = await axios.delete(
        `${BASE_REST_API_URL}/appointments/${appointmentId}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (err) {
      console.error("Error deleting appointment:", err);
      throw err;
    }
  }

  /**
   * Update an appointment by ID
   * @param {string} appointmentId - ID of the appointment to update
   * @param {Object} appointment - Updated appointment data
   * @returns {Promise} Axios response
   */
  async updateAppointment(appointmentId, appointment) {
    try {
      const response = await axios.put(
        `${BASE_REST_API_URL}/appointments/${appointmentId}`,
        appointment,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (err) {
      console.error("Error updating appointment:", err);
      throw err;
    }
  }

  /**
   * Fetch a specific appointment by ID
   * @param {string} appointmentId - ID of the appointment to fetch
   * @returns {Promise} Axios response
   */
  async getAppointmentById(appointmentId) {
    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/appointments/${appointmentId}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching appointment by ID:", err);
      throw err;
    }
  }

  /**
   * Fetch all doctors
   * @returns {Promise} Axios response
   */
  async getAllDoctors() {
    try {
      const response = await axios.get(`${BASE_REST_API_URL}/doctors`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching all doctors:", err);
      throw err;
    }
  }

  /**
   * Create a new doctor
   * @param {Object} doctor - Doctor data
   * @returns {Promise} Axios response
   */
  async createDoctor(doctor) {
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
   * @returns {Promise} Axios response
   */
  async getPatientsCount() {
    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/dashboard/patients-count`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching patients count:", err);
      throw err;
    }
  }

  /**
   * Fetch the count of pending approvals
   * @returns {Promise} Axios response
   */
  async getPendingApprovalsCount() {
    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/appointments/pending-count`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching pending approvals count:", err);
      throw err;
    }
  }

  /**
   * Fetch all rooms
   * @returns {Promise} Axios response
   */
  async getAllRooms() {
    try {
      const response = await axios.get(`${BASE_REST_API_URL}/rooms`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching rooms:", err);
      throw err;
    }
  }

  /**
   * Reset all rooms
   * @returns {Promise} Axios response
   */
  async resetRooms() {
    try {
      const response = await axios.post(`${BASE_REST_API_URL}/rooms/reset`, null, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (err) {
      console.error("Error resetting rooms:", err);
      throw err;
    }
  }

  /**
   * Update a room by ID
   * @param {string} roomId - ID of the room to update
   * @param {Object} roomData - Updated room data
   * @returns {Promise} Axios response
   */
  async updateRoom(roomId, roomData) {
    try {
      const response = await axios.put(
        `${BASE_REST_API_URL}/rooms/${roomId}`,
        roomData,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (err) {
      console.error("Error updating room:", err);
      throw err;
    }
  }
}

// Exporting an instance of the service for use throughout the application
export default new AppServices();
