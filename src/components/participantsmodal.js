import React from "react";
import { Modal, Button } from "react-bootstrap";
import Casco from "../assets/cascoPerfil.png";

function ParticipantsModal({ show, onHide, participants }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Participantes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {participants.length > 0 ? (
                    <ul className="list-group">
                        {participants.map((user) => (
                            <li 
                                key={user.id} 
                                className="list-group-item d-flex align-items-center"
                                style={{ color: "black" }}
                            >
                                <img 
                                    src={Casco} 
                                    alt="Casco" 
                                    width="30" 
                                    height="auto" 
                                    className="me-2 p-1" 
                                />
                                <span style={{ color: "black", fontWeight: "bold" }}>
                                    {user.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "black" }}>No hay participantes en este campeonato.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ParticipantsModal;


