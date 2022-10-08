import { useState } from "react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { UserAPI } from "../../../services/userAPI";
import ConfirmDialog from "../../../components/ConfirmDialog";
import UserEditModal from "./UserEditModal";
import UserList from "../../../components/user-list-table/UserList";

const TABLE_HEAD = [
  { id: "fullName", label: "Nombre", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "academicUnit", label: "Unidad Académica", alignRight: false },
  { id: "certificate", label: "Certificado", alignRight: false },
  { id: "validated", label: "Validado", alignRight: false },
  { id: "phone", label: "Teléfono", alignRight: false },
  { id: "dni", label: "DNI", alignRight: false },
  { id: "roles", label: "Roles", alignRight: false },
];

export default function Users() {
  const [userList, setUserList] = useState([]);

  const [userOnAction, setUserOnAction] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [editUser, setEditUser] = useState(null);

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
          dni: user.dni,
          roles: Object.values(user.roles),
        };
      });
      setUserList(formattedUsers);
    };
    getUsers();
  }, [editUser]);

  const handleNew = () => {
    setUserOnAction(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setUserOnAction(user);
    setModalOpen(true);
  };

  const handleDelete = (user) => {
    setUserOnAction(user);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    const deleteUser = async (id) => {
      try {
        await UserAPI.delete(id);
        setUserList(userList.filter((user) => user.id !== id));
        setSelected([]);
      } catch (err) {
        console.log(err);
      }
    };
    if (selected) {
      selected.map((id) => {
        deleteUser(id);
      });
    }
    if (userOnAction) {
      deleteUser(userOnAction.id);
    }
    setDialogOpen(false);
  };

  return (
    <Container sx={{ pt: 4 }}>
      <UserList userList={userList} tableHead={TABLE_HEAD} handleNew={handleNew} actionOne={handleEdit} actionTwo={handleDelete} />
      <ConfirmDialog dialogOpen={dialogOpen} text={"¿Eliminar usuario/s?"} confirmAction={confirmDelete} closeDialog={setDialogOpen} />
      <UserEditModal user={userOnAction} modalOpen={modalOpen} closeModal={setModalOpen} setEditUser={setEditUser} />
    </Container>
  );
}
