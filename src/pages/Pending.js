import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import DcContext from "../store/dc-context";
import Appointment from "../components/Appointment";

export default function Pending() {
  const context = useContext(DcContext);
  function getDentist(dentistId) {
    return context.dentists.find((dentist) => dentist.id === dentistId);
  }
  function getClient(clientId) {
    return context.clients.find((client) => client.id === clientId);
  }
  function confirmHandler(appointment) {
    context.confirmAppointment(appointment);
  }
  function cancelHandler(appointment) {
    context.cancelAppointment(appointment);
  }
  return (
    <section>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Dentist</th>
            <th>Date</th>
            <th>Client</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {context.pending.map((appointment) => (
            <Appointment
              key={appointment.id}
              appointment={appointment}
              dentist={getDentist(appointment.dentistId)}
              client={getClient(appointment.clientId)}
              onConfirm={confirmHandler}
              onCancel={cancelHandler}
            />
          ))}
        </tbody>
      </Table>
    </section>
  );
}
