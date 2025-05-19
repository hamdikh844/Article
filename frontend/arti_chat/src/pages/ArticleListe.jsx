import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Alert, Card, Image, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaListUl } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5002';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/my_art/read`);
      setArticles(res.data.articles || []);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
      setError('Failed to fetch articles.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/my_art/remove/${id}`);
      setArticles(prev => prev.filter(article => article._id !== id));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      alert('Failed to delete the article.');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-article/${id}`);
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col>
              <h3 className="mb-0">
                <FaListUl className="me-2 text-primary" />
                Article Management
              </h3>
              <small className="text-muted">View, edit or delete your articles</small>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : articles.length === 0 ? (
            <Alert variant="info">No articles found.</Alert>
          ) : (
            <Table hover responsive className="table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Tags</th>
                  <th>Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, index) => (
                  <tr key={article._id}>
                    <td>{index + 1}</td>
                    <td>
                      {article.image ? (
                        <Image
                          src={`${API_BASE_URL}${article.image}`}
                          alt={article.name}
                          thumbnail
                          style={{ width: '80px', height: 'auto' }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>{article.name}</td>
                    <td>{article.description}</td>
                    <td>{article.author}</td>
                    <td>
                      <span className={`badge bg-${article.status === 'published' ? 'success' : 'secondary'}`}>
                        {article.status}
                      </span>
                    </td>
                    <td>{article.tags?.join(', ')}</td>
                    <td>${article.price}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleUpdate(article._id)}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(article._id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ArticleList;
