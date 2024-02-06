package com.example.BidBackend.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import com.example.BidBackend.model.Avis;
import com.example.BidBackend.model.ContratDeVente;
import com.example.BidBackend.model.Utilisateur;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import com.example.BidBackend.model.Article;
import com.example.BidBackend.repository.ArticleRepository;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ArticleRepositoryTest {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private AvisRepository avisRepository;

    @Autowired
    private ContratDeVenteRepository contratDeVenteRepository;



    @Test
    public void testFindById() {
        // Insert test data into the database
        Article article = new Article();
        article.setDescription("Test Description");
        article.setStatut("disponible");
        article.setPrixMin(500);
        Time delai=new Time(00,05,00);
        article.setDélai(delai);
        Date date_debut=new Date(2024,01,11);
        Date date_fin=new Date(2024,01,12);
        article.setDate_debut(date_debut);
        article.setDate_fin(date_fin);
        article.setNom_article("article 1");

        //TEST Utilisateur
        Utilisateur user1= new Utilisateur();
        user1.setEmail("bouchra@gmail.com");
        user1.setEst_vendeur(true);
        user1.setNom_utilisateur("Benghazala");
        user1.setPrenom_utilisateur("Bouchra");

        utilisateurRepository.save(user1);

        article.setUtilisateur(user1);

        //Avis

        Avis avis = new Avis();
        avis.setText("Test Avis Text");
        avis = avisRepository.save(avis);

        article.setAvis(avis);



        //Contrat de vente
        ContratDeVente contratDeVente = new ContratDeVente();
        contratDeVente.setPrix_final(1000);
        Date date=new Date();
        contratDeVente.setContrat(date);
        contratDeVente = contratDeVenteRepository.save(contratDeVente);
        article.setContratDeVente(contratDeVente);


        article = articleRepository.save(article);

        // Perform the repository query
        Optional<Article> result = articleRepository.findById(article.getId_article());
        Optional<Utilisateur> result2 = utilisateurRepository.findById(user1.getId_utilisateur());
        Optional<Avis> resultAvis = avisRepository.findById(avis.getId_avis());
        Optional<ContratDeVente> resultContrat = contratDeVenteRepository.findById(contratDeVente.getId_contrat());


        // Assertions
        assertTrue(result.isPresent());
        assertTrue(result2.isPresent());
        assertTrue(resultAvis.isPresent());
        assertTrue(resultContrat.isPresent());


        Assert.assertEquals(1000, resultContrat.get().getPrix_final(),0.001);
        assertEquals("Test Description", result.get().getDescription());
        assertEquals("bouchra@gmail.com", result2.get().getEmail());
        assertEquals("Test Avis Text", resultAvis.get().getText());

    }
}
