import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token, user, redirectUrl } = response.data; // Get redirectUrl from response

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to the redirectUrl provided by the backend
      navigate(redirectUrl);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="col-md-6 col-lg-4">
        <div className="text-center my-4 text-white">
          <h1>Log In</h1>
        </div>
        <div className="p-4 bg-light rounded">
          <form onSubmit={handleLogin} className="w-100">
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button type="submit" className="btn btn-primary w-100 mb-2">Sign In</button>
            <button type="button" className="btn btn-outline-secondary w-100" onClick={() => navigate('/signup')}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
