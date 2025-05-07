import React, { useEffect, useState } from "react";
import Casco from "../assets/helmet.png";

function RacesUser({ race }) {
    const [championshipName, setChampionshipName] = useState("Loading...");
    const now = new Date();
    const raceDate = new Date(race.date);

    useEffect(() => {
        const fetchChampionship = async () => {
            if (!race.championshipId) {
                setChampionshipName("Unknown Championship");
                return;
            }

            try {
                const response = await fetch(`https://localhost:7033/api/ChampionshipsApi/${race.championshipId}`);
                if (!response.ok) throw new Error("Error fetching championship");

                const data = await response.json();
                setChampionshipName(data.name || "Unknown Championship");
            } catch (error) {
                console.error("Error fetching championship:", error);
                setChampionshipName("Unknown Championship");
            }
        };

        fetchChampionship();
    }, [race.championshipId]);

    let timeRemaining = "Race finished";
    if (raceDate > now) {
        const diffMs = raceDate - now;
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        timeRemaining = `${days}d ${hours}h`;
    }

    const driversCount = race.participationRace?.$values ? race.participationRace.$values.length : 0;

    return (
        <div>
            <div className="card text-white dark-card mb-4">
                <div className="card-body">
                    <h5 className="card-title text-center">{championshipName}</h5>
                    <p className="card-text text-center">{`${race.circuit} - ${race.car}`}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <p className="mb-0 text-white">{timeRemaining}</p>
                    <div className="d-flex align-items-center gap-2">
                        <img src={Casco} alt="Casco" width="20" height="20" />
                        <p className="mb-0">{driversCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RacesUser;
