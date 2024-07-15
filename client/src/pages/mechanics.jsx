import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/mechanics.css";
import { Button, Offcanvas } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";

const Mechanics = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const mechanic = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await axios.get(
          `http://localhost:5000/auth/requests/${mechanic.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/auth/requests/${id}`,
        { read: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotifications(
        notifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/auth/requests/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const context = { cancel: handleCancel, accept: handleAccept, notifications };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div>
      <Header unreadCount={unreadCount} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-5">
            <div className="pt-5">
              <Outlet context={context} />
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
    <header className="navbar navbar-dark sticky-top bg-primary flex-md-nowrap py-3 pe-md-5 shadow-sm">
      <Button variant="primary" onClick={handleShow} className="d-md-none ms-2">
        <FontAwesomeIcon className="text-white" icon={faBars} />
      </Button>
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fw-bold" href="#">
        Mechanics Dashboard
      </a>
      <NotificationIcon unreadCount={unreadCount} />
      <Offcanvas
        show={show}
        onHide={handleClose}
        id="sidebar"
        className="d-md-none"
      >
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
    <div className="notification-icon position-relative">
      <FontAwesomeIcon className="text-white fs-5" icon={faBell} />
      {unreadCount > 0 && (
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-circle bg-danger">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar mt-5">
      <SidebarContent />
    </div>
  );
};

const SidebarContent = () => {
  return (
    <ul className="nav flex-column p-3">
      <li className="nav-item">
        <a className="nav-link fs-5 active" href="/mechanics">
          Dashboard
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link fs-5" href="/mechanics/profile">
          Profile
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link fs-5" href="/login">
          Log out
        </a>
      </li>
    </ul>
  );
};

export default Mechanics;
