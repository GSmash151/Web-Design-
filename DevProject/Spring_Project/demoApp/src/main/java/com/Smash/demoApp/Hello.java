package com.Smash.demoApp;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello {

    @RequestMapping("/")
    public String greeting() {
        return "Hello World, Welcome to Smash!";
    }
}
