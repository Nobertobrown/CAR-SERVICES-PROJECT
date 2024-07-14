import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/mechanics.css'; 
import { Button, Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const Mechanics = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/auth/requests', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.put(`/api/requests/${id}`, { read: true }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotifications(notifications.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await axios.delete(`/api/requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotifications(notifications.filter(notification => notification.id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const unreadCount = notifications.filter(notification => !notification.read).length;

    return (
        <div>
            <Header unreadCount={unreadCount} />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="pt-3">
                            <h2>Dashboard</h2>
                            <div className="card mt-4">
                                <div className="card-body">
                                    <h5 className="card-title">Notifications</h5>
                                    <ul className="list-group list-group-flush">
                                        {notifications.map(notification => (
                                            <li key={notification.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                {notification.text}
                                                <div>
                                                    {!notification.read && (
                                                        <button 
                                                            className="btn btn-success btn-sm me-2"
                                                            onClick={() => handleAccept(notification.id)}
                                                        >
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                    )}
                                                    <button 
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleCancel(notification.id)}
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

const Header = ({ unreadCount }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <header className="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow">
            <Button variant="primary" onClick={handleShow} className="d-md-none ms-2">
                <i className="fas fa-bars"></i>
            </Button>
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Mechanics Dashboard</a>
            <NotificationIcon unreadCount={unreadCount} />
            <Offcanvas show={show} onHide={handleClose} id="sidebar" className="d-md-none">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Car Service Pro</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SidebarContent />
                </Offcanvas.Body>
            </Offcanvas>
        </header>
    );
};

const NotificationIcon = ({ unreadCount }) => {
    return (
        <div className="notification-icon position-relative me-3">
            <i className="fas fa-bell text-white"></i>
            {unreadCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {unreadCount}
                </span>
            )}
        </div>
    );
};

const Sidebar = () => {
    return (
        <div className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar">
            <SidebarContent />
        </div>
    );
};

const SidebarContent = () => {
    return (
        <ul className="nav flex-column p-3">
            <li className="nav-item">
                <a className="nav-link active" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Requests</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/login">Log out</a>
            </li>
        </ul>
    );
};

export default Mechanics;
