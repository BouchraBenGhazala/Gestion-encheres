package com.example.BidBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Avis {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int id_avis;
    private String text;

    /*
    @OneToOne
    @JoinColumn(name = "id_article")
    private Article article;

     */

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

}
