import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Accordion from 'react-bootstrap/Accordion'

export default function Appointment({ appointment, dentist, client, onConfirm, onCancel }) {
  return (
    <tr>
      <td>{appointment.id}</td>
      <td>{dentist.name}</td>
      <td>{appointment.date}</td>
      <td>
          <Accordion>
            <Accordion.Item eventKey={appointment.id}>
                <Accordion.Header>{client.name}</Accordion.Header>
                <Accordion.Body>
                    <p>Phone: {client.phone}</p>
                    <p>Email: {client.email}</p>
                </Accordion.Body>
            </Accordion.Item>
          </Accordion>
      </td>
      <td>{appointment.status}</td>
      <td width="10%">
        <ButtonGroup>
          {onConfirm && <Button variant="success" onClick={onConfirm}>Confirm</Button>}
          {onCancel && <Button variant="danger" onClick={onCancel}>Cancel</Button>}
        </ButtonGroup>
      </td>
    </tr>
  );
}