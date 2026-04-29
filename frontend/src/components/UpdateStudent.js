import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById, updateStudent } from '../services/api';
import '../styles/StudentForm.css';

/**
 * UpdateStudent Component
 * Form to update an existing student
 */
function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudent = () => {
      setLoading(true);
      setError(null);
      getStudentById(id)
        .then((response) => {
          setFormData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching student:', error);
          setError('Failed to load student. Please try again.');
          setLoading(false);
        });
    };

    fetchStudent();
  }, [id]);

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

    setSubmitting(true);
    updateStudent(id, formData)
      .then((response) => {
        alert('Student updated successfully!');
        navigate('/'); // Redirect to student list
      })
      .catch((error) => {
        console.error('Error updating student:', error);
        setError('Failed to update student. Please try again.');
        setSubmitting(false);
      });
  };

  /**
   * Handle cancel button - go back to list
   */
  const handleCancel = () => {
    navigate('/');
  };

  // Loading state
  if (loading) {
    return <div className="container"><p>Loading student...</p></div>;
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>Edit Student (ID: {id})</h1>

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
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Student'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
