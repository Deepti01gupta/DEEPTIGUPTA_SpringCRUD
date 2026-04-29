package com.example.backend.controller;

import com.example.backend.model.Student;
import com.example.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST API Controller for Student entity.
 * Base URL: /students
 * Handles all HTTP requests related to students.
 * CORS enabled globally via CorsConfig
 */
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * GET /students - Retrieve all students
     * @return list of all students with status 200 OK
     */
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    /**
     * GET /students/{id} - Retrieve a student by ID
     * @param id - the student ID
     * @return the student object with status 200 OK
     * @throws ResourceNotFoundException if student not found (handled by GlobalExceptionHandler)
     */
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Student student = studentService.getStudentById(id);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    /**
     * POST /students - Create a new student
     * @param student - the student object from request body
     * @return the created student with status 201 CREATED
     */
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student createdStudent = studentService.createStudent(student);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    /**
     * PUT /students/{id} - Update an existing student
     * @param id - the student ID to update
     * @param student - the updated student object from request body
     * @return the updated student with status 200 OK
     * @throws ResourceNotFoundException if student not found (handled by GlobalExceptionHandler)
     */
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) {
        Student updatedStudent = studentService.updateStudent(id, student);
        return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
    }

    /**
     * DELETE /students/{id} - Delete a student
     * @param id - the student ID to delete
     * @return status 204 NO CONTENT on success
     * @throws ResourceNotFoundException if student not found (handled by GlobalExceptionHandler)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable int id) {
        studentService.deleteStudent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
