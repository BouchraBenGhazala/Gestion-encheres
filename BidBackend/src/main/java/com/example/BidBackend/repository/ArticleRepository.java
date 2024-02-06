package com.example.BidBackend.repository;

import com.example.BidBackend.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article,Long> {
    @Query("SELECT a FROM Article a WHERE a.description = :description")
    List<Article> findByDescription(@Param("description") String description);

    Optional<Article> findById(Long id);
    /*@Query("SELECT a FROM Article a WHERE a.utilisateur.id_utilisateur = :id")
    List<Article> findByIdVendeur(@Param("id") int id);*/
    @Query("SELECT a FROM Article a WHERE a.utilisateur2.email = :email")
    Article findByUtilisateurId_utilisateur(@Param("email") String email);


    @Query("SELECT a FROM Article a WHERE a.utilisateur.email = :email")
    List<Article> findByIdVendeur(@Param("email") String email);

    @Query("SELECT a FROM Article a WHERE a.date_debut > :date")
    List<Article> findArticlesByDateDebutAfter(@Param("date") LocalDateTime date);

}



