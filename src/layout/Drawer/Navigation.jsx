import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavGroup from "./NavGroup";
import { menuItems } from "../menu-items";

function Navigation() {
  const navGroups = menuItems.items.map((item) => {
    switch (item.type) {
      case "group":
        return localStorage.getItem("roles").includes(item.id) ? <NavGroup key={item.id} item={item} level={1} /> : null;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}

export default Navigation;
