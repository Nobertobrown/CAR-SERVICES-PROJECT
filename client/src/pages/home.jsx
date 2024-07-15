import { useState, useEffect } from "react";
import axios from "axios";
import TopCard from "../components/topCard";
import Navbar from "../components/navbar";

const Home = () => {
  const [userData, setUserData] = useState();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [nearbyAddresses, setNearbyAddresses] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    // Fetch user data from localstorage
    const user = localStorage.getItem("user");
    setUserData(JSON.parse(user));
  }, []);

  useEffect(() => {
    // Get the user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          await fetchAddress(latitude, longitude);
          await fetchNearbyPlaces(latitude, longitude);
          setLoadingLocation(false); // Set loading to false after fetching location
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingLocation(false); // Set loading to false on error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoadingLocation(false); // Set loading to false if geolocation is not supported
    }
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    try {
      const apiKey = "1e34d49b170048bf833437f736014de8"; // Replace with your Geoapify API key
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;
      const response = await axios.get(url);
      const address = response.data.features[0].properties.formatted;
      setAddress(address);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Address not found");
    }
  };

  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const apiKey = "1e34d49b170048bf833437f736014de8"; // Replace with your Geoapify API key
      const url = `https://api.geoapify.com/v1/places/nearby?lat=${latitude}&lon=${longitude}&radius=1000&filter=cycle_parking&limit=10&apiKey=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data;
      if (data.features && data.features.length > 0) {
        const nearbyPlaces = data.features.map(
          (place) => place.properties.name
        );
        setNearbyAddresses(nearbyPlaces);
      } else {
        setNearbyAddresses(["No nearby places found"]);
      }
    } catch (error) {
      console.error("Error while searching:", error);
    }
  };

  return (
    <div className="container py-4 bg-dark">
      {userData ? (
        <h4 className="text-white text-capitalize">Welcome, {userData.name}!</h4>
      ) : (
        <h4 className="text-white">Welcome back!</h4>
      )}
      <h2 className="display-3 fw-bold text-white">
        Find car services near you
      </h2>
      {loadingLocation ? (
        <p className="text-white">Fetching your location...</p>
      ) : location ? (
        <div className="text-white">
          <p>Your location: {address}</p>
          {/* <h4>Nearby Places:</h4>
                    <ul>
                        {nearbyAddresses.map((addr, index) => (
                            <li key={index}>{addr}</li>
                        ))}
                    </ul> */}
        </div>
      ) : (
        <p className="text-white">Location not available.</p>
      )}
      <div>
        <h4 className="text-white mb-4">Top service providers</h4>
        <TopCard />
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
