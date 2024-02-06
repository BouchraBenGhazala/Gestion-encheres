import React, { useEffect, useState } from 'react';
import Cadre from '../components/cadre';
import Header from '../components/header/header';
import AjoutArticle from './AjoutArticle';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleVendeur from '../components/ArticleVendeur';

function Vendeur() {
    const user = JSON.parse(sessionStorage.getItem("user"));


    const { id } = useParams();
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    console.log(JSON.parse(sessionStorage.getItem("user")).email);
    useEffect(() => {
        const fetchData = async () => {
            // Check if the user is authenticated as a vendor
            const userIdAsInt = parseInt(user.id_utilisateur, 10);

            // Check if the conversion is successful and userIdAsInt is a valid integer
            if (!isNaN(userIdAsInt)) {
                // Use userIdAsInt where you need the integer value
                console.log("User ID as Integer:", userIdAsInt);
            } else {
                console.error("Unable to convert User ID to integer");
            }
            if (!user || !user.isVendor) {
                // Redirect to the authentication page or another suitable page
                navigate('/authenticate'); // Adjust the route as needed
                return;
            }

            // Fetch articles if the user is authenticated as a vendor
            const vendeur = await fetch(`http://localhost:8080/article/vendeur?email=${user.email}`);
            const response = await vendeur.json();
            setArticles(response);
            console.log(response);
            // .then((response) => response.json())
            // .then((data) => setArticles(data))
            // .catch((error) => console.error('Erreur lors de la récupération des articles', error));
        }
        fetchData();

    }, [id, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            // Check if the user is authenticated as a vendor
            const userIdAsInt = parseInt(user.id_utilisateur, 10);

            // Check if the conversion is successful and userIdAsInt is a valid integer
            if (!isNaN(userIdAsInt)) {
                // Use userIdAsInt where you need the integer value
                console.log("User ID as Integer:", userIdAsInt);
            } else {
                console.error("Unable to convert User ID to integer");
            }
            if (!user || !user.isVendor) {
                // Redirect to the authentication page or another suitable page
                navigate('/authenticate'); // Adjust the route as needed
                return;
            }

            // Fetch articles if the user is authenticated as a vendor
            const vendeur = await fetch(`http://localhost:8080/article/vendeur?email=${user.email}`);
            const response = await vendeur.json();
            setArticles(response);
            console.log(response);
            // .then((response) => response.json())
            // .then((data) => setArticles(data))
            // .catch((error) => console.error('Erreur lors de la récupération des articles', error));
        }
        fetchData();

    }, [id, navigate]);
    // console.log(articles);

    return (
        <div>
            <Header />
            <ArticleVendeur></ArticleVendeur>
 
        </div>
    );
}

export default Vendeur;
