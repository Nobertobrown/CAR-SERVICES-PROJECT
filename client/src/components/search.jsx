import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/search.css'; // Import your custom CSS file

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form className="search-container py-3 row align-items-center" onSubmit={handleSearch}>
            <div className="input-group col">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-black border-black">
                        <FontAwesomeIcon icon={faSearch} className="text-white" />
                    </span>
                </div>
                <input 
                    type="text" 
                    className="form-control bg-black border-black text-white" 
                    placeholder="Enter your location"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit" className="btn col-auto">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-dark bg-white p-3 rounded-2 " />
            </button>
        </form>
    );
};

export default Search;
