import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Home = () => {
  return (
    <div className="bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="bi bi-book me-2"></i>
            History of Writing
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <i className="bi bi-house-door me-1"></i>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-building me-1"></i>
                  Ancient Texts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-person-vcard me-1"></i>
                  First Authors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white py-5 mb-5">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-lg-12 text-center">
              <h1 className="display-4 fw-bold">
                <i className="bi bi-journal-bookmark me-3"></i>
                The History of Articles
              </h1>
              <p className="lead mb-0">From clay tablets to digital media</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            {/* Origins Section */}
            <section className="mb-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h2 className="card-title text-center mb-4">
                    <i className="bi bi-hourglass-split me-2"></i>
                    The Origins of Written Articles
                  </h2>
                  <p className="card-text lead">
                    The concept of articles as we know them today has ancient roots. The earliest forms of 
                    written articles can be traced back to ancient civilizations where scribes recorded 
                    information on clay tablets, papyrus, and other early writing surfaces.
                  </p>
                  
                  <div className="mt-4">
                    <h3 className="h4 mb-3">
                      <i className="bi bi-file-earmark-text me-2"></i>
                      The First Known Articles
                    </h3>
                    <div className="list-group">
                      <div className="list-group-item">
                        <strong>The Sumerian King List</strong> (c. 2100 BCE) - One of the earliest historiographic documents
                      </div>
                      <div className="list-group-item">
                        <strong>The Edwin Smith Papyrus</strong> (c. 1600 BCE) - An ancient Egyptian medical text
                      </div>
                      <div className="list-group-item">
                        <strong>The Code of Hammurabi</strong> (c. 1750 BCE) - Babylonian law articles
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Authors Section */}
            <section className="mb-5">
              <h2 className="text-center mb-4">
                <i className="bi bi-people me-2"></i>
                The First Human Authors
              </h2>
              <p className="text-center mb-4">
                While most early writing was anonymous, we know some of the earliest named authors in history:
              </p>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h3 className="card-title">
                        <i className="bi bi-person-video3 me-2 text-primary"></i>
                        Enheduanna (2285-2250 BCE)
                      </h3>
                      <p className="card-text">
                        The Akkadian princess and high priestess is considered the world's first known author. 
                        She wrote religious poetry and hymns that were widely distributed.
                      </p>
                    </div>
                    <div className="card-footer bg-transparent">
                      <small className="text-muted">First known named author in history</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h3 className="card-title">
                        <i className="bi bi-person-video2 me-2 text-primary"></i>
                        Ptahhotep (c. 2400 BCE)
                      </h3>
                      <p className="card-text">
                        Ancient Egyptian vizier who authored "The Maxims of Ptahhotep," one of the earliest 
                        pieces of wisdom literature containing moral and practical advice.
                      </p>
                    </div>
                    <div className="card-footer bg-transparent">
                      <small className="text-muted">Author of early wisdom literature</small>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Evolution Section */}
            <section className="mb-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h2 className="card-title text-center mb-4">
                    <i className="bi bi-arrow-through-heart me-2"></i>
                    The Evolution of Articles
                  </h2>
                  <p className="card-text text-center mb-4">
                    The modern concept of articles developed through several key stages:
                  </p>

                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-icon bg-primary text-white">
                        <i className="bi bi-building"></i>
                      </div>
                      <div className="timeline-content">
                        <h5>Ancient Period</h5>
                        <p>Practical records, religious texts, and royal decrees</p>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-icon bg-success text-white">
                        <i className="bi bi-columns"></i>
                      </div>
                      <div className="timeline-content">
                        <h5>Classical Period</h5>
                        <p>Philosophical treatises and historical accounts</p>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-icon bg-info text-white">
                        <i className="bi bi-book"></i>
                      </div>
                      <div className="timeline-content">
                        <h5>Medieval Period</h5>
                        <p>Scholarly commentaries and encyclopedic works</p>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-icon bg-warning text-white">
                        <i className="bi bi-pen"></i>
                      </div>
                      <div className="timeline-content">
                        <h5>Renaissance</h5>
                        <p>Emergence of the essay form</p>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-icon bg-danger text-white">
                        <i className="bi bi-newspaper"></i>
                      </div>
                      <div className="timeline-content">
                        <h5>18th Century</h5>
                        <p>Birth of modern newspapers and periodicals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">© {new Date().getFullYear()} History of Writing. All rights reserved.</p>
        </div>
      </footer>

      {/* Timeline CSS */}
      <style jsx>{`
        .timeline {
          position: relative;
          padding-left: 50px;
        }
        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }
        .timeline-icon {
          position: absolute;
          left: -50px;
          top: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timeline-content {
          padding: 20px;
          background: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline:before {
          content: '';
          position: absolute;
          left: 19px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #dee2e6;
        }
      `}</style>
    </div>
  );
};