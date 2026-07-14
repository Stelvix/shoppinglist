package com.shoppinglist.shoppinglist.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shoppinglist.shoppinglist.Models.TypeDeCourse;

import java.util.List;
import java.util.UUID;

public interface TypesCoursesRepository extends JpaRepository<TypeDeCourse, UUID> {

    List<TypeDeCourse> findByUserId(UUID id);

}
