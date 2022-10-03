import { useRef, useState } from "react";
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemove from "@mui/icons-material/PersonRemove";

export default function UserMoreMenu({ user, handleEdit, handleDelete }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => {
            handleEdit(user, "Editar ");
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <EditIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar Usuario" primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => {
            handleDelete(user);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <PersonRemove width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Eliminar Usuario" primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>
      </Menu>
    </>
  );
}
