import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import SearchPage from "./pages/searching";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Admin from "./pages/admin";
import Mechanics from "./pages/mechanics";
import { Toaster } from "react-hot-toast";
import MechanicsProfile from "./pages/MechanicsProfile";
import MechanicDashboard from "./pages/MechanicDashboard";

const App = () => {
  const pathsWithNavbar = ["/home", "/search", "/profile"];

  const ShowNavbar = () => {
    const location = useLocation();
    const showNavbar = pathsWithNavbar.includes(location.pathname);

    return showNavbar ? <Navbar /> : null;
  };

  return (
    <Router>
      <div>
        <ShowNavbar />
        <Toaster />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/mechanics" element={<Mechanics />}>
            <Route index element={<MechanicDashboard/>}/>
            <Route path="profile" element={<MechanicsProfile />} />
          </Route>
          {/* Default route to redirect to login */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
