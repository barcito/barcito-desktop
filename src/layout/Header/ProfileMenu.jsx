import { useState } from "react";
import PropTypes from "prop-types";
import useTheme from "@mui/material/styles/useTheme";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { AuthAPI } from "@/services/authAPI";
import { useNavigate, Navigate } from "react-router-dom";

function ProfileMenu({ handleLogout }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => {
          handleListItemClick(event, 0);
          navigate("/perfil");
        }}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Editar Perfil" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => {
          handleListItemClick(event, 1);
          navigate("/perfil");
        }}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Configuración" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => {
          handleLogout();
          navigate("/login");
        }}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Cerrar Sesión" />
      </ListItemButton>
    </List>
  );
}

export default ProfileMenu;

ProfileMenu.propTypes = {
  handleLogout: PropTypes.func,
};
