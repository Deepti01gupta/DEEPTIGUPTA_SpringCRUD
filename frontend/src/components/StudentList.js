import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/api';
import '../styles/StudentList.css';

/**
 * StudentList Component
 * Displays all students in a table format
 * Allows user to delete or edit students
 */
function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  /**
   * Fetch students from backend
   */
  const fetchStudents = () => {
    setLoading(true);
    setError(null);
    getStudents()
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setError('Failed to load students. Please try again.');
        setLoading(false);
      });
  };

  /**
   * Delete a student by ID
   * @param {number} id - Student ID to delete
   */
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id)
        .then(() => {
          alert('Student deleted successfully!');
          fetchStudents(); // Refresh the list
        })
        .catch((error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student.');
        });
    }
  };

  /**
   * Navigate to edit page for a specific student
   * @param {number} id - Student ID to edit
   */
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  /**
   * Navigate to add student page
   */
  const handleAddStudent = () => {
    navigate('/add');
  };

  // Loading state
  if (loading) {
    return <div className="container"><p>Loading students...</p></div>;
  }

  // Error state
  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
        <button onClick={fetchStudents} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Student Management System</h1>
        <button onClick={handleAddStudent} className="btn btn-primary">
          + Add New Student
        </button>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students found. Click "Add New Student" to get started!</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(student.id)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
