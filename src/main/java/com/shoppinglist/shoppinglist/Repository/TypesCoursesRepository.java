package com.shoppinglist.shoppinglist.Repository;

import com.shoppinglist.shoppinglist.Models.TypeDeCourses;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface TypesCoursesRepository extends JpaRepository<TypeDeCourses, UUID> {

}
