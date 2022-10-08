import { useState } from "react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { ApplicationsAPI } from "../../../services/applicationsAPI";
import ConfirmDialog from "../../../components/ConfirmDialog";
import UserList from "../../../components/user-list-table/UserList";

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

  const { data, isLoading } = useQuery(['applications'], () => ApplicationsAPI.getAll());

  const [applications, setApplications] = useState([]);

  const [userAction, setUserAction] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setApplications(data);
  }, [data])

  const handleValidate = (user) => {
    setUserAction({ status: 'Aceptado', user: user.id, action: 'Validar' });
    setDialogOpen(true);
  };

  const handleReject = (user) => {
    setUserAction({ status: 'Rechazado', user: user.id, action: 'Rechazar' });
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    setDialogOpen(false);
    const application = applications.find(app => app.applicantUser.id === userAction.user );
    try {
      const dataToSend = { status: userAction.status };
      const response = await ApplicationsAPI.update(application.id, dataToSend);
      alert(response.status);
    } catch (e) {
      alert(e);
    }
    setUserAction({});
  };

  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <Container sx={{ pt: 4 }}>
      <UserList
        userList={data.map((app) => {
          return {
            id: app.applicantUser.id,
            fullName: `${app.applicantUser.surname} ${app.applicantUser.name}`,
            email: app.applicantUser.email,
            academicUnit: app.applicantUser.academicUnit,
            certificate: app.certificatePath,
            validated: app.status,
            phone: app.applicantUser.phone,
            dni: app.applicantUser.dni
          };
        })}
        tableHead={TABLE_HEAD}
        associateToolbar={true}
        actionOne={handleValidate}
        actionTwo={handleReject} />
      <ConfirmDialog dialogOpen={dialogOpen} text={`¿${userAction.action} como socio?`} confirmAction={confirmAction} closeDialog={setDialogOpen} />
    </Container>
  );
}
