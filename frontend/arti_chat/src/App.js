import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

import 'react-toastify/dist/ReactToastify.css';
import  Article  from './pages/Article';
import EditProfile from './pages/EditProfile';
import UserList from './pages/UserList';
import ArticleList from './pages/ArticleListe';
import AllArticle from './pages/AllArticle';
import ArticleDetails from './pages/ArticleDetails';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article" element={<Article />} />
          <Route path="/editprofile" element={<EditProfile/>}/>
            <Route path="/Profile/userlist" element={<UserList/>}/>
            <Route path="/Profile/articleliste" element={<ArticleList/>}/>
            <Route path="/articles" element={<AllArticle />} />
        <Route path="/ArticleDetails/:id" element={<ArticleDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;