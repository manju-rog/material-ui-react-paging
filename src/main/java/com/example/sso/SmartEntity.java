package com.example.sso;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "smart_entities")
public class SmartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private String payload;
    // Default constructor
    public SmartEntity() {}
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
}