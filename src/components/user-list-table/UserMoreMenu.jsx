import { useRef, useState } from "react";
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function UserMoreMenu({ disabled, user, actionOne, actionTwo }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)} disabled={disabled}>
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
            actionOne.fn(user);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            {actionOne.icon}
          </ListItemIcon>
          <ListItemText primary={actionOne.label} primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => {
            actionTwo.fn(user);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            {actionTwo.icon}
          </ListItemIcon>
          <ListItemText primary={actionTwo.label} primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>
      </Menu>
    </>
  );
}
