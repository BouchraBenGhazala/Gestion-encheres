import React, { useState } from "react";
import Header from "../components/header/header";

const AjoutArticle = () => {
  const [nom_article, setNom_article] = useState('');
    const [date_debut, setDate_debut] = useState('');
    const [date_fin, setDate_fin] = useState('');
    const [délai, setDelai] = useState('');
    const [description, setDescription] = useState('');
    const [prixMin, setPrixMin] = useState(0);
    const [image,setImage]=useState(0);
    const [exist, setExist] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    

    const label = e.target.previousElementSibling;

    if (value === "") {
      label.classList.remove("active", "highlight");
    } else {
      label.classList.add("active", "highlight");
    }
  };

  const handleClick = (e) => {
    setExist(true);
    e.preventDefault();
    const user=JSON.parse(sessionStorage.getItem("user"));
    console.log("User ID:", user.email);
    const formData = new FormData();
    formData.append("image", image); 
    formData.append("nom_article", nom_article);
    formData.append("délai", délai);
    formData.append("description", description);
    formData.append("prixMin", prixMin);
    formData.append("date_debut", date_debut);
    formData.append("date_fin", date_fin);
    formData.append("email",user.email);
    console.log(formData);

    fetch("http://localhost:8080/article/add", {
        method: "POST",
        body: formData,
        mode: "cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.redirected) {
            // Effectuer une redirection côté client si nécessaire
            window.location.href = response.url;
        } else {
            // Continuer avec le traitement JSON
            return response.text().then(console.log);
        }
    })
    .then((data) => {
        console.log("New article added:", data);
    })
    .catch(error => {
        console.error('Fetch Error:', error);

        
    });
    
};

  return (
    <>
    <Header></Header>
    <div className="authenticate">
      <div className="form">
        <div className="tab-content">
          <div id="signup" style={{ display: "block"}}>
            <h1>Add New Article</h1>
            <form action="/" method="post"  enctype="multipart/form-data">
              <div className="field-wrap">
                <label>
                  Article Name<span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="nom_article"
                  required
                  autoComplete="off"
                  onChange={(e) => {                                       
                    handleInputChange(e);
                    setNom_article(e.target.value);
                }} />
                
              </div>

              <div className="field-wrap">
                <label className="highlight active">
                  Start Date<span className="req">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="date_debut"
                  required
                  onChange={(e) => {                                       
                    handleInputChange(e);
                    setDate_debut(e.target.value);
                }}
                />
              </div>

              <div className="field-wrap">
              <label className="highlight active">
                  End Date<span className="req">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="date_fin"
                  required
                  onChange={(e) => {                                       
                    handleInputChange(e);
                    setDate_fin(e.target.value);
                }}
                />
              </div>

              <div className="field-wrap">
              <label className="highlight active">
                  Deadline Time<span className="req">*</span>
                </label>
                <input
                  type="time"
                  name="délai"
                  required
                  onChange={(e) => {                                       
                    handleInputChange(e);
                    setDelai(e.target.value);
                }}
                />
              </div>
              <div className="field-wrap">
        <label htmlFor="image">Image:</label>
        <input type="file" name="image" accept="image/*" required onChange={(e) => { handleInputChange(e); setImage(e.target.files[0]); }} />
    </div>

              <div className="field-wrap">
                <label>
                  Description<span className="req">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  onChange={(e) => {                                       
                    handleInputChange(e);
                    setDescription(e.target.value);
                }}
                ></textarea>
              </div>

              <div className="field-wrap ">
                <label>
                  Minimum Price<span className="req">*</span>
                </label>
                <input
                  type="number"
                  name="prixMin"
                  required
                  onChange={(e) => {                                       
                    handleInputChange(e);
                    setPrixMin(e.target.value);
                }}
                />
              </div>

                                {exist === true &&
                                    <div className="alert alert-success">
                                        <strong>Article Ajoute </strong> felicitation!
                                    </div>
                                }

              <button
                type="submit"
                className="button button-block"
                onClick={handleClick}
              >
                Add Article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default AjoutArticle;
