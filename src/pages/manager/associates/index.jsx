import { useState } from "react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { UserAPI } from "../../../services/userAPI";
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
  const [userList, setUserList] = useState([]);

  const [userOnAction, setUserOnAction] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const users = await UserAPI.getAll();
      const formattedUsers = users.map((user) => {
        return {
          id: user.id,
          fullName: `${user.surname} ${user.name}`,
          email: user.email,
          academicUnit: user.academicUnit,
          certificate: user.applicationDone?.certificatePath || null,
          validated: user.applicationDone?.status || null,
          phone: user.phone,
          dni: user.dni
        };
      });
      setUserList(formattedUsers);
    };
    getUsers();
  }, []);

  const handleValidate = (user) => {
    setUserOnAction(user);
    setDialogOpen(true);
  };

  const handleReject = (user) => {
    setUserOnAction(user);
    setDialogOpen(true);
  };

  const confirmAction = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ pt: 4 }}>
      <UserList
        userList={userList}
        tableHead={TABLE_HEAD}
        associateToolbar={true}
        actionOne={handleValidate}
        actionTwo={handleReject} />
      <ConfirmDialog dialogOpen={dialogOpen} text={"Confirmar acción"} confirmAction={confirmAction} closeDialog={setDialogOpen} />
    </Container>
  );
}
