import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/fr';
import { Link } from 'react-router-dom';

function Cadre({ article }) {
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  const source = `http://localhost:3000/${article.image}`;

  useEffect(() => {
    console.log(article);
  }, [])

  return (
    <div className="cadre ">
      <Link to={`/article/${article.id_article}`}>
        <img className="cadre-image" src={source} alt="Description de l'image" />
        </Link>
        <div className="cadre-content">
          <p style={{fontSize:'20px'}}>{article.description}</p>
          <div className="cadre-info">
            <p className="cadre-prix" style={{fontSize:'20px'}}>{article.prixMin} €</p>
            <p className="cadre-temps" style={{fontSize:'20px'}}>
              {timeLeft.days}d {timeLeft.hours}h: {timeLeft.minutes}m: {timeLeft.seconds}s
            </p>
          </div>
        </div>
      
    </div>
  );
}

export default Cadre;