package com.sravani.docker_demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DockerDemoController {

    @GetMapping("/dockerDemo")
    public String getDemo(){
        return "Sprint Boot app is Dockerized successfully";
    }
}
