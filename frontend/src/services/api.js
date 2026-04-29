import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://localhost:8080/students';

/**
 * API Service for Student Management
 * Handles all communication with the backend Spring Boot API
 */

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all students
 * @returns {Promise} List of all students
 */
export const getStudents = () => {
  return api.get();
};

/**
 * Fetch a specific student by ID
 * @param {number} id - Student ID
 * @returns {Promise} Student object
 */
export const getStudentById = (id) => {
  return api.get(`/${id}`);
};

/**
 * Create a new student
 * @param {object} data - Student data (name, email, course)
 * @returns {Promise} Created student object with ID
 */
export const createStudent = (data) => {
  return api.post('', data);
};

/**
 * Update an existing student
 * @param {number} id - Student ID
 * @param {object} data - Updated student data
 * @returns {Promise} Updated student object
 */
export const updateStudent = (id, data) => {
  return api.put(`/${id}`, data);
};

/**
 * Delete a student
 * @param {number} id - Student ID
 * @returns {Promise} Deletion confirmation
 */
export const deleteStudent = (id) => {
  return api.delete(`/${id}`);
};

export default api;
