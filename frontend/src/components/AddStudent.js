import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../services/api';
import '../styles/StudentForm.css';

/**
 * AddStudent Component
 * Form to create a new student
 */
function AddStudent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Handle input field changes
   * @param {event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Validate form data
   * @returns {boolean} True if valid, false otherwise
   */
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.course.trim()) {
      setError('Course is required');
      return false;
    }
    return true;
  };

  /**
   * Handle form submission
   * @param {event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    createStudent(formData)
      .then((response) => {
        alert('Student created successfully!');
        navigate('/'); // Redirect to student list
      })
      .catch((error) => {
        console.error('Error creating student:', error);
        setError('Failed to create student. Please try again.');
        setLoading(false);
      });
  };

  /**
   * Handle cancel button - go back to list
   */
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Add New Student</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label htmlFor="name">Student Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter student email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Student'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
