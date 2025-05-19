import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:5002/api';

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.warning('Please login to view your profile');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to fetch profile';
        toast.error(errorMessage);
        
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <p>Error loading profile. Please try again.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary mb-3">Your Profile</h2>
                <p className="text-muted">Manage your account information</p>
              </div>

              <div className="profile-info text-center mb-4">
                <div className="mb-3">
                  <img 
                    src={'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=random'} 
                    alt="Profile" 
                    className="rounded-circle border border-3 border-primary"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <h3>{user.name}</h3>
                <p className="text-muted">{user.email}</p>
                <span className={`badge rounded-pill ${
                  user.role === 'admin' ? 'bg-danger' : 
                  user.role === 'author' ? 'bg-warning' : 'bg-primary'
                }`}>
                  {user.role.toUpperCase()}
                </span>
              </div>

              <div className="d-flex flex-column gap-2">
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigate('/EditProfile')}
                  className="mb-2"
                >
                  Edit Profile
                </Button>

                {/* Conditional display for Author */}
                {user.role === 'author' && (
                  <>
                    <Button 
                      variant="outline-success"
                      onClick={() => navigate('/Article')}
                      className="mb-2"
                    >
                      Manage Your Articles
                    </Button>
                  </>
                )}

                {/* Conditional display for Admin */}
                {user.role === 'admin' && (
                  <>
                    <Button 
                      variant="outline-info"
                      onClick={() => navigate('UserList')}
                      className="mb-2"
                    >
                      Manage All Users
                    </Button>
                    <Button 
                      variant="outline-dark"
                      onClick={() => navigate('ArticleListe')}
                      className="mb-2"
                    >
                      Manage All Articles
                    </Button>
                  </>
                )}

                {/* Link to Articles List for All Roles */}
                <Button
                  variant="outline-primary"
                  onClick={() => navigate('/articles')}
                  className="mb-2"
                >
                  View All Articles
                </Button>

                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/change-password')}
                  className="mb-2"
                >
                  Change Password
                </Button>

                <Button 
                  variant="outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
