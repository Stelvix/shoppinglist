package com.shoppinglist.shoppinglist.Models;

@lombok.Getter
@lombok.Setter@jakarta.persistence.Entity
@jakarta.persistence.Table(name = "type_de_course")
public class TypeDeCourse {
@jakarta.persistence.Id
@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.UUID)
@jakarta.persistence.Column(name = "id", nullable = false)
private java.util.UUID id;

@jakarta.persistence.Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
private java.lang.String name;

@jakarta.persistence.Column(name = "description", length = Integer.MAX_VALUE)
private java.lang.String description;

@org.hibernate.annotations.ColumnDefault("now()")
@jakarta.persistence.Column(name = "created_at", nullable = false)
private java.time.OffsetDateTime createdAt;

@org.hibernate.annotations.ColumnDefault("now()")
@jakarta.persistence.Column(name = "updated_at", nullable = false)
private java.time.OffsetDateTime updatedAt;

@jakarta.persistence.ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
@org.hibernate.annotations.OnDelete(action = org.hibernate.annotations.OnDeleteAction.SET_NULL)
@org.hibernate.annotations.ColumnDefault("gen_random_uuid()")
@jakarta.persistence.JoinColumn(name = "user_id")
private com.shoppinglist.shoppinglist.Models.User user;



}