import React, { useState, useEffect } from 'react';
import Search from '../components/search';
import Navbar from '../components/navbar';
import TopCard from '../components/topCard';

const SearchPage = () => {
    const [userData, setUserData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        // Fetch user data from public/users.json
        fetch('/users.json')
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                setFilteredUsers(data);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = userData.filter(user => 
            user.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className='bg-dark p-3 vh-100'>
            <Search onSearch={handleSearch} />
            <p className="text-white text-center display-5 text-muted">
                Enter Location, and get results here!
            </p>
            <div>
                {filteredUsers.map((user, index) => (
                    <TopCard key={index} name={user.name} location={user.location} stars={user.stars} />
                ))}
            </div>
            <Navbar />
        </div>
    );
};

export default SearchPage;
