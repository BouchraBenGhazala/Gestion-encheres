import React, { useEffect, useState } from 'react';
import Cadre from '../components/cadre';
import Header from '../components/header/header';

function Shop() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Effectuer la requête HTTP pour récupérer la liste des articles
    fetch('http://localhost:8080/article/getAll')
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Erreur lors de la récupération des articles', error));
  }, []);
  console.log(articles);

  return (
    <div>
        <Header/>
        <h1 style={{textAlign:'center'}}>Shop</h1>
        <div className="underline"></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {articles.map((article) => (
          <Cadre key={article.id_article} article={article} style={{ margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}

export default Shop;