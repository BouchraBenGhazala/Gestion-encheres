package com.example.BidBackend.repository;
import com.example.BidBackend.model.Article;
import com.example.BidBackend.model.Avis;
import com.example.BidBackend.model.ContratDeVente;
import com.example.BidBackend.repository.AvisRepository;
import com.example.BidBackend.service.AvisServiceImpl;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.Optional;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ContratDeVenteRepositoryTest {

    @Autowired
    private ContratDeVenteRepository contratDeVenteRepository;

    @Test
    public void testSaveContratDeVente() {
        Article article =new Article();
        ContratDeVente contratDeVente = new ContratDeVente();
        contratDeVente.setPrix_final(1000);
        Date date=new Date();
        contratDeVente.setContrat(date);
        contratDeVente = contratDeVenteRepository.save(contratDeVente);
        Optional<ContratDeVente> result = contratDeVenteRepository.findById(contratDeVente.getId_contrat());

        // Assertions
        assertTrue(result.isPresent());
        Assert.assertEquals(1000, result.get().getPrix_final(),0.001);
    }
}
