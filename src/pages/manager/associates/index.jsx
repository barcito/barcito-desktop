import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ApplicationsAPI } from "@/services/applicationsAPI";
import { UserAPI } from "@/services/userAPI";
import ConfirmDialog from "@/components/ConfirmDialog";
import UserList from "@/components/user-list-table/UserList";

const TABLE_HEAD = [
  { id: "fullName", label: "Nombre", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "academicUnit", label: "Unidad Académica", alignRight: false },
  { id: "certificate", label: "Certificado", alignRight: false },
  { id: "validated", label: "Validado", alignRight: false },
  { id: "phone", label: "Teléfono", alignRight: false },
  { id: "dni", label: "DNI", alignRight: false },
];

export default function Associates() {
  let [usersData, setUsersData] = useState([]);

  const { data, isLoading } = useQuery(["applications"], () => ApplicationsAPI.getAll());

  let usersFetch = useQuery(["user"], async () => UserAPI.getAll(), { onSuccess: setUsersData });

  console.log(usersData);

  const [applications, setApplications] = useState([]);

  const [userAction, setUserAction] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setApplications(data);
  }, [data]);

  const handleValidate = (user) => {
    setUserAction({ status: "Aceptado", user: user.id, action: "Validar" });
    setDialogOpen(true);
  };

  const handleReject = (user) => {
    setUserAction({ status: "Rechazado", user: user.id, action: "Rechazar" });
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    setDialogOpen(false);
    const application = applications.find((app) => app.applicantUser.id === userAction.user);
    try {
      const dataToSend = { status: userAction.status };
      const response = await ApplicationsAPI.update(application.id, dataToSend);
      alert(response.status);
    } catch (e) {
      alert(e);
    }
    setUserAction({});
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!usersData) {
    return <p>No data!</p>;
  }

  return (
    <Container sx={{ pt: 4 }}>
      <UserList
        userList={usersData
          .filter((user) => `${user.academicUnitId}` === window.localStorage.getItem("academic-unit") && user.roles[0] === "Socio")
          .map((app) => {
            return {
              id: app.id,
              fullName: `${app.surname} ${app.name}`,
              email: app.email,
              academicUnit: app.academicUnit,
              certificate: app.certificatePath,
              validated: app.applicationDone?.status,
              phone: app.phone,
              dni: app.dni,
            };
          })}
        tableHead={TABLE_HEAD}
        associateToolbar={true}
        actionOne={handleValidate}
        actionTwo={handleReject}
      />
      <ConfirmDialog dialogOpen={dialogOpen} text={`¿${userAction.action} como socio?`} confirmAction={confirmAction} closeDialog={setDialogOpen} />
    </Container>
  );
}
