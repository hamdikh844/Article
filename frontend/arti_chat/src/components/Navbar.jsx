import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-comment-dots me-2 fs-3 text-primary"></i>
          <span className="fs-4 fw-bold text-white">Arti Chat</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item mx-2">
              <Link className="nav-link px-3 py-2 rounded" to="/" aria-current="page">
                <i className="fas fa-home me-2"></i>HOME
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link px-3 py-2 rounded" to="/about">
                <i className="fas fa-info-circle me-2"></i>ABOUT
              </Link> 
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link px-3 py-2 rounded" to="/Service">
                <i className="fas fa-cogs me-2"></i>SERVICE
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link btn btn-primary text-white px-3 py-2 rounded-pill" to="/Register">
                <i className="fas fa-user-plus me-2"></i>Your Profile
              </Link>
            </li>
            <li className="nav-item mx-2 d-flex align-items-center">
              <Link className="nav-link text-warning fs-4" to="/chat">
                <i className="fas fa-comment-alt"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}