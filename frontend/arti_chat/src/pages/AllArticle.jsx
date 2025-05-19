import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5002';

const AllArticle = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/my_art/read`);
        setProducts(res.data.articles || []);
        setError('');
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-primary">All Articles</h2>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : products.length === 0 ? (
        <Alert variant="info">No articles found.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <Card className="h-100 shadow-lg border-0 rounded-3">
                <Card.Img
                  variant="top"
                  src={`${API_BASE_URL}${product.image}`}
                  alt={product.name}
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.375rem',
                    borderTopRightRadius: '0.375rem',
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center text-primary">{product.name}</Card.Title>
                  <Card.Text className="text-muted" style={{ height: '80px', overflow: 'hidden' }}>
                    {product.description.slice(0, 100)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold">${product.price}</span>
                    <Link
                      to={`/ArticleDetails/${product._id}`}
                      className="btn btn-primary btn-sm mt-2 mt-md-0"
                    >
                      View Details
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AllArticle;
