import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import NavItem from "./NavItem";
import useStore from "@/services/store";

function NavGroup({ item, level }) {
  const { openSidebar } = useStore();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case "collapse":
        return (
          <React.Fragment key={menuItem.id}>
            <NavItem item={menuItem} level={1} collapse={handleClick} open={open} />
            <Collapse in={open} timeout="auto" unmountOnExit>
              {
                menuItem.children.map((item) => {
                  switch (item.type) {
                    case "item":
                      return item.icon ? <NavItem key={item.id} item={item} level={2} /> : null;
                    default:
                      return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                          Fix - Group Collapse or Items
                        </Typography>
                      );
                  }
                })
              }
            </Collapse>
          </React.Fragment>
        );
      case "item":
        return <NavItem key={menuItem.id} item={menuItem} level={level} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        openSidebar && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: openSidebar ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
}

export default NavGroup;

NavGroup.propTypes = {
  item: PropTypes.object,
};
