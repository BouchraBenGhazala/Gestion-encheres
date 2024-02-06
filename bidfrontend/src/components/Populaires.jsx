import React, { useEffect, useState } from 'react';
import Cadre from '../components/cadre';
import Header from '../components/header/header';

function Populaires() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Effectuer la requête HTTP pour récupérer la liste des articles
    fetch('http://localhost:8080/article/getAll')
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Erreur lors de la récupération des articles', error));
  }, []);
  // console.log(articles);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {articles.slice(0, 3).map((article) => (
  <Cadre key={article.id_article} article={article} style={{ margin: '10px' }} />
))}
      </div>
    </div>
  );
}

export default Populaires;