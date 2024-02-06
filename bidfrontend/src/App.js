import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Authenticate from './pages/authenticate';
import Shop from './pages/shop';
import CadreInfos from './components/cadreInfos';
import Vendeur from './pages/Vendeur';
import ArticleEdit from './pages/ArticleEdit';
import AjoutArticle from './pages/AjoutArticle';
import Reviews from './components/home/reviews';
import Avis from './components/home/Avis';


function App() {
  return (
    <Routes>
      <Route  index element={<Home />} />
      <Route path='/authenticate' element={<Authenticate />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/vendeur' element={<Vendeur />} />
      <Route path="/article/:id" element={<CadreInfos />} />
      <Route path="/edit-article/:id" element={<ArticleEdit />} />
      <Route path='/ajouter-article' element={<AjoutArticle />} />
      <Route path='/Avis' element={<Avis></Avis>}></Route>

    </Routes>
  );
}

export default App;
