package com.example.BidBackend.repository;

import com.example.BidBackend.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UtilisateurRepository extends JpaRepository<Utilisateur,Integer> {
    Utilisateur findByEmail(String email);
    @Query("SELECT a.utilisateur2 from Article a where a.id_article =:id")
    Utilisateur findByArticle(@Param("id")Long id);
}
