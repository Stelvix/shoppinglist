package com.shoppinglist.shoppinglist.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shoppinglist.shoppinglist.Models.TypeDeCourses;
import com.shoppinglist.shoppinglist.Repository.TypesCoursesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TypeCoursesServices {
    private final TypesCoursesRepository typesCoursesRepository;

    // je récupère les types de courses

    public List<TypeDeCourses> getAllTypeDeCourses() {
        return typesCoursesRepository.findAll();
    }
}
