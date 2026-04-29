import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import './styles/index.css';

/**
 * Main App Component
 * Sets up routing for the application
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Route: Home - Display all students */}
        <Route path="/" element={<StudentList />} />

        {/* Route: Add new student */}
        <Route path="/add" element={<AddStudent />} />

        {/* Route: Edit student by ID */}
        <Route path="/edit/:id" element={<UpdateStudent />} />

        {/* Route: 404 - Not Found */}
        <Route
          path="*"
          element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>404 - Page Not Found</h1>
              <p>
                The page you're looking for doesn't exist. Please go back to{' '}
                <a href="/">Home</a>.
              </p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
