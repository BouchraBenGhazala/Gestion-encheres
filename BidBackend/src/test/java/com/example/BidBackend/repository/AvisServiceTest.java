package com.example.BidBackend.repository;

import com.example.BidBackend.model.Article;
import com.example.BidBackend.model.Avis;
import com.example.BidBackend.repository.AvisRepository;
import com.example.BidBackend.service.AvisServiceImpl;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AvisServiceTest {

    @Autowired
    private AvisRepository avisRepository;


    @Test
    public void testSaveAvis() {
        Avis avis = new Avis();
        avis.setText("Test Avis Text");
        avis = avisRepository.save(avis);
        Optional<Avis> result = avisRepository.findById(avis.getId_avis());

        // Assertions
        assertTrue(result.isPresent());
        Assert.assertEquals("Test Avis Text", result.get().getText());
    }
}
