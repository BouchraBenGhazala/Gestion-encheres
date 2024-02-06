// Home.jsx


import React, { useEffect, useState } from "react";
import Header from "../components/header/header";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../dependecies/images/500-2 (1).jpg";
import image2 from "../dependecies/images/500.jpg";
import image3 from "../dependecies/images/600.jpg";
import { useNavigate } from "react-router-dom";
import Reviews from "../components/home/reviews";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Cadre from "../components/cadre";
import Footer from "../components/Footer";
import Populaires from "../components/Populaires";
import Avis from "../components/home/Avis";
import review from '../dependecies/images/reviews.jpg'
import enchere from '../dependecies/images/enchere.jpg'




export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setAvis] = useState('');
  const [reviews, setReviews] = useState([]);
  const [recent, setRecent] = useState([]);
  const [isVendor, setIsVendor] = useState(false);
  const navigate = useNavigate();

  const handleCarouselSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);

  };

  const handleSumit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser) {
      const user_id = currentUser.id_utilisateur;
      const avis = { text, utilisateur: { id_utilisateur: user_id } };
      console.log(avis);
      const response = await fetch("http://localhost:8080/avis/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(avis)
      })
        .then(console.log("Avis Added successefly"))

    } else
      navigate('/authenticate');
    
    setAvis('');
  }



  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const response = await fetch("http://localhost:8080/article/recent");
        const result = await response.json();
        console.log(result);
        setRecent(result);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromServer();
  }, []);
  // console.log(reviews)

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('user')) !== null)
      setIsVendor(JSON.parse(sessionStorage.getItem('user')).isVendor);


    console.log(isVendor);
  })

  return (
    <>
      <div>
        <Header />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Carousel onSelect={handleCarouselSelect}>
              <Carousel.Item>
                <img src={image1} alt="Image 1" className="image-carousel" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={image2} alt="Image 2" className="image-carousel" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={image3} alt="Image 3" className="image-carousel" />
              </Carousel.Item>
            </Carousel>
          </div>
          <div style={{ flex: 1 }} className="flex2">
            <h1 className="TitreHome">
              Explorez l'Exclusivité: Enchères en Ligne Exceptionnelles
              {/* {user.id_utilisateur} */}
            </h1>
            <p className="SubTitreHome">
              Rejoignez notre communauté passionnée et plongez dans le frisson des
              enchères en ligne pour des acquisitions inoubliables.
            </p>
            <div style={{ display: "flex" }}>
              {[image1, image2, image3].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Small Image ${index + 1}`}
                  className={`image-carousel2 ${currentIndex === index ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
          {/* <h1 className="Titre1">Récemment publiés</h1>
          <div style={{ display: "flex", overflow: 'scroll' }}>
                {recent.map((articlee, index) => {
                  <Cadre article={articlee} />
                })}
          </div >
          <h1 className="Titre1">Plus populaires</h1>
          <div style={{ display: "flex" }}>
          </div > */}

        </div>

        {/* section recent */}
        <div className="mt-4 section-recent py-3">
          <h1 className="Titre1 my-4">Récemment publiés</h1>
          <div className="underline"></div>
          <div style={{ display: "flex", overflowX: 'scroll', scrollbarWidth: 'none' }} className="recent">
            {recent.map((articlee, index) => (
              <div key={index} style={{ flex: '0 0 auto' }} className="mx-2">
                <Cadre article={articlee} />
              </div>
            ))}
          </div >
        </div>

        {/* section Plus populaire */}
        <div className="mt-4  py-3">
          <h1 className="Titre1  my-4">Plus populaires</h1>
          <div className="underline"></div>
          <Populaires></Populaires>
        </div>


        <div className="section-go p-4 text-center">
          <h1 className="Titre1  my-3">Go To</h1>
          <div className="underline my-3"></div>
          <div className="text-link-items row">
            {/* 1 lien */}
            {!isVendor && isVendor !== null ?
              <div className="text-link-item col-md-6 col-lg-6" onClick={() => window.location.href = "/shop"} style={{ backgroundImage: `url(${enchere})` }}>
                <p >Participation A L'Enchere </p>
              </div>
              :
              <></>
            }

            {/* 2 lien */}
            <div className={`text-link-item  ${!isVendor && isVendor !== null ? 'col-md-6 col-lg-6' : 'mx-auto col-md-12 col-lg-12'}`} onClick={() => window.location.href = "/Avis"} style={{ backgroundImage: `url(${review})` }}>
              <p >Consulter Avis </p>
            </div>
          </div>
        </div>


        <div>
          <h1 className="Titre1 my-3">Donner votre avis sur le site</h1>
          <div className="underline"></div>
          <form className="avis-form mt-4" action="POST" onSubmit={handleSumit}>
            <label htmlFor="avis-text">Donner avis</label>
            <textarea
              id="avis-text"
              className="avis-textarea"
              name="description"
              required
              onChange={(e) => {
                setAvis(e.target.value);
              }}
              value={text}
            ></textarea>
            <input type="submit" className="cd-signin" value="Submit Avis" />
          </form>
          <br></br>
        </div>


      </div>
      <Footer></Footer>
    </>
  )
}