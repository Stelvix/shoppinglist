package com.shoppinglist.shoppinglist.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shoppinglist.shoppinglist.Services.TypeCoursesServices;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
 import com.shoppinglist.shoppinglist.Models.TypeDeCourses;

@RestController
@RequestMapping("api/type_de_courses")
@RequiredArgsConstructor
public class TypesCoursesController {
    private final TypeCoursesServices typeCoursesServices;

    @GetMapping
    public List<TypeDeCourses> getTypeDeCourses() {
        return typeCoursesServices.getAllTypeDeCourses();
    }

}
