import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import RacesUser from "../components/RacesUser";
import Reloj from "../assets/icons8-clock-50.png"
import Alfabeto from "../assets/icons8-alphabetical-order-50.png"
import Volver from "../assets/icons8-return-50.png"

function Races() {
    const [races, setRaces] = useState([]);
    const [originalRaces, setOriginalRaces] = useState([]);
    const [championshipNames, setChampionshipNames] = useState({});
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await axios.get("https://localhost:7033/api/RacesApi");
                const allRaces = Array.isArray(response.data.$values) ? response.data.$values : [];

                const now = new Date();
                const adjustedNow = new Date(now.getTime() - 30 * 60000);

                const userRaces = allRaces.filter(race => 
                    race.participationRace?.$values?.some(participation => participation.userId == userId)
                );

                const upcomingRaces = userRaces.filter(race => new Date(race.date) > adjustedNow);
                setRaces(upcomingRaces);
                setOriginalRaces(upcomingRaces);

                // Obtener los nombres de los campeonatos
                const uniqueChampionshipIds = [...new Set(upcomingRaces.map(race => race.championshipId))];
                const championshipData = {};
                await Promise.all(uniqueChampionshipIds.map(async (id) => {
                    try {
                        const champResponse = await axios.get(`https://localhost:7033/api/ChampionshipsApi/${id}`);
                        championshipData[id] = champResponse.data.name;
                    } catch (error) {
                        console.error(`Error fetching championship ${id}:`, error);
                    }
                }));
                setChampionshipNames(championshipData);
            } catch (error) {
                console.error("Error fetching races:", error);
                setRaces([]);
            }
        };

        if (userId) {
            fetchRaces();
        }
    }, [userId]);

    const sortByDate = () => {
        const sortedRaces = [...races].sort((a, b) => new Date(a.date) - new Date(b.date));
        setRaces(sortedRaces);
    };

    const sortByChampionshipName = () => {
        const sortedRaces = [...races].sort((a, b) => {
            const nameA = championshipNames[a.championshipId] || "";
            const nameB = championshipNames[b.championshipId] || "";
            return nameA.localeCompare(nameB);
        });
        setRaces(sortedRaces);
    };

    const resetOrder = () => {
        setRaces([...originalRaces]);
    };

    return (
        <div className="bodyOthers">
            <Header />
            <h2 className="othersSubtitles">Upcoming races</h2>
            <div className="linea-blanca"></div>
            <div className="mt-3 d-flex sort-icons">
                <img src={Reloj} alt="Ordenar por fecha" onClick={sortByDate} width="30" height="auto" />
                <img src={Alfabeto} alt="Ordenar por nombre de campeonato" onClick={sortByChampionshipName} width="30" height="auto" />
                <img src={Volver} alt="Restablecer orden" onClick={resetOrder} width="30" height="auto" />
            </div>
            <div className="mt-5 d-flex justify-content-around flex-wrap">
                {races.length === 0 ? (
                    <div className="text-center w-100 d-flex justify-content-center">
                        <p>You have no upcoming races.</p>
                    </div>
                ) : (
                    races.map((race) => <RacesUser key={race.id} race={race} championshipName={championshipNames[race.championshipId]} />)
                )}
            </div>
        </div>
    );
}

export default Races;

