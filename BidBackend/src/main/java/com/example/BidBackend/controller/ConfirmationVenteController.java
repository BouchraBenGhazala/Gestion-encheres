package com.example.BidBackend.controller;

import com.example.BidBackend.service.ContratDeVenteService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/confirmation-vente")
public class ConfirmationVenteController {

    private final ContratDeVenteService contratDeVenteService;

    public ConfirmationVenteController(ContratDeVenteService contratDeVenteService){

        this.contratDeVenteService = contratDeVenteService;
    }
    /*
    @GetMapping("pdf/generate")
    public void generatePDF(HttpServletResponse response) throws IOException {
        try {
        response.setContentType("application/pdf");
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String currentDateTime = dateFormat.format(new Date());


            String headerKey="Content-Disposition";
        String headerValue = "attachment;filename=pdf" + currentDateTime + ".pdf";
        response.setHeader(headerKey,headerValue);

        this.contratDeVenteService.getContractsForUser(response);


        } catch (Exception e) {
             response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/email")
    public void sendMail(){
        contratDeVenteService.sendEmail("ghazalabouchra@gmail.com","test","ahlan wa sahlan");
    }*/
/*
    @Scheduled(fixedRate = 1000)
    public void checkAndSendEmails() {
        Date currentDate = new Date();
        Date targetDate = // your target date;

        if (currentDate.after(targetDate)) {
            // Trigger the logic to send an email
            sendEmail();
        }
    }

    private void sendEmail() {
        // Implement your logic to send an email
        System.out.println("Sending email...");
    }*/

    /*
    @Autowired
    private ArticleService articleService;

    @Autowired
    private ContratDeVenteService contratDeVenteService;

    @PostMapping("/confirmer-vente/{articleId}")
    public ContratDeVente confirmerVente(@PathVariable Long articleId) {
        // Récupérer l'article par son ID
        Article article = articleService.findById(articleId);

        if (article == null) {
            // Gérer le cas où l'article n'est pas trouvé
            // Vous pouvez renvoyer une erreur appropriée ou effectuer une autre action
            return null;
        }

        // Implémenter la logique de confirmation de la vente
        // Cela peut inclure la génération d'un contrat de vente
        ContratDeVente contratDeVente = contratDeVenteService.generateSaleContract(article.getId_article(), article.getUtilisateur().getId_utilisateur());

        // Mettre à jour le statut de l'article ou effectuer d'autres actions nécessaires
        article.setStatut("Vendu");
        articleService.save(article);

        return contratDeVente;
    }*/
}

