import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function CrearCampeonato({ show, handleClose }) {
  const [nombreCampeonato, setNombreCampeonato] = useState("");
  const [carreras, setCarreras] = useState([{ circuito: "", coche: "", fecha: "" }]);
  const [usuarios, setUsuarios] = useState([""]);
  const [loading, setLoading] = useState(false);

  const handleAddCarrera = () => setCarreras([...carreras, { circuito: "", coche: "", fecha: "" }]);
  const handleRemoveCarrera = () => setCarreras(carreras.slice(0, -1));
  
  const handleAddUsuario = () => setUsuarios([...usuarios, ""]);
  const handleRemoveUsuario = () => setUsuarios(usuarios.slice(0, -1));

  const handleCarreraChange = (index, field, value) => {
    const nuevasCarreras = [...carreras];
    nuevasCarreras[index][field] = value;
    setCarreras(nuevasCarreras);
  };

  const handleUsuarioChange = (index, value) => {
    const nuevosUsuarios = [...usuarios];
    nuevosUsuarios[index] = value;
    setUsuarios(nuevosUsuarios);
  };

  const handleSubmit = async () => {
    if (!nombreCampeonato.trim()) {
      alert("El nombre del campeonato no puede estar vacío.");
      return;
    }
    if (carreras.some(c => !c.circuito.trim() || !c.coche.trim() || !c.fecha.trim())) {
      alert("Todas las carreras deben estar completas.");
      return;
    }
    if (usuarios.some(u => !u.trim())) {
      alert("Todos los usuarios deben tener un email válido.");
      return;
    }
  
    setLoading(true);
    try {
      // Crear el campeonato
      const campeonatoResponse = await axios.post("https://localhost:7033/api/ChampionshipsApi", {
        name: nombreCampeonato,
        description: "Campeonato generado desde React"
      });
  
      const championshipId = campeonatoResponse.data.id;
  
      // Crear cada carrera
      for (const carrera of carreras) {
        const carreraResponse = await axios.post("https://localhost:7033/api/RacesApi", {
          circuit: carrera.circuito,
          car: carrera.coche,
          date: carrera.fecha,
          championshipId: championshipId
        });
  
        const race = carreraResponse.data;
  
        for (const email of usuarios) {
          try {
            const userResponse = await axios.get(`https://localhost:7033/api/UsersApi/byEmail/${email}`);
            if (!userResponse.data || !userResponse.data.id) {
              alert(`No se encontró usuario con email: ${email}`);
              continue;
            }
            const driver = userResponse.data;
  
            await axios.post("https://localhost:7033/api/ParticipationRacesApi", {
              userId: driver.id,  
              raceId: race.id
            });
            
  
          } catch (error) {
            console.error("Error al asignar usuario a la carrera:", error);
          }
        }
      }

      handleClose();
    } catch (error) {
      console.error("Error al crear el campeonato:", error.response ? error.response.data : error.message);
      alert(`Error en la API: ${JSON.stringify(error.response?.data)}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Crear Campeonato</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Campeonato</Form.Label>
            <Form.Control
              type="text"
              value={nombreCampeonato}
              onChange={(e) => setNombreCampeonato(e.target.value)}
              placeholder="Ejemplo: Campeonato 2025"
              className="w-100"
            />
          </Form.Group>
          
          <h5>Carreras</h5>
          {carreras.map((carrera, index) => (
            <div key={index} className="mb-3">
              <Form.Control
                type="text"
                placeholder="Circuito"
                value={carrera.circuito}
                onChange={(e) => handleCarreraChange(index, "circuito", e.target.value)}
                className="mb-2 w-100"
              />
              <Form.Control
                type="text"
                placeholder="Coche"
                value={carrera.coche}
                onChange={(e) => handleCarreraChange(index, "coche", e.target.value)}
                className="mb-2 w-100"
              />
              <Form.Control
                type="datetime-local"
                value={carrera.fecha}
                onChange={(e) => handleCarreraChange(index, "fecha", e.target.value)}
                className="mb-2 w-100"
              />
            </div>
          ))}
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={handleRemoveCarrera} disabled={carreras.length <= 1}>- Eliminar Carrera</Button>
            <Button variant="secondary" onClick={handleAddCarrera}>+ Añadir Carrera</Button>
          </div>
          
          <h5 className="mt-3">Usuarios</h5>
          {usuarios.map((usuario, index) => (
            <Form.Control
              key={index}
              type="email"
              placeholder="Email del usuario"
              value={usuario}
              onChange={(e) => handleUsuarioChange(index, e.target.value)}
              className="mb-2 w-100"
            />
          ))}
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={handleRemoveUsuario} disabled={usuarios.length <= 1}>- Eliminar Usuario</Button>
            <Button variant="secondary" onClick={handleAddUsuario}>+ Añadir Usuario</Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose} disabled={loading}>Cancelar</Button>
        <Button variant="success" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creando..." : "Crear Campeonato"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CrearCampeonato;
