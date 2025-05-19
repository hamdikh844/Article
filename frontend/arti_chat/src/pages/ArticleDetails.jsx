import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5002';

const ArticleDetails = () => {
  const { id } = useParams(); // To get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the product by ID when the page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/my_art/read/${id}`);
        setProduct(res.data.article); // Set product data
        setError('');
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="container mt-5">
      <Button variant="link" onClick={() => navigate('/articles')} className="mb-3">
        &larr; Back to Article List
      </Button>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : !product ? (
        <Alert variant="info">No product found.</Alert>
      ) : (
        <Card className="shadow-sm p-4">
          <div className="d-flex justify-content-center mb-3">
            {product.image ? (
              <img
                src={`${API_BASE_URL}${product.image}`}
                alt={product.name}
                style={{ maxWidth: '300px', height: 'auto' }}
              />
            ) : (
              <span>No Image Available</span>
            )}
          </div>
          <h3>{product.name}</h3>
          <p><strong>Author:</strong> {product.author}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Tags:</strong> {product.tags?.join(', ')}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Status:</strong> <span className={`badge bg-${product.status === 'published' ? 'success' : 'secondary'}`}>{product.status}</span></p>
        </Card>
      )}
    </div>
  );
};

export default ArticleDetails;
