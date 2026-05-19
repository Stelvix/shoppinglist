package com.shoppinglist.shoppinglist.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "\"Users\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @ColumnDefault("'255'")
    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    @ColumnDefault("'255'")
    @Column(name = "lname", length = Integer.MAX_VALUE)
    private String lname;

    @ColumnDefault("'20'")
    @Column(name = "pseudo", length = Integer.MAX_VALUE)
    private String pseudo;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
    private String email;

}