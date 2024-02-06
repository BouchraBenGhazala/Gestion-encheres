package com.example.BidBackend.service;
import com.example.BidBackend.model.Article;
import com.example.BidBackend.model.ContratDeVente;
import com.example.BidBackend.repository.ContratDeVenteRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ContratDeVenteServiceImpl implements ContratDeVenteService {

    @Autowired
    private ContratDeVenteRepository contratDeVenteRepository;


    @Override
    public ContratDeVente generateSaleContract(long articleId, int buyerId) {
        return null;
    }

    @Override
    public ContratDeVente save(ContratDeVente contratDeVente) {
        return contratDeVenteRepository.save(contratDeVente);
    }

    @Override
    public ContratDeVente findById(int id) {
        Optional<ContratDeVente> optionalContratDeVente = contratDeVenteRepository.findById(id);
        return optionalContratDeVente.orElse(null);
    }



    public byte[] getContractsForUser(Article article) throws IOException, DocumentException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
        document.open();

        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);
        Paragraph title = new Paragraph("Contrat De Vente", fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);

        Font fontContent = FontFactory.getFont(FontFactory.HELVETICA);
        fontContent.setSize(12);

        // Add contract details
        Paragraph contractDetails = new Paragraph();
        contractDetails.add(new Paragraph("Date: " + LocalDate.now().toString(), fontContent));
        contractDetails.add(new Paragraph("Vendeur: " + article.getUtilisateur().getFullName(), fontContent));
        contractDetails.add(new Paragraph("Acheteur: " + article.getUtilisateur2().getFullName(), fontContent));
        contractDetails.add(new Paragraph("Article: " + article.getNom_article(), fontContent));

        // Add terms and conditions
        Paragraph termsAndConditions = new Paragraph();
        termsAndConditions.add(new Paragraph("Termes et conditions:", fontTitle));
        termsAndConditions.add(new Paragraph("1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", fontContent));
        termsAndConditions.add(new Paragraph("2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", fontContent));

        document.add(title);
        document.add(Chunk.NEWLINE); // Add a blank line
        document.add(contractDetails);
        document.add(Chunk.NEWLINE);
        document.add(termsAndConditions);

        document.close();
        writer.close();

        return byteArrayOutputStream.toByteArray();
    }


    @Autowired
    private JavaMailSender mailSender;



    public void sendEmail(String toEmail,String subject,String body){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom("nadiahanine19@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
        System.out.println("mail sent succesfully rorororory");

    }
/*


    private void sendBuyerEmail(int buyerId, ContratDeVente contratDeVente) {
        // Logique pour récupérer les informations de l'acheteur
        // ...

        // Génération du contenu de l'e-mail
        String emailContent = "Bonjour " + buyerName + ",\n\n";
        emailContent += "Merci d'avoir effectué l'achat. Vous trouverez ci-joint le contrat de vente.";

        // Envoi de l'e-mail
        emailUtil.sendEmail(buyerEmail, "Confirmation d'achat", emailContent, contratDeVente.getPdfContent());
    }

    private void sendSellerEmail(long articleId, ContratDeVente contratDeVente) {
        // Logique pour récupérer les informations du vendeur
        // ...

        // Génération du contenu de l'e-mail
        String emailContent = "Bonjour " + sellerName + ",\n\n";
        emailContent += "Félicitations! Votre article a été vendu. Vous trouverez ci-joint le contrat de vente.";

        // Envoi de l'e-mail
        emailUtil.sendEmail(sellerEmail, "Confirmation de vente", emailContent, contratDeVente.getPdfContent());
    }*/
}
