import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const ArticleVendeur = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    console.log(sessionStorage.getItem('user'));
    // fetch(`http://localhost:8080/article/vendeur?id=${ema}`)
    //   .then((response) => response.json())
    //   .then((data) => setArticles(data))
    //   .catch((error) => console.error('Erreur lors de la récupération des articles', error));
    const user=JSON.parse(sessionStorage.getItem("user"));
    fetch(`http://localhost:8080/article/vendeur/${user.email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Check if data is not null or undefined before setting the state
        if (data) {
          setArticles(data);
        }
      })
      .catch((error) => console.error('Erreur lors de la récupération des articles', error));
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIdAsInt = parseInt(user.id_utilisateur, 10);

        if (isNaN(userIdAsInt) || !user.isVendor) {
          navigate('/authenticate');
          return;
        }

        const response = await fetch(`http://localhost:8080/article/vendeur?email=${user.email}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleDelete = async (articleId) => {
    try {
      await fetch(`http://localhost:8080/article/delete/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setArticles((prevArticles) => prevArticles.filter((article) => article.id_article !== articleId));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-article/${id}`);
  };

  return (
    <div className="seller-article-table-container">
      <h2>Seller Article Table</h2>
      <table className="seller-article-table">
        <thead>
          <tr>
            <th>Article ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Delai</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id_article}>
              <td>{article.id_article}</td>
              <td>{article.nom_article}</td>
              <td>{article.description}</td>
              <td>{article.prixMin}</td>
              <td>{article.date_debut}</td>
              <td>{article.date_fin}</td>
              <td>{article.délai}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(article.id_article)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button className="edit-button" onClick={() => handleEdit(article.id_article)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleVendeur;
