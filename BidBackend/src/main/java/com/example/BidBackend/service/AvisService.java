package com.example.BidBackend.service;

import com.example.BidBackend.model.Avis;

import java.util.List;

public interface AvisService {

    Avis save(Avis avis);

    Avis findById(int id);

    //List<Avis> getAvisForUser(int userId);

    List<Avis> getAll();

    // Ajoutez d'autres méthodes spécifiques aux avis selon vos besoins
}
