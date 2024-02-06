package com.example.BidBackend.repository;

import com.example.BidBackend.model.Avis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvisRepository  extends JpaRepository<Avis, Integer> {
}
