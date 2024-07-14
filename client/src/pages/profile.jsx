import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Offcanvas, Button, Form, Col } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = () => setShowEdit(true);
  const handleClose = () => setShowEdit(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(response.data);
      setShowEdit(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this profile!',
        text: 'Here is my profile on this amazing app!',
        url: window.location.href
      }).then(() => {
        console.log('Profile shared successfully');
      }).catch((error) => {
        console.error('Error sharing profile:', error);
      });
    } else {
      alert('Share API is not supported in this browser.');
    }
  };

  return (
    <>
      <div className="p-3 my-2 vh-100 bg-dark text-white">
        {user ? (
          <>
            <div className="avatar d-flex justify-content-center">
              <img src={user.profilePicture || "../assets/images/sample.jpg"} className="bg-black rounded-circle h-25" alt="Profile" />
            </div>
            <h4 className="handler text-center py-3">{user.name}</h4>
            <div className="d-flex justify-content-center">
              <Button className="btn btn-primary mx-3" onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </Button>
              <Button className="btn btn-primary mx-3" onClick={handleShare}>
                <FontAwesomeIcon icon={faShareAlt} /> Share Profile
              </Button>
            </div>
            <section className="activity my-5">
              <p className="text-white text-center display-6">
                Activity will be shown here, if any!
              </p>
            </section>
          </>
        ) : (
          <p className="text-center">Loading...</p>
        )}
        <Navbar />
      </div>

      <Offcanvas show={showEdit} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Profile;
