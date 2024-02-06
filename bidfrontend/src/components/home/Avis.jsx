import React from 'react'
import { useState ,useEffect } from 'react';
import Header from '../header/header';
import Reviews from './reviews';
export default function Avis() {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchDataFromServer = async () => {
          try {
            const response = await fetch("http://localhost:8080/avis/getAll");
            const result = await response.json();
            //console.log(result);
            setReviews(result);
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchDataFromServer();
      }, []);
  return (
    <>
    <Header/>
    <Reviews avis={reviews} />
    </>
  )
}
