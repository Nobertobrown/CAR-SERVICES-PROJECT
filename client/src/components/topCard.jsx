import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faPhone,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const TopCard = () => {
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/mechanics",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const uniqueMechanics = Array.from(
          new Set(response.data.map((mechanic) => mechanic.id))
        ).map((id) => response.data.find((mechanic) => mechanic.id === id));
        setMechanics(uniqueMechanics);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
      }
    };

    fetchMechanics();
  }, []);

  const handleContact = async (mechanic) => {
    setSelectedMechanic(mechanic);
    try {
      await axios.post(
        "http://localhost:5000/requests/create",
        {
          mechanicId: mechanic.id,
          message: "User requested contact",
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Request created successfully");
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this profile!",
          text: "Here is my profile on this amazing app!",
          url: window.location.href,
        })
        .then(() => {
          console.log("Profile shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing profile:", error);
        });
    } else {
      alert("Share API is not supported in this browser.");
    }
  };

  return (
    <div className="container">
      {mechanics.map((mechanic) => (
        <div
          className="card my-4 text-dark"
          style={{ backgroundColor: "#e6e1e1" }}
          key={mechanic.id}
        >
          <div className="card-body">
            <div>
              <FontAwesomeIcon icon={faHeart} className="me-3" />
              <FontAwesomeIcon icon={faStar} className="me-2" />4
            </div>
            <div className="d-flex justify-content-between align-items-center my-3">
              <div>
                <h5 className="card-title text-capitalize">{mechanic.name}</h5>
                <div className="card-text text-muted">
                  <p className="text-capitalize">{mechanic.description}</p>
                  <div className="d-flex gap-2 text-capitalize">
                    <strong>Exprience:</strong>
                    {mechanic.experience} years
                  </div>
                  <div className="d-flex gap-2 text-capitalize">
                    <strong>Location:</strong> {mechanic.location}
                  </div>
                  <div className="d-flex gap-2 text-capitalize">
                    <b>Working Hours:</b>
                    <p>
                      {new Date(mechanic.openTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(mechanic.closeTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary px-3"
                  onClick={() => handleContact(mechanic)}
                >
                  Contact
                </button>
                <Button className="btn btn-primary mx-1" onClick={handleShare}>
                  <FontAwesomeIcon icon={faShareAlt} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedMechanic && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Mechanic Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setSelectedMechanic(null)}
                ></button>
              </div>
              <div className="modal-body text-capitalize">
                <p>
                  <strong>Name: </strong> {selectedMechanic.name}
                </p>
                <p>
                  <strong>Phone: </strong> {selectedMechanic.phoneNo}
                </p>
              </div>
              <div className="modal-footer">
                <a
                  className="btn btn-primary"
                  href={`tel:${selectedMechanic.phoneNo}`}
                >
                  <FontAwesomeIcon icon={faPhone} /> Call
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedMechanic(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopCard;
