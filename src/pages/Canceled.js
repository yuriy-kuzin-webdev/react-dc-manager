import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import DcContext from "../store/dc-context";
import Appointment from "../components/Appointment";

const tabLocales = [
  ["Dentist","Date","Client","Status","Actions"],
  [ "Стоматолог", "Дата", "Клиент", "Статус", "Действия"],
  ["Стоматолог", "Дата", "Клієнт", "Статус", "Дії"]
]

export default function Canceled() {
  const context = useContext(DcContext);
  function getDentist(dentistId) {
    return context.dentists.find((dentist) => dentist.id === dentistId);
  }
  function getClient(clientId) {
    return context.clients.find((client) => client.id === clientId);
  }
  return (
    <section>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>{tabLocales[context.languageCode][0]}</th>
            <th>{tabLocales[context.languageCode][1]}</th>
            <th>{tabLocales[context.languageCode][2]}</th>
            <th>{tabLocales[context.languageCode][3]}</th>
          </tr>
        </thead>
        <tbody>
          {context.canceled.map((appointment) => (
            <Appointment
              key={appointment.id}
              appointment={appointment}
              dentist={getDentist(appointment.dentistId)}
              client={getClient(appointment.clientId)}
            />
          ))}
        </tbody>
      </Table>
    </section>
  );
}
