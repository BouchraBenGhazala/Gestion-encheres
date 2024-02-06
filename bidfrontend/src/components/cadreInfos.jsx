import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './header/header';
import Footer from './Footer';

function CadreInfos() {
  const [prixPropose, setPrixPropose] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const[userPrix,setUserPrix]=useState('');
  const [user2, setUser2] = useState({});
  
  const [showForm, setShowForm] = useState(false);
  const [NvPrix, setNvPrix] = useState();
  const [nbEnrichisseurs, setNbEnrichisseurs] = useState(
    parseInt(localStorage.getItem('nbEnrichisseurs')) || 0
  );
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();
  const user=JSON.parse(sessionStorage.getItem("user"));
// console.log(user)
useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch article data
      const articleResponse = await fetch(`http://localhost:8080/article/${id}`);
      const articleData = await articleResponse.json();
      setArticle(articleData);
      console.log(article);
      setNvPrix(localStorage.getItem(`NvPrix_${articleData.id_article}`) || articleData.prixMin);
      setNbEnrichisseurs(
        parseInt(localStorage.getItem(`nbEnrichisseurs_${articleData.id_article}`)) || 0
      );

      // Fetch user data using the article ID
      const userResponse = await fetch(`http://localhost:8080/article/user/${id}`);
      const userData = await userResponse.json();
      setUser2(userData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  fetchData();
}, [id]);
       

  

  useEffect(() => {
    localStorage.setItem(`NvPrix_${article.id_article}`, NvPrix);
    localStorage.setItem(`nbEnrichisseurs_${article.id_article}`, nbEnrichisseurs.toString());
  }, [NvPrix, nbEnrichisseurs, article]);

  const handleAcheterClick = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && !user.isVendor) {
      setShowForm(true);
    } else {
      navigate('/authenticate');
    }
  };




  
  const calculateTimeLeft = () => {
    const difference = new Date(article.date_fin) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };
  const calculateDeadline = () => {
    const currentTime = new Date();
    const deadline = article.délai;
    const difference = deadline - currentTime;
    console.log("current time: "+currentTime.getHours());
    console.log("deadline "+currentTime.getHours());

    let timeDiff = {};

    if (difference > 0) {
      const minutes = Math.floor((difference / 1000) / 60);
      const seconds = Math.floor((difference / 1000) % 60);

      timeDiff = {
        minutes,
        seconds,
      };
    }

    return timeDiff;
  };

  const handleConfirmerClick = () => {
    const requestBody = {
      prixPropose,
      NvPrix,
      userId: user.email,
      articleID:article.id_article
    };
  
    fetch('http://localhost:8080/article/verifierPrix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accepte) {
          console.log('Prix accepté');
          setUserFirstName(user.firstName);
          setNvPrix(prixPropose);
          setNbEnrichisseurs(nbEnrichisseurs + 1);
        } else {
          if ((timeDiff.hours<=0 && timeDiff.minutes<=0 && timeDiff.seconds<=0)||( timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0)) 
          {
            
            // If the time is up, update the article status and disable the button
            fetch(`http://localhost:8080/article/updateStatut/${article.id_article}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ statut: 'Non disponible' }),
            })
              .then(response => response.json())
              .then(() => {
                alert('Le temps pour cette enchère est écoulé, l\'article est maintenant non disponible.');
                // Additional logic to disable the button or perform other actions
              })
              .catch((error) => {
                console.error('Erreur lors de la mise à jour du statut de l\'article :', error);
              });
          } else {
            alert('Le prix proposé doit être supérieur ou égal au prix minimum.');
          }
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la vérification du prix :', error);
      });
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timeDiff, setTimeDiff] = useState(calculateDeadline());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeDiff(calculateDeadline());
    }, 1000);

    return () => clearTimeout(timer);
  });
  useEffect(() => {
    setUserFirstName(user2.firstName);
    setUserPrix(article.prixMin);
  }, [user2, article]);

  const [isZoomed, setIsZoomed] = useState(false);

  const zoomIn = () => {
    setIsZoomed(true);
  };

  const zoomOut = () => {
    setIsZoomed(false);
  };
  
  
  return (
    <>
      <Header />
      <div className="cadre-titre">
        <h2>{article.nom_article}</h2>
      </div>
      <div className="nouveau-cadre-avec-image">
        <img
          src={`http://localhost:3000/${article.image}`}
          alt="Description de l'image"
          className={isZoomed ? 'cadre-image2 zoomed' : 'cadre-image2'}
          onMouseOver={zoomIn}
          onMouseOut={zoomOut}
        />
        <div>
          <div className="nouveau-cadre">
            <div className="nouveau-cadre-gris">
              <div className="nouveau-cadre-blanc">
                <p className="textCentrer">
                <p className="cadre-temps">
            {timeLeft.days}d {timeLeft.hours}h: {timeLeft.minutes}m: {timeLeft.seconds}s <br/>
          </p>
                </p>
                <br />
                <div className="nouveau-cadre-contenu">
                  <div className="petit">
                    <p>Offre Actuel :</p>
                    <p>
                      <b className="bb">{NvPrix}€</b>
                    </p>
                  </div>
                  <div className="petit">
                    <p>Enchérisseurs :</p>
                    <p>
                      <b className="bb"> {nbEnrichisseurs}</b>{' '}
                    </p>
                  </div>
                </div>
                {!showForm && (
  <div className="nouveau-cadre-boutons">
    <button
      className="cd-signin"
      type="button"
      onClick={handleAcheterClick}
    >
      Acheter
    </button>
  </div>
)}
                {showForm && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <label>
                      <b>Prix proposé :</b>
                      <input
                        type="number"
                        value={prixPropose}
                        onChange={(e) => setPrixPropose(e.target.value)}
                        style={{ margin: '10px', }} // Ajoutez cette ligne pour définir la marge à droite
                      />
                    </label>
                    <button
                      type="button"
                      className="cd-signin2"
                      onClick={handleConfirmerClick}
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
                
                
                )}
              </div>
              <div className="nouveau-cadre-info">
                <p className="nouveau-cadre-prix">
                
                   <b>{NvPrix} €</b> {userFirstName}
          
                </p>
                <p className="nouveau-cadre-temps">{article.date_fin}</p>
              </div>
              <div className="bgBlanc">
                <p>
                  Toutes nos enchères sont supervisées par une notaire
                </p>
                <hr></hr>
                <p>
                  Ce montant ne comprend pas le prix 6,50 € frais d'enchère
                  et le prix 6,99 € frais de livraison. Lorsque vous gagnez,
                  vous êtes tenu de payer. Pour plus d'informations, consulte
                  les conditions générales.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default CadreInfos;
