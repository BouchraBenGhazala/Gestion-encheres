package com.example.BidBackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder


@Entity
@JsonIgnoreProperties("avisList")
public class Utilisateur {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int id_utilisateur;
    @Column(name = "isVendorValue")
    private Boolean isVendor;
    private String email;
    private String lastName;
    private String firstName;
    private  String password;

    /*@OneToMany(mappedBy = "utilisateur")
    private List<Article> articles;
    @OneToMany(mappedBy = "utilisateur")
    private List<Article> articles2;*/
    @OneToMany(mappedBy = "utilisateur")
    private List<Avis> avisList;


    public String getFullName() {
        return this.lastName+" "+this.firstName;
    }
}
