package com.example.BidBackend.service;

import com.example.BidBackend.model.Article;
import com.example.BidBackend.model.Utilisateur;
import com.example.BidBackend.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public Article findById(Long id) {
        Optional<Article> optionalArticle = articleRepository.findById(id);
        return optionalArticle.orElse(null);
    }


    @Override
    public Article save(Article article) {
        return articleRepository.save(article);
    }


    @Override
    public List<Article> getArticlesVendeur(String email) {
        return articleRepository.findByIdVendeur(email);
    }

    @Override
    public Article updateArticle(Long id,Article article) {
        Optional<Article> existingArticleOptional = articleRepository.findById(id);
        if (existingArticleOptional.isPresent()) {
            Article existingArticle = existingArticleOptional.get();

            // Mettez à jour les champs de l'utilisateur existant avec les nouvelles valeurs
            existingArticle.setNom_article(article.getNom_article());
            existingArticle.setDate_debut(article.getDate_debut());
            existingArticle.setDate_fin(article.getDate_fin());
            existingArticle.setDélai(article.getDélai());
            existingArticle.setDescription(article.getDescription());
            existingArticle.setPrixMin(article.getPrixMin());
            existingArticle.setStatut(article.getStatut());

            // Enregistrez les modifications dans la base de données
            return articleRepository.save(existingArticle);
        } else {
            return null;
        }
    }

    @Override
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }



    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }




    @Override
    public List<Article> getActiveArticles() {
        return null;
    }

    @Override
    public List<Article> searchArticlesByKeyword(String keyword) {
        return null;
    }

    @Override
    public List<Article> getArticlesBySeller(int sellerId) {
        return null;
    }

    @Override
    public void closeAuction(int articleId) {

    }

    @Override
    public Article getArticleByUserId(String email) {
        return articleRepository.findByUtilisateurId_utilisateur(email);
    }

    /*@Override
=======
    @Override
<<<<<<< HEAD
    public List<Article> getArticlesVendeur(String email){
        return articleRepository.findByIdVendeur(email);
=======
>>>>>>> 4d4485661cabd98419fd0ed96be173438ca5f064
>>>>>>> 64b09ea16fec3e1eb69204e7d2a2130a75b88c56
    public List<Article> getArticlesVendeur(int id_utilisateur){
        return articleRepository.findByIdVendeur(id_utilisateur);
>>>>>>> a6c5b6ec637c0ebae0f774997a25a2472cf704b6

>>>>>>> 4fb10d5174bb0492ba0943bb7e7c9b0984e023bb
    }


    @Override
    public List<Article> getActiveArticles() {
        // Implémentez la logique pour récupérer les articles actifs
        return null;
    }

    @Override
    public List<Article> searchArticlesByKeyword(String keyword) {
        // Implémentez la logique pour rechercher des articles par mot-clé
        return null;
    }

    @Override
    public List<Article> getArticlesBySeller(int sellerId) {
        // Implémentez la logique pour récupérer les articles d'un vendeur spécifique
        return null;
    }

    @Override
    public void closeAuction(int articleId) {
        // Implémentez la logique pour fermer une enchère
    }
}
*/

    public List<Article> getArticlesByDate(LocalDateTime localDate){
        return articleRepository.findArticlesByDateDebutAfter(localDate);
    }
}

