package com.example.BidBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
public class Article {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id_article;
    private String nom_article;
    private String image;
    private LocalDateTime date_debut;
    private LocalDateTime date_fin;
    private LocalTime délai;
    private String description;
    private double prixMin;
    private boolean isEmailSent=false;
    private String statut;
    private LocalDateTime dateWithTime;

    @OneToOne
    @JoinColumn(name = "id_avis")
    private Avis avis;


    @OneToOne
    @JoinColumn(name="id_contrat")
    private ContratDeVente contratDeVente;


    @ManyToOne
    @JoinColumn(name="id_utilisateur")
    @JsonBackReference
    private Utilisateur utilisateur;
    @ManyToOne
    @JoinColumn(name="id_utilisateur2")
    @JsonBackReference
    private Utilisateur utilisateur2;

    public boolean getIsEmailSent() {
        return this.isEmailSent;
    }

    public void setIsEmailSent(boolean b) {
        this.isEmailSent=b;
    }
}