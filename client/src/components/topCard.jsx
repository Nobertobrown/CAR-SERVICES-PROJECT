import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faPhone } from '@fortawesome/free-solid-svg-icons';

const TopCard = () => {
    const [mechanics, setMechanics] = useState([]);
    const [selectedMechanic, setSelectedMechanic] = useState(null);

    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const response = await axios.get('/auth/mechanics', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const uniqueMechanics = Array.from(new Set(response.data.map(mechanic => mechanic.id)))
                    .map(id => response.data.find(mechanic => mechanic.id === id));
                setMechanics(uniqueMechanics);
            } catch (error) {
                console.error('Error fetching mechanics:', error);
            }
        };

        fetchMechanics();
    }, []);

    const handleContact = async (mechanic) => {
        setSelectedMechanic(mechanic);
        try {
            await axios.post('/requests/create', {
                mechanicId: mechanic.id,
                message: 'User requested contact'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Request created successfully');
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    return (
        <div className="container">
            {mechanics.map(mechanic => (
                <div className="card my-4 text-white bg-dark" key={mechanic.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="card-title">{mechanic.name}</h5>
                                <p className="card-text">{mechanic.location}</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faHeart} className="me-3" />
                                <FontAwesomeIcon icon={faStar} className="me-2" />
                                {mechanic.stars}
                            </div>
                        </div>
                        <button className="btn btn-primary mt-3" onClick={() => handleContact(mechanic)}>Contact</button>
                    </div>
                </div>
            ))}
            {selectedMechanic && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">Mechanic Details</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedMechanic(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Name:</strong> {selectedMechanic.name}</p>
                                <p><strong>Location:</strong> {selectedMechanic.location}</p>
                                <p><strong>Phone:</strong> {selectedMechanic.phone}</p>
                            </div>
                            <div className="modal-footer">
                                <a className="btn btn-primary" href={`tel:${selectedMechanic.phone}`}>
                                    <FontAwesomeIcon icon={faPhone} /> Call
                                </a>
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedMechanic(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopCard;
