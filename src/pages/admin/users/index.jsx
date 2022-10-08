import { useState } from "react";
import { Container } from "@mui/material";
import { UserAPI } from "../../../services/userAPI";
import ConfirmDialog from "../../../components/ConfirmDialog";
import UserEditModal from "./UserEditModal";
import UserList from "../../../components/user-list-table/UserList";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

  const client = useQueryClient();

  const { data, isLoading } = useQuery(['users'], async () => UserAPI.getAll());

  const [userOnAction, setUserOnAction] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation(
    ({id, data}) => {
      return id ? UserAPI.update(id, data) : UserAPI.create(data);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['users']);
        setModalOpen(false);
      }
    }
  );

  const handleNew = () => {
    setUserOnAction({});
    setModalOpen(true);
  };

  const handleAction = (user) => {
    setUserOnAction(user);
    setModalOpen(true);
  };

  // TODO: refactor and find a way to delete all selected users
  const confirmDelete = () => {
    const deleteUser = async (id) => {
      try {
        await UserAPI.delete(id);
      } catch (err) {
        alert(err);
      }
    };
    if (userOnAction) {
      deleteUser(userOnAction.id);
    }
    setDialogOpen(false);
  };

  if(isLoading){
    return <p>Loading...</p>;
  }

  return (
    <Container sx={{ pt: 4 }}>
      <UserList 
        userList={data.map((user) => {
          return {
            id: user.id,
            fullName: `${user.surname} ${user.name}`,
            email: user.email,
            academicUnit: user.academicUnit,
            certificate: user.applicationDone?.certificatePath || null,
            validated: user.applicationDone?.status || null,
            phone: user.phone,
            dni: user.dni,
            roles: Object.values(user.roles),};
        })}
        tableHead={TABLE_HEAD}
        handleNew={handleNew}
        actionOne={handleAction}
        actionTwo={handleAction}
      />
      <ConfirmDialog dialogOpen={dialogOpen} text={"¿Eliminar usuario/s?"} confirmAction={confirmDelete} closeDialog={setDialogOpen} />
      <UserEditModal user={userOnAction} modalOpen={modalOpen} closeModal={setModalOpen} mutation={mutation} />
    </Container>
  );
}
