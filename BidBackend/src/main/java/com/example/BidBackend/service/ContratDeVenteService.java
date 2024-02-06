package com.example.BidBackend.service;

import com.example.BidBackend.model.Article;
import com.example.BidBackend.model.ContratDeVente;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public interface ContratDeVenteService {

    byte[] getContractsForUser(Article article ) throws IOException;

    ContratDeVente generateSaleContract(long articleId, int buyerId);
    public ContratDeVente save(ContratDeVente contratDeVente);

    ContratDeVente findById(int id);
    void sendEmail(String toEmail,String subject,String body);



    // Ajoutez d'autres méthodes spécifiques aux contrats de vente selon vos besoins
}
