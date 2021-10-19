import { createContext, useEffect, useState } from "react";

const DcContext = createContext({
  languageCode: 0,
  setLanguageCode : (code) => {},

  pending: [],
  confirmed: [],
  canceled: [],
  currentManager: {},
  dentists: [],
  clients: [],

  confirmAppointment: (appointment) => {},
  cancelAppointment: (appointment) => {},
  login: (userName, password) => {},
});

export function DcContextProvider(props) {
  const api = "http://localhost:31437/api/";

  const [langCode, setLangCode] = useState(0);

  const [userAppointments, setUserAppointments] = useState([]);
  const [userClients, setUserClients] = useState([]);
  const [userDentists, setUserDentists] = useState([]);
  const [userManagers, setUserManagers] = useState([]);
  const [userClinics, setUserClinics] = useState([]);

  const [userPending, setUserPending] = useState([]);
  const [userConfirmed, setUserConfirmed] = useState([]);
  const [userCanceled, setUserCanceled] = useState([]);
  const [userManager, setUserManager] = useState(undefined);

  useEffect(() => {
    async function fetchClients() {
      let clients = await fetch(api + "clients");
      clients = await clients.json();
      setUserClients(clients);
    }
    async function fetchAppointments() {
      let appointments = await fetch(api + "appointments");
      appointments = await appointments.json();
      setUserAppointments(appointments);
    }
    async function fetchDentists() {
      let dentists = await fetch(api + "dentists");
      dentists = await dentists.json();
      setUserDentists(dentists);
    }
    async function fetchManagers() {
      let managers = await fetch(api + "managers");
      managers = await managers.json();
      setUserManagers(managers);
    }
    async function fetchClinics() {
        let clinics = await fetch(api + "clinics");
        clinics = await clinics.json();
        setUserClinics(clinics);
      }
    fetchAppointments();
    fetchClients();
    fetchDentists();
    fetchManagers();
    fetchClinics();
  }, []);

  function handleConfirmAppointment(appointment) {
    const confirmedAppointment = {...appointment, status : 1};
    fetch(api + "appointments/" + appointment.id, {
      method: "PUT",
      body: JSON.stringify(confirmedAppointment),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setUserPending((prev) => {
        return prev.filter((a) => a.id !== appointment.id);
      });
      setUserConfirmed((prev) => {
        return prev.concat(confirmedAppointment);
      });
    });
  }
  function handleCancelAppointment(appointment) {
    const canceledAppointment = {...appointment, status:2};
    fetch(api + "appointments/" + appointment.id, {
      method: "PUT",
      body: JSON.stringify(canceledAppointment),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (userPending.some((a) => a.id === appointment.id)) {
        setUserPending((prev) => {
          return prev.filter((a) => a.id !== appointment.id);
        });
      } else if (userConfirmed.some((a) => a.id === appointment.id)) {
        setUserConfirmed((prev) => {
          return prev.filter((a) => a.id !== appointment.id);
        });
      }
      setUserCanceled((prev) => {
        return prev.concat(canceledAppointment);
      });
    });
  }
  function handleLogin(userName, password) {
    const manager = userManagers.find(
      (m) => m.username === userName && m.password === password
    );
    if (manager) {
      const dentists = userDentists.filter(
        (dentist) => dentist.clinicId === manager.clinicId
      );
      const appointments = userAppointments.filter((appointment) =>
        dentists.some((dentist) => dentist.id === appointment.dentistId)
      );
      setUserPending(appointments.filter((ap) => ap.status === 0));
      setUserConfirmed(appointments.filter((ap) => ap.status === 1));
      setUserCanceled(appointments.filter((ap) => ap.status === 2));
    }
    setUserManager({...manager, clinicName: userClinics.find((cl) => manager.clinicId === cl.id).title});
  }

  const context = {
    languageCode: langCode,
    setLanguageCode: (code) => {setLangCode(code)},
    pending: userPending,
    confirmed: userConfirmed,
    canceled: userCanceled,
    currentManager: userManager,
    dentists: userDentists,
    clients: userClients,

    confirmAppointment: handleConfirmAppointment,
    cancelAppointment: handleCancelAppointment,
    login: handleLogin,
  };

  return (
    <DcContext.Provider value={context}>{props.children}</DcContext.Provider>
  );
}

export default DcContext;
