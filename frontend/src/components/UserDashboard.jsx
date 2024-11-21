import React, {useState, useEffect} from "react";
import axios from "axios";
import '../styles/Form.css';

const UserDashboard = () => {
    const [createdMatches, setCreatedMatches] = useState([]);
    const [participations, setParticipations] = useState([]);
    const [newMatch, setNewMatch] = useState({
        name: '',
        adress: '',
        eventDate: '',
        image: '',
    });

    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        fetchCreatedMatches();
        fetchParticipations();
    }, []);

    const fetchCreatedMatches = async () => {
        try {
            const response = await axios.get('/api/user/my-matches', {
                headers: {Authorization : `Bearer ${localStorage.getItem('token')}`},
            });

            setCreatedMatches(response.data)
        } catch (error) {
            console.error("Erreur lors de la récupération des matches créés :", error);
        }
    };

    const fetchParticipations = async () => {
        try {
            const response = await axios.get('/api/user/my-participations', {
                headers: {Authorization : `Bearer ${localStorage.getItem('token')}`},
            });

            setParticipations(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des participations :", error);
        }
    };

    const handleInputChange = (e) => {
        setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
    };

    const createMatch = async (e) => {
        e.preventDefault();
        try {
            await axios.get('/api/user/create-match', {
                headers: {Authorization : `Bearer ${localStorage.getItem('token')}`},
            });
            alert('Match créé avec succès!');
            setShowForm(false);
            fetchCreatedMatches();
        } catch (error) {
            console.error("Erreur lors de la création du match:", error);
            alert('Erreur lors de la création du match');
        }
    };

    return (
        <div>
            <h1>Espace Personnel</h1>

            <section>
                <h2>Matchs créés</h2>
                <ul>
                    {createdMatches.map((match) => (
                        <li key={match.id}>{match.name} - {match.eventDate}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Matchs auxquels je participe</h2>
                <ul>
                    {participations.map((participation) => (
                        <li key={participation.id}>{participation.Match.name} - {participation.Match.eventDate}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Créer un nouveau match</h2>
                {!showForm ? (
                    <button onClick={()=> setShowForm(true)}>Créer un match</button>
                ):(
                    <form onSubmit={createMatch}>
                    <input 
                        type='text'
                        name="name" 
                        value={newMatch.name} 
                        onChange={handleInputChange} 
                        placeholder='Nom du match' 
                        required 
                    />
                    <input 
                        type='text'
                        name="adress" 
                        value={newMatch.adress} 
                        onChange={handleInputChange} 
                        placeholder='Adresse' 
                        required  
                    />
                    <input 
                        type='datetime-local'
                        name="eventDate" 
                        value={newMatch.eventDate} 
                        onChange={handleInputChange} 
                        required 
                    />
                    <input 
                        type='text'
                        name="image" 
                        value={newMatch.image} 
                        onChange={handleInputChange} 
                        placeholder="Lien de l'image" 
                        required 
                    />
                    <button type='submit'>Créer</button>
                    <button type='button' onClick={() => setShowForm(false)}>Annuler</button>
                </form>
                )}
            </section>

        </div>
    )

}

export default UserDashboard;