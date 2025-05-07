import React, { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import CampeonatosUser from "../components/CampeonatosUser";
import CrearCampeonato from "../components/CrearCampeonato";

function Championships() {
  const [filteredChampionships, setFilteredChampionships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchChampionships = async () => {
      try {
        console.log("Fetching championships...");

        const { data: championshipsData } = await axios.get("https://localhost:7033/api/ChampionshipsApi");
        const allChampionships = championshipsData?.$values || championshipsData || [];
        console.log("All Championships:", allChampionships);

        const championshipsWithParticipation = new Set();

        for (const championship of allChampionships) {
          try {
            const { data: racesData } = await axios.get(`https://localhost:7033/api/RacesApi/byChampionship/${championship.id}`);
            const races = racesData?.$values || racesData || [];
            console.log(`Races for Championship ${championship.id}:`, races);

            const userInChampionship = races.some(race =>
              race.participationRace?.$values?.some(participation => participation.userId == userId)
            );

            if (userInChampionship) {
              championshipsWithParticipation.add(championship);
            }
          } catch (error) {
            console.error(`Error fetching races for championship ${championship.id}:`, error);
          }
        }

        setFilteredChampionships([...championshipsWithParticipation]);
        console.log("Filtered Championships:", [...championshipsWithParticipation]);
      } catch (error) {
        console.error("Error fetching championships:", error.response?.data || error.message);
      }
    };

    if (userId) {
      fetchChampionships();
    }
  }, [userId]);

  return (
    <div className="bodyOthers">
      <Header />
      <h2 className="othersSubtitles">My championships</h2>
      <div className="linea-blanca"></div>
      <div className="mt-5 d-flex flex-column align-items-center">
        <div>
          {filteredChampionships.length > 0 ? (
            filteredChampionships.map((championship, index) => (
              championship ? (
                <div className="mb-4">
                <CampeonatosUser key={championship.id || index} championship={championship} />
                </div>
              ) : null
            ))
          ) : (
            <p>You're not enrolled in any championships.</p>
          )}
        </div>

        <button className="botonMas mt-3 mb-3" onClick={() => setShowModal(true)}>+</button>
        <CrearCampeonato show={showModal} handleClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}

export default Championships;

