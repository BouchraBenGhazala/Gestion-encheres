package com.example.BidBackend.controller;


import com.example.BidBackend.model.Avis;
import com.example.BidBackend.model.Utilisateur;
import com.example.BidBackend.service.AvisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avis")
@CrossOrigin(origins = "http://localhost:3000")
public class AvisController {

    @Autowired
    private AvisService avisService;

    @PostMapping(path = "/add", consumes = "application/json")
    public Avis addAvis(@RequestBody Avis avis){
        return avisService.save(avis);
    }

    @GetMapping("/getAll")
    public List<Avis> getAllAvis() {
        return avisService.getAll();
    }
}