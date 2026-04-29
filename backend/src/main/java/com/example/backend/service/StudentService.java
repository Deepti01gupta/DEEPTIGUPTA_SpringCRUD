package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Student;
import com.example.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service layer for Student entity.
 * Contains business logic and validates data before calling repository.
 */
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * Get all students from the database.
     * @return list of all students
     */
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Get a student by ID.
     * @param id - the student ID
     * @return the student object
     * @throws ResourceNotFoundException if student not found
     */
    public Student getStudentById(int id) {
        Student student = studentRepository.findById(id);
        if (student == null) {
            throw new ResourceNotFoundException("Student with ID " + id + " not found");
        }
        return student;
    }

    /**
     * Create a new student.
     * @param student - the student object to create
     * @return the created student with the generated ID
     */
    public Student createStudent(Student student) {
        // Validate input
        if (student.getName() == null || student.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Student name cannot be empty");
        }
        if (student.getEmail() == null || student.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Student email cannot be empty");
        }
        if (student.getCourse() == null || student.getCourse().trim().isEmpty()) {
            throw new IllegalArgumentException("Student course cannot be empty");
        }

        // Save to database
        studentRepository.save(student);
        
        // Return the created student
        return student;
    }

    /**
     * Update an existing student.
     * @param id - the student ID to update
     * @param student - the updated student object
     * @return the updated student
     * @throws ResourceNotFoundException if student not found
     */
    public Student updateStudent(int id, Student student) {
        // Check if student exists
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student with ID " + id + " not found");
        }

        // Validate input
        if (student.getName() == null || student.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Student name cannot be empty");
        }
        if (student.getEmail() == null || student.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Student email cannot be empty");
        }
        if (student.getCourse() == null || student.getCourse().trim().isEmpty()) {
            throw new IllegalArgumentException("Student course cannot be empty");
        }

        // Update the student
        student.setId(id);
        studentRepository.update(id, student);

        return student;
    }

    /**
     * Delete a student by ID.
     * @param id - the student ID to delete
     * @throws ResourceNotFoundException if student not found
     */
    public void deleteStudent(int id) {
        // Check if student exists
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student with ID " + id + " not found");
        }

        // Delete the student
        studentRepository.delete(id);
    }
}
