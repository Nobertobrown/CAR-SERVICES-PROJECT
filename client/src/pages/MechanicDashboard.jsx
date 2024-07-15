import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const MechanicDashboard = () => {
  const context = useOutletContext();
  const { accept, cancel, notifications } = context;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Notifications</h5>
          <ul className="list-group list-group-flush">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="card-text text-muted fs-5">
                  <strong>#{notification.id}</strong>
                  <p>From: {notification.userName}</p>
                  <p>Message: {notification.message}</p>
                  <p>Phone Number: {notification.userNo}</p>
                </div>
                <div>
                  {!notification.read && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => accept(notification.id)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cancel(notification.id)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
