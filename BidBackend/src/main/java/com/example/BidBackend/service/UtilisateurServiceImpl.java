package com.example.BidBackend.service;

import com.example.BidBackend.dto.LoginDto;
import com.example.BidBackend.model.Utilisateur;
import com.example.BidBackend.repository.UtilisateurRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Utilisateur save(Utilisateur utilisateur) {
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        return utilisateurRepository.save(utilisateur);
    }

    public String loginUser(LoginDto loginDto){
        Utilisateur utilisateur =  findByEmail(loginDto.getEmail());
        //System.out.println(passwordEncoder.matches(loginDto.getPassword(), utilisateur.getPassword()));
        if(utilisateur != null && passwordEncoder.matches(loginDto.getPassword(), utilisateur.getPassword()) ){
            addToSession("userId", utilisateur.getId_utilisateur());
            return "user log";
        }
        return null;
    }
    private void addToSession(String attributeName, int attributeValue) {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(true);
        session.setAttribute(attributeName, attributeValue);
    }

    public Utilisateur findByArticleId(Long articleId) {
        return utilisateurRepository.findByArticle(articleId);
    }

    @Override
    public Utilisateur findById(int id) {
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepository.findById(id);
        return optionalUtilisateur.orElse(null);
    }

    @Override
    public Utilisateur findByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    @Override
    public List<Utilisateur> getAllUsers() {
        return utilisateurRepository.findAll();
    }

    @Override
    public Utilisateur updateUtilisateur(int id, Utilisateur utilisateur) {
        // Vérifiez si l'utilisateur avec l'ID spécifié existe
        Optional<Utilisateur> existingUtilisateurOptional = utilisateurRepository.findById(id);

        if (existingUtilisateurOptional.isPresent()) {
            Utilisateur existingUtilisateur = existingUtilisateurOptional.get();

            // Mettez à jour les champs de l'utilisateur existant avec les nouvelles valeurs
            existingUtilisateur.setIsVendor(utilisateur.getIsVendor());
            existingUtilisateur.setIsVendor(utilisateur.getIsVendor());
            existingUtilisateur.setEmail(utilisateur.getEmail());
            existingUtilisateur.setLastName(utilisateur.getLastName());
            existingUtilisateur.setFirstName(utilisateur.getFirstName());

            // Enregistrez les modifications dans la base de données
            return utilisateurRepository.save(existingUtilisateur);
        } else {
            return null;
            }
        }

    @Override
    public void deleteUtilisateur(int id) {
        utilisateurRepository.deleteById(id);
    }
}
