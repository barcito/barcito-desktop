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

  const { data, isLoading } = useQuery(['users'], () => UserAPI.getAll());

  const [userOnAction, setUserOnAction] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation(
    ({id, data}) => {
      if(id){
        return data ? UserAPI.update(id, data) : UserAPI.delete(id);
      }
      return UserAPI.create(data);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['users']);
        setModalOpen(false);
      }
    }
  );

  const handleAction = (user) => {
    user ? setUserOnAction(user) : setUserOnAction({});
    setModalOpen(true);
  };

  const handleDelete = (user) => {
    setUserOnAction(user);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    mutation.mutate({id: userOnAction.id, data: null});
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
        handleNew={handleAction}
        actionOne={handleAction}
        actionTwo={handleDelete}
      />
      <ConfirmDialog dialogOpen={dialogOpen} text={"¿Eliminar usuario?"} confirmAction={confirmDelete} closeDialog={setDialogOpen} />
      <UserEditModal user={userOnAction} modalOpen={modalOpen} closeModal={setModalOpen} mutation={mutation} />
    </Container>
  );
}
