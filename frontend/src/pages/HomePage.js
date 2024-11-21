import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import Countdown from '../components/Countdown';
import '../styles/HomePage.css';

function HomePage() {
    const [nextEvent, setNextEvent] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    

    useEffect(() => {
        async function fetchEvents() {
            try {
                const {data: matches} = await axios.get('/api/matches');
                const sortedMatches = matches.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                
                setNextEvent(sortedMatches[0]);
                setUpcomingEvents(sortedMatches.slice(1, 5));

            } catch (error) {
                console.error("Erreur lors du chargement des événements", error);
            }
        }
        fetchEvents();
    }, []);

    const handleParticipate = async (eventId) => {
        try {
            const userId = localStorage.getItem("userId");
            await axios.post("/api/matches", { id_user: userId, id_match: eventId });
            alert("Participation réussie !");

        } catch (error) {
            console.error("Erreur lors de l'inscription à l'évènement", error);
            alert("Vous devez être connecté pour participer.");
        }
    }

    return(
        <div className='home-page'>
            {
                nextEvent && (
                    <section className='next-event-section'>
                        <h2>Evénement à venir</h2>
                        <EventCard event={nextEvent} onParticipate={handleParticipate} />
                        <Countdown eventDate={nextEvent.eventDate} />
                    </section>
                )
            }
            <section className='next-event-section'>
                <h3>Evénement suivants</h3>
                <div className='event-list d-flex flex_wrap justify-content-center'>
                    {upcomingEvents.map(event => (
                         <EventCard 
                            key={event.id} 
                            event={event}
                            onParticipate={handleParticipate}
                        />
                    ))}
                </div>
               
            </section>
        </div>
    );
}

export default HomePage;