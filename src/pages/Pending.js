import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import DcContext from "../store/dc-context";
import Appointment from "../components/Appointment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const tabLocales = [
  ["Dentist", "Date", "Client", "Status", "Actions"],
  ["Стоматолог", "Дата", "Клиент", "Статус", "Действия"],
  ["Стоматолог", "Дата", "Клієнт", "Статус", "Дії"],
];
const buttonLocale = ["Add new appointment", "Добавить заявку", "Додати запис"];

export default function Pending() {
  const context = useContext(DcContext);

  let initialDate = new Date();
  initialDate.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const clients = context.clients.map((cl) => {
    return {
      clientId: cl.id,
      clientName: cl.name,
    };
  });
  const dentists = context.dentists
    .filter((dent) => {
      return dent.clinicId === context.currentManager.clinicId;
    })
    .map((de) => {
      return {
        dentistId: de.id,
        dentistName: de.name,
      };
    });
  const [client, setClient] = useState({});
  const [dentist, setDentist] = useState({});
  function handleDentistChange(e) {
    const id = parseInt(e.target.value);
    const selectedDentist = dentists.find((d) => d.dentistId === id);
    setDentist(selectedDentist);
  }
  function handleClientChange(e) {
    const id = parseInt(e.target.value);
    const selectedClient = clients.find((c) => c.clientId === id);
    setClient(selectedClient);
  }
  function handleDateChange(date) {
    setSelectedDate(date);
  }

  const [isFormActive, setIsFormActive] = useState(false);
  function handleAddAppointment(e) {
    e.preventDefault();
    const data = {
      dentistId: dentist.dentistId,
      clinicId: context.currentManager.clinicId,
      date: selectedDate.toISOString(),
      clientId: client.clientId,
      status: 0,
    };
    
    context.addAppointment(data);
    setIsFormActive(false);
  }
  function handleCancelForm() {
    setIsFormActive(false);
  }
  function handleShowForm() {
    setIsFormActive(true);
  }
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
      {isFormActive ? (
        <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">
                  {
                    ["Add new appointment", "Добавить заявку", "Додати запис"][
                      context.languageCode
                    ]
                  }
                </h2>
                <Form>
                  <Form.Group id="dentistId">
                    <Form.Label>
                      {tabLocales[context.languageCode][0]}
                    </Form.Label>
                    <Form.Select
                      onChange={handleDentistChange}
                    >
                      <option>Not selected</option>
                      {dentists.map((d) => {
                        return (
                          <option key={d.dentistId + 'd'} value={d.dentistId}>
                            {d.dentistName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group id="clientId">
                    <Form.Label>
                      {tabLocales[context.languageCode][2]}
                    </Form.Label>
                    <Form.Select
                      onChange={handleClientChange}
                    >
                      <option>Not selected</option>
                      {clients.map((c) => {
                        return (
                          <option key={c.clientId + 'c'} value={c.clientId}>
                            {c.clientName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group id="date" className="mb-5">
                    <Form.Label>
                      {tabLocales[context.languageCode][1]}
                    </Form.Label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                    />
                  </Form.Group>
                  <Button
                    className="w-100"
                    variant="primary"
                    type="submit"
                    style={{ margin: 0 }}
                    onClick={handleAddAppointment}
                  >
                    {["Submit", "Добавить", "Додати"][context.languageCode]}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              <Button variant="primary" onClick={handleCancelForm}>
                {["Cancel", "Отменить", "Вiдмiнити"][context.languageCode]}
              </Button>
            </div>
          </div>
        </Container>
      ) : (
        <>
          <Button className="mt-2 mb-5" onClick={handleShowForm}>
            {buttonLocale[context.languageCode]}
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>{tabLocales[context.languageCode][0]}</th>
                <th>{tabLocales[context.languageCode][1]}</th>
                <th>{tabLocales[context.languageCode][2]}</th>
                <th>{tabLocales[context.languageCode][3]}</th>
                <th>{tabLocales[context.languageCode][4]}</th>
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
        </>
      )}
    </section>
  );
}
