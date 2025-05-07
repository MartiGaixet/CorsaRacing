import React, { useEffect, useState } from "react";
import Casco from "../assets/helmet.png";
import ParticipantsModal from "../components/participantsmodal"; 

function CampeonatosUser({ championship }) {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [participantCount, setParticipantCount] = useState(0);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await fetch(`https://localhost:7033/api/RacesApi/byChampionship/${championship.id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        console.warn("No se encontraron carreras.");
                        setRaces([]);
                        return;
                    }
                    throw new Error(`Error en la API: ${response.status}`);
                }
                const data = await response.json();
                setRaces(Array.isArray(data.$values) ? data.$values : []);
            } catch (error) {
                console.error("Error fetching races:", error);
                setRaces([]); 
            } finally {
                setLoading(false);
            }
        };

        if (championship?.id) {
            fetchRaces();
        }
    }, [championship]);

    useEffect(() => {
        const fetchParticipants = async () => {
            const uniqueUserIds = new Set();
            
            races.forEach(race => {
                race.participationRace?.$values?.forEach(participation => {
                    uniqueUserIds.add(participation.userId);
                });
            });

            setParticipantCount(uniqueUserIds.size);

            if (uniqueUserIds.size === 0) return;

            const fetchUser = async (userId) => {
                try {
                    const response = await fetch(`https://localhost:7033/api/UsersApi/${userId}`);
                    if (!response.ok) throw new Error(`Error obteniendo usuario ${userId}`);
                    return await response.json();
                } catch (error) {
                    console.error(error);
                    return null;
                }
            };

            const fetchAllUsers = async () => {
                const userPromises = Array.from(uniqueUserIds).map(id => fetchUser(id));
                const users = await Promise.all(userPromises);
                setParticipants(users.filter(user => user !== null)); 
            };

            fetchAllUsers();
        };

        if (races.length > 0) {
            fetchParticipants();
        }
    }, [races]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const now = new Date();
    const upcomingRaces = races.filter((race) => new Date(race.date) > now);
    const nextRace = upcomingRaces.sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    let nextRaceInfo = "No upcoming races";
    if (nextRace) {
        const raceDate = new Date(nextRace.date);
        const diffMs = raceDate - now;
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const timeRemaining = `${days}d ${hours}h`;

        nextRaceInfo = `${nextRace.circuit} - ${nextRace.car} (${timeRemaining})`;
    }

    return (
        <div>
            <div className="d-flex justify-content-between campeonatoPreview">
                <div>
                    <h3>{championship.name}</h3>
                    <p>Next race: {nextRaceInfo}</p>
                </div>
                <div 
                    className="d-flex align-items-center justify-content-center gap-2"
                    onClick={() => setShowModal(true)} 
                    style={{ cursor: "pointer" }}
                >
                    <img src={Casco} alt="Casco icono" width="20" height="20" />
                    <h5 className="d-flex align-items-center mb-0 me-4">{participantCount}</h5> 
                </div>
            </div>

            <ParticipantsModal show={showModal} onHide={() => setShowModal(false)} participants={participants} />
        </div>
    );
}

export default CampeonatosUser;
