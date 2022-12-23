import React, {useContext} from "react";
import Table from "react-bootstrap/Table";
import Client from "./Client";
import DcContext from "../../store/dc-context";

export default function ClientsList({ clients }) {
  const context = useContext(DcContext);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{["Full Name","Полное имя","Повне ім'я"][context.languageCode]}</th>
          <th>{["Mail","Почта","Пошта"][context.languageCode]}</th>
          <th>{["Phone","Телефон","Телефон"][context.languageCode]}</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <Client key={client.id} client={client}/>
        ))}
      </tbody>
    </Table>
  );
}
