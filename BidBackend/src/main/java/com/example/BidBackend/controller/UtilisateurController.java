package com.example.BidBackend.controller;

import com.example.BidBackend.dto.LoginDto;
import com.example.BidBackend.model.Utilisateur;
import com.example.BidBackend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utilisateurs")
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;


    @Autowired
    private PasswordEncoder passwordEncoder;
    @GetMapping("/getAll")
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurService.getAllUsers();
    }
    @GetMapping("/getByEmail")
    public Utilisateur getByEmail(@RequestParam String email) {
        Utilisateur utilisateur =  utilisateurService.findByEmail(email);
        if(utilisateur!= null){
            System.out.println(utilisateur.getPassword());
            return utilisateur;
        }
        return null;

    }
    @PostMapping("/logIn")
    public String logIn(@RequestBody LoginDto loginDto) {
        return utilisateurService.loginUser(loginDto);
    }


    @GetMapping("/{id}")
    public Utilisateur getUtilisateurById(@PathVariable int id) {
        return utilisateurService.findById(id);
    }

    @PostMapping("/add")
    public String createUtilisateur(@RequestBody Utilisateur utilisateur) {
        if (getByEmail(utilisateur.getEmail()) == null) {
            utilisateurService.save(utilisateur);
            return "New user added";
        }
        return null;
    }



    // Endpoint pour mettre à jour un utilisateur existant
    @PutMapping("/update/{id}")
    public String updateUtilisateur(@PathVariable int id, @RequestBody Utilisateur utilisateur) {
        utilisateurService.updateUtilisateur(id, utilisateur);
        return "User updated";
    }

    // Endpoint pour supprimer un utilisateur par ID
    @DeleteMapping("/delete/{id}")
    public String deleteUtilisateur(@PathVariable int id)
    {
        utilisateurService.deleteUtilisateur(id);
        return "User deleted";
    }
}
