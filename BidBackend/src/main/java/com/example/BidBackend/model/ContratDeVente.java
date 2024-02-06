package com.example.BidBackend.model;

import jakarta.persistence.*;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContratDeVente {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int id_contrat;
    private Date contrat;
    private double prix_final;



}