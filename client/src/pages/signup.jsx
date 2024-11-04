import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        formData.password === value || formData.confirmPassword === value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );
      if (response.data.success) {
        toast.success("Registered Successfully!");
        navigate("/login");
      }
      // Redirect or show success message as needed
    } catch (error) {
      // console.error('Error registering user:', error.response.data.error);
      // Handle error state or show error message
      if (error.response.data.error == "not_unique") {
        toast.error("E-mail already exists!");
      }
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url(img1.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="col-md-6 col-lg-4">
        <div className="text-center my-4 text-white">
          <h1>Sign Up</h1>
        </div>
        <div className="p-4 bg-light rounded">
          <form onSubmit={handleSubmit} className="w-100">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                className="form-control"
                id="number"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                User Type:
              </label>
              <select
                className="form-control"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="mechanic">Mechanic</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className={`form-control ${
                  !passwordMatch ? "border-danger" : ""
                }`}
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                className={`form-control ${
                  !passwordMatch ? "border-danger" : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {!passwordMatch && (
                <small className="text-danger">Passwords do not match</small>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100 my-2">
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary w-100 my-3"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
