package com.shoppinglist.shoppinglist;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String SayHello() {
        return "Mon API SPRING marche";
    }
}
