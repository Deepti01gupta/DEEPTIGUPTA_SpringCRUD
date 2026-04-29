package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Student entity representing a student record in the database.
 * This class maps to the student table in PostgreSQL.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Integer id;           // Primary key, auto-generated
    private String name;           // Student name
    private String email;          // Student email
    private String course;         // Course name
}
