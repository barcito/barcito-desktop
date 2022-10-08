import { useState } from "react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { ApplicationsAPI } from "../../../services/applicationsAPI";
import ConfirmDialog from "../../../components/ConfirmDialog";
import UserList from "../../../components/user-list-table/UserList";
import { useQuery } from "react-query";
import { useLoaderData } from "react-router-dom";

const applicationsQuery = () => ({
  queryKey: ['applications'],
  queryFn: async () => await ApplicationsAPI.getAll()
});

export const loader = (queryClient) => async () => {
  const query = applicationsQuery();
  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
}

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

  const { data, Loading } = useQuery(applicationsQuery());

  const [applications, setApplications] = useState(useLoaderData());

  const [userList, setUserList] = useState([]);

  const [userAction, setUserAction] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const formattedUsers = applications.map((app) => {
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
    });
    setUserList(formattedUsers);
  }, [applications]);

  const handleValidate = (user) => {
    setUserAction({ status: 'Aceptado', user: user.id, action: 'Validar' });
    console.log(applications)
    setDialogOpen(true);
  };

  const handleReject = (user) => {
    setUserAction({ status: 'Rechazado', user: user.id, action: 'Rechazar' });
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    setDialogOpen(false);
    console.log(applications)
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

  if(Loading){
    return(<p>Loading...</p>)
  }

  return (
    <Container sx={{ pt: 4 }}>
      <UserList
        userList={userList}
        tableHead={TABLE_HEAD}
        associateToolbar={true}
        actionOne={handleValidate}
        actionTwo={handleReject} />
      <ConfirmDialog dialogOpen={dialogOpen} text={`¿${userAction.action} como socio?`} confirmAction={confirmAction} closeDialog={setDialogOpen} />
    </Container>
  );
}
