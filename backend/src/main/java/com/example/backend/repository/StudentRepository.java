package com.example.backend.repository;

import com.example.backend.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository class for Student entity using JdbcTemplate.
 * Handles all database operations with direct SQL queries.
 * NO JPA or Hibernate - uses pure JDBC.
 */
@Repository
public class StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    // SQL Queries
    private static final String INSERT_STUDENT = 
        "INSERT INTO student (name, email, course) VALUES (?, ?, ?)";
    
    private static final String SELECT_ALL_STUDENTS = 
        "SELECT id, name, email, course FROM student";
    
    private static final String SELECT_STUDENT_BY_ID = 
        "SELECT id, name, email, course FROM student WHERE id = ?";
    
    private static final String UPDATE_STUDENT = 
        "UPDATE student SET name = ?, email = ?, course = ? WHERE id = ?";
    
    private static final String DELETE_STUDENT = 
        "DELETE FROM student WHERE id = ?";
    
    private static final String COUNT_BY_ID = 
        "SELECT COUNT(*) FROM student WHERE id = ?";

    // RowMapper for mapping ResultSet to Student object
    private final RowMapper<Student> studentRowMapper = (rs, rowNum) -> 
        new Student(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("email"),
            rs.getString("course")
        );

    @Autowired
    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Save a new student to the database.
     * @param student - the student object to save
     * @return the number of rows affected
     */
    public int save(Student student) {
        return jdbcTemplate.update(
            INSERT_STUDENT,
            student.getName(),
            student.getEmail(),
            student.getCourse()
        );
    }

    /**
     * Find all students in the database.
     * @return list of all students
     */
    public List<Student> findAll() {
        return jdbcTemplate.query(
            SELECT_ALL_STUDENTS,
            studentRowMapper
        );
    }

    /**
     * Find a student by ID.
     * @param id - the student ID
     * @return the student object, or null if not found
     */
    public Student findById(int id) {
        try {
            return jdbcTemplate.queryForObject(
                SELECT_STUDENT_BY_ID,
                new Object[]{id},
                studentRowMapper
            );
        } catch (EmptyResultDataAccessException e) {
            return null; // Student not found
        }
    }

    /**
     * Update an existing student record.
     * @param id - the student ID to update
     * @param student - the updated student object
     * @return the number of rows affected
     */
    public int update(int id, Student student) {
        return jdbcTemplate.update(
            UPDATE_STUDENT,
            student.getName(),
            student.getEmail(),
            student.getCourse(),
            id
        );
    }

    /**
     * Delete a student by ID.
     * @param id - the student ID to delete
     * @return the number of rows affected
     */
    public int delete(int id) {
        return jdbcTemplate.update(DELETE_STUDENT, id);
    }

    /**
     * Check if a student exists by ID.
     * @param id - the student ID
     * @return true if student exists, false otherwise
     */
    public boolean existsById(int id) {
        Integer count = jdbcTemplate.queryForObject(COUNT_BY_ID, new Object[]{id}, Integer.class);
        return count != null && count > 0;
    }
}
