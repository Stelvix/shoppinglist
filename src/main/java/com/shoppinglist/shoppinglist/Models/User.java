package com.shoppinglist.shoppinglist.Models;

@lombok.Getter
@lombok.Setter@jakarta.persistence.Entity
@jakarta.persistence.Table(name = "\"Users\"")
public class User {
@jakarta.persistence.Id
@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.UUID)
@jakarta.persistence.Column(name = "id", nullable = false)
private java.util.UUID id;

@org.hibernate.annotations.ColumnDefault("'255'")
@jakarta.persistence.Column(name = "name", length = Integer.MAX_VALUE)
private java.lang.String name;

@org.hibernate.annotations.ColumnDefault("'255'")
@jakarta.persistence.Column(name = "lname", length = Integer.MAX_VALUE)
private java.lang.String lname;

@org.hibernate.annotations.ColumnDefault("'20'")
@jakarta.persistence.Column(name = "pseudo", length = Integer.MAX_VALUE)
private java.lang.String pseudo;

@org.hibernate.annotations.ColumnDefault("now()")
@jakarta.persistence.Column(name = "created_at", nullable = false)
private java.time.OffsetDateTime createdAt;

@org.hibernate.annotations.ColumnDefault("now()")
@jakarta.persistence.Column(name = "updated_at", nullable = false)
private java.time.OffsetDateTime updatedAt;

@jakarta.persistence.Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
private java.lang.String email;



}