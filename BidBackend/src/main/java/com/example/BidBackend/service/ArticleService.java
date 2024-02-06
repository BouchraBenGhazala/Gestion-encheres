package com.example.BidBackend.service;

import com.example.BidBackend.model.Article;
import com.example.BidBackend.model.Utilisateur;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

public interface ArticleService {
    public Article findById(Long id);

    Article save(Article article);
    List<Article> getArticlesVendeur(String email);


    Article updateArticle(Long id, Article article);

    void deleteArticle(Long id);

    List<Article> getAllArticles();

    List<Article> getActiveArticles();

    List<Article> searchArticlesByKeyword(String keyword);

    List<Article> getArticlesBySeller(int sellerId);

    void closeAuction(int articleId);

    Article getArticleByUserId(String email);

    List<Article> getArticlesByDate(LocalDateTime localDate);

}
