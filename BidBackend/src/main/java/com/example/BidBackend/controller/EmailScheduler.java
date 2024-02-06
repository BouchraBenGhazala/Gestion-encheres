package com.example.BidBackend.controller;

import com.example.BidBackend.model.Article;
import com.example.BidBackend.service.ArticleService;
import com.example.BidBackend.service.ContratDeVenteService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@EnableScheduling
public class EmailScheduler {

    private final ArticleService articleService;
    private ContratDeVenteService contratDeVenteService;

    public EmailScheduler(ArticleService articleService ,ContratDeVenteService contratDeVenteService) {
        this.articleService = articleService;
        this.contratDeVenteService=contratDeVenteService;
    }


    @Scheduled(fixedRate = 20000)
    public void checkAndSendEmails() {
        List<Article> articles = articleService.getAllArticles();

        for (Article article : articles) {
            LocalDateTime scheduledDate = article.getDate_fin();
            LocalDateTime currentDate = LocalDateTime.now();

            if (!article.getIsEmailSent() && !currentDate.isBefore(scheduledDate) && article.getUtilisateur2() != null) {
                String text = "Bonjour " + article.getUtilisateur2().getLastName() + " " + article.getUtilisateur2().getFirstName() +
                        ", " + "Nous vous informons que vous êtes le gagnant de l'article " +
                        article.getNom_article() + ". Vous pouvez contacter le vendeur " +
                        article.getUtilisateur().getEmail();

                contratDeVenteService.sendEmail(article.getUtilisateur2().getEmail(), "Confirmation de vente", text);

                String text2 = "Bonjour " + article.getUtilisateur().getLastName() + " " + article.getUtilisateur().getFirstName() +
                        ", " + "Nous vous informons que votre article " +
                        article.getNom_article() + " est vendu. Vous pouvez contacter l'acheteur " +
                        article.getUtilisateur2().getEmail();

                contratDeVenteService.sendEmail(article.getUtilisateur().getEmail(), "Confirmation de vente", text2);

                // Set the emailSent flag to true to indicate that emails have been sent for this article
                article.setIsEmailSent (true);
                // Save the updated article in the database
                articleService.save(article);
            }
        }
    }
    @Autowired
    private JavaMailSender javaMailSender;
    @Scheduled(fixedRate = 30000)
    public void checkAndSendEmails2() throws MessagingException, IOException {
        List<Article> articles = articleService.getAllArticles();

        for (Article article : articles) {
            LocalDateTime scheduledDate = article.getDate_fin();
            LocalDateTime currentDate = LocalDateTime.now();

           if ( !currentDate.isBefore(scheduledDate) && article.getUtilisateur2() != null) {
                // Generate PDF content
                byte[] pdfContent = this.contratDeVenteService.getContractsForUser(article);

                // Prepare email message
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

                String text = "Bonjour " + article.getUtilisateur2().getLastName() + " " + article.getUtilisateur2().getFirstName() +
                        ", " + "Nous vous informons que vous êtes le gagnant de l'article " +
                        article.getNom_article() + ". Vous pouvez contacter le vendeur " +
                        article.getUtilisateur().getEmail();

                helper.setTo(article.getUtilisateur2().getEmail());
                helper.setSubject("Confirmation de vente");
                helper.setText(text);

                // Attach the PDF
                helper.addAttachment("ConfirmationDeVente.pdf", new ByteArrayResource(pdfContent));

                // Send the email
                javaMailSender.send(mimeMessage);


                String text2 = "Bonjour " + article.getUtilisateur().getLastName() + " " + article.getUtilisateur().getFirstName() +
                        ", " + "Nous vous informons que votre article " +
                        article.getNom_article() + " est vendu. Vous pouvez contacter l'acheteur " +
                        article.getUtilisateur2().getEmail();

                // Prepare another email message for the seller
                MimeMessage mimeMessage2 = javaMailSender.createMimeMessage();
                MimeMessageHelper helper2 = new MimeMessageHelper(mimeMessage2, true);

                helper2.setTo(article.getUtilisateur().getEmail());
                helper2.setSubject("Confirmation de vente");
                helper2.setText(text2);

                // Attach the PDF to the second email
                helper2.addAttachment("ConfirmationDeVente.pdf", new ByteArrayResource(pdfContent));

                // Send the second email
                javaMailSender.send(mimeMessage2);

                // Set the emailSent flag to true to indicate that emails have been sent for this article
                article.setIsEmailSent(true);
                articleService.deleteArticle(article.getId_article());
                System.out.println("id = " + article.getId_article());

        }}
    }



}
