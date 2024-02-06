import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/header';

const ArticleEdit = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [nom_article, setNom_article] = useState('');
  const [date_debut, setDate_debut] = useState('');
  const [date_fin, setDate_fin] = useState('');
  const [délai, setDelai] = useState('');
  const [description, setDescription] = useState('');
  const [prixMin, setPrixMin] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8080/article/${id}`);
        const data = await response.json();
        setArticle(data);

        // Mettez à jour les états avec les valeurs de l'article
        setNom_article(data.nom_article);
        setDate_debut(data.date_debut);
        setDate_fin(data.date_fin);
        setDelai(data.délai);
        setDescription(data.description);
        setPrixMin(data.prixMin);
        // Note: Vous devrez peut-être traiter l'image différemment
      } catch (error) {
        console.error('Error fetching article for editing:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleInputChange = (input) => {

    const label = input.target.previousElementSibling;


    if (input.target.value === "") {
      label.classList.remove("active", "highlight");
    } else {
      label.classList.add("active", "highlight");
    }

  };

  const handleEdit = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const formData = new FormData();
    formData.append("image", image);
    formData.append("nom_article", nom_article);
    formData.append("délai", délai);
    formData.append("description", description);
    formData.append("prixMin", prixMin);
    formData.append("date_debut", date_debut);
    formData.append("date_fin", date_fin);
    formData.append("email", user.email);

    fetch(`http://localhost:8080/article/edit/${id}`, {
      method: "PUT",
      body: formData,
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Article updated:", data);
        // Vous pouvez rediriger ou effectuer d'autres actions ici
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
      });
  };

  return (
    <>
    <Header></Header>
      <div className="authenticate">
        <div className="form">
          <div className="tab-content">
            <div id="signup" style={{ display: "block" }}>
              <h1>Edit Article</h1>
              {article ? (
                <form action="/" method="post" enctype="multipart/form-data">
                  <div className="field-wrap">
                    <label className='highlight active'>Article Name</label>
                    <input
                      type="text"
                      name="nom_article"
                      required
                      value={nom_article}
                      onChange={(e) => {
                        handleInputChange(e);
                        setNom_article(e.target.value);
                      }}
                    />
                  </div>

                  <div className="field-wrap">
                    <label className='highlight active'>Start Date</label>
                    <input
                      type="datetime-local"
                      name="date_debut"
                      required
                      value={date_debut}
                      onChange={(e) => {
                        handleInputChange(e);
                        setDate_debut(e.target.value);
                      }}
                    />
                  </div>

                  <div className="field-wrap">
                    <label className='highlight active'>End Date</label>
                    <input
                      type="datetime-local"
                      name="date_fin"
                      required
                      value={date_fin}
                      onChange={(e) => {
                        handleInputChange(e);
                        setDate_fin(e.target.value);
                      }}
                    />
                  </div>

                  <div className="field-wrap">
                    <label className='highlight active'>Deadline Time</label>
                    <input
                      type="time"
                      name="délai"
                      required
                      value={délai}
                      onChange={(e) => {
                        handleInputChange(e);
                        setDelai(e.target.value);
                      }}
                    />
                  </div>

                  <div className="field-wrap">
                    <label htmlFor="image" className='highlight active'>Image:</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      required
                      onChange={(e) => {
                        handleInputChange(e);
                        setImage(e.target.files[0]);
                      }}
                    />
                  </div>

                  <div className="field-wrap">
                    <label className='highlight active'>Description</label>
                    <textarea
                      name="description"
                      required
                      value={description}
                      onChange={(e) => {
                        handleInputChange(e);
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="field-wrap">
                    <label className='highlight active'>Minimum Price</label>
                    <input
                      type="number"
                      name="prixMin"
                      required
                      value={prixMin}
                      onChange={(e) => {
                        handleInputChange(e);
                        setPrixMin(e.target.value);
                      }}
                    />
                  </div>

                  <button type="submit" className="button button-block" onClick={handleEdit}>
                    Save Changes
                  </button>
                </form>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default ArticleEdit;
