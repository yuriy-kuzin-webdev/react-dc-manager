import React from "react";

export default function Client({ client}) {
  return (
    <tr>
      <td>{client.id}</td>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
    </tr>
  );
}
