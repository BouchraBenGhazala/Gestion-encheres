package com.example.BidBackend.controller;

import com.example.BidBackend.model.Article;
import com.example.BidBackend.model.Utilisateur;
import com.example.BidBackend.service.ArticleService;
import com.example.BidBackend.service.UtilisateurService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.net.http.HttpHeaders;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequestMapping("/article")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {
    @Autowired
    private ArticleService articleService;
    @Autowired
    private UtilisateurService utilisateurService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add", consumes = {MULTIPART_FORM_DATA_VALUE})
    public String createArticle(
            @RequestPart("image") MultipartFile imageFile,
            @RequestPart("nom_article") String nom_article,
            @RequestPart("délai") String délai,
            @RequestPart("description") String description,
            @RequestPart("prixMin") String prixMin,
            @RequestPart("date_debut") String date_debut,
            @RequestPart("date_fin") String date_fin,
            @RequestPart("email") String email) {

        try {

            Article article = new Article();
            article.setNom_article(nom_article);
            article.setDélai(LocalTime.parse(délai));
            article.setDescription(description);
            article.setPrixMin(Double.parseDouble(prixMin));
            article.setDate_debut(LocalDateTime.parse(date_debut, DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            article.setDate_fin(LocalDateTime.parse(date_fin, DateTimeFormatter.ISO_LOCAL_DATE_TIME));

            String relativePath = "bidfrontend/public/images";
            String directoryPath = new File(relativePath).getAbsolutePath();
            System.out.println(directoryPath);

            File directory = new File(directoryPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String imagePath = directoryPath + File.separator + imageFile.getOriginalFilename();
            imageFile.transferTo(new File(imagePath));

            article.setImage("images/" + imageFile.getOriginalFilename());

            Utilisateur user = utilisateurService.findByEmail(email);
            article.setUtilisateur(user);

            articleService.save(article);

        } catch (IOException e) {
            e.printStackTrace();
            return "Error processing/saving the article";
        }
        return "Article created successfully";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/edit/{id}", consumes = {MULTIPART_FORM_DATA_VALUE})
    public String editArticle(
            @PathVariable Long id,
            @RequestPart("image") MultipartFile imageFile,
            @RequestPart("nom_article") String nom_article,
            @RequestPart("délai") String délai,
            @RequestPart("description") String description,
            @RequestPart("prixMin") String prixMin,
            @RequestPart("date_debut") String date_debut,
            @RequestPart("date_fin") String date_fin,
            @RequestPart("email") String email
    ) {
        try {

            Article article = new Article();
            article.setId_article(id);
            article.setNom_article(nom_article);
            article.setDélai(LocalTime.parse(délai));
            article.setDescription(description);
            article.setPrixMin(Double.parseDouble(prixMin));
            article.setDate_debut(LocalDateTime.parse(date_debut, DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            article.setDate_fin(LocalDateTime.parse(date_fin, DateTimeFormatter.ISO_LOCAL_DATE_TIME));


            String relativePath = "bidfrontend/public/images";
            String directoryPath = new File(relativePath).getAbsolutePath();
            System.out.println(directoryPath);
            File directory = new File(directoryPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String imagePath = directoryPath + File.separator + imageFile.getOriginalFilename();
            imageFile.transferTo(new File(imagePath));
            System.out.println(imagePath);
            article.setImage("images/" + imageFile.getOriginalFilename());

            Utilisateur user = utilisateurService.findByEmail(email);
            article.setUtilisateur(user);

            articleService.save(article);

        } catch (IOException e) {
            e.printStackTrace();
            return "Error processing/saving the article";
        }
        return "Article created successfully";
    }


    @PostMapping("/verifierPrix")
    public ResponseEntity<?> verifierPrix(@RequestBody Map<String, Object> data) {
        String userEmail = (String) data.get("userId");
        Double prixPropose = Double.valueOf(data.get("prixPropose").toString());
        Double NvPrix = Double.valueOf(data.get("NvPrix").toString());
        Long articleID = ((Integer) data.get("articleID")).longValue();
        // Récupérez l'article de la base de données en fonction de l'ID de l'utilisateur
        Article article = articleService.findById(articleID);

        if (prixPropose > NvPrix) {
            article.setDateWithTime(LocalDateTime.now());
            article.setPrixMin(prixPropose);
            System.out.println("email : "+userEmail);
            Utilisateur user=utilisateurService.findByEmail(userEmail);
             article.setUtilisateur2(user);
            // Enregistrez l'article mis à jour dans la base de données
            articleService.save(article);

            return ResponseEntity.ok(Map.of("accepte", true));
        } else {
            return ResponseEntity.ok(Map.of("accepte", false));
        }
    }


    @PutMapping("/updateStatut/{id}")
    public ResponseEntity<?> updateArticleStatut(@PathVariable Long id, @RequestBody Map<String, String> data) {
        String statut = data.get("statut");

        try {
            Article article = articleService.findById(id);
            article.setStatut(statut);
            articleService.save(article);
            return ResponseEntity.ok(Map.of("message", "Statut de l'article mis à jour avec succès."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Erreur lors de la mise à jour du statut de l'article."));
        }
    }




    @GetMapping("/getAll")
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{id}")
    public Utilisateur getUserArticle(@PathVariable Long id){
        return utilisateurService.findByArticleId(id);
    }

    @GetMapping("/{id}")
    public Article getArticleById(@PathVariable Long id)
    {
        return articleService.findById(id);
    }

    /*@GetMapping("/vendeur/{email}")
    public List<Article> getArticleByIdVendeur(@PathVariable String email){return articleService.getArticlesVendeur(email);}*/
    @GetMapping("/vendeur")
    public ResponseEntity<List<Article>> getArticlesVendeurs(@RequestParam String email) {
        List<Article> articles = articleService.getArticlesVendeur(email);
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    /*@GetMapping("/vendeur")
    public List<Article> getArticlesVendeur(@RequestParam String email){
        System.out.println(email);
        return articleService.getArticlesVendeur(email);
    }*/
    /*
    @GetMapping("/vendeur")
    public List<Article> getArticlesVendeur(@RequestParam String email){
        System.out.println(email);
        return articleService.getArticlesVendeur(email);
    }

     */
    @DeleteMapping("/delete/{id}")
    public String deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return "Article deleted";
    }

    @PutMapping("/update/{id}")
    public String updateArticle(@PathVariable Long id, @RequestBody Article article) {
        articleService.updateArticle(id, article);
        return "Article updated";
    }

    @GetMapping("/recent")
    public List<Article> getRecentArticles() {
        // Calculate the date 3 days ago from today
        LocalDateTime threeDaysAgo = LocalDateTime.now().minusDays(1);
        System.out.println(threeDaysAgo);

        // Retrieve articles published in the last 3 days
         List<Article> recentArticles = articleService.getArticlesByDate(threeDaysAgo);

        return recentArticles;
    }
}
