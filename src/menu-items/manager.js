import { UserOutlined, BugOutlined } from "@ant-design/icons";

const icons = {
  UserOutlined,
  BugOutlined
};

export const menuManager = {
  id: "manager",
  title: "Menu Encargado",
  type: "group",
  children: [
    {
      id: "menu1",
      title: "Socios",
      type: "item",
      url: "/socios",
      icon: icons.UserOutlined,
    },
    {
      id: "menu2",
      title: "Productos",
      type: "item",
      url: "/productos",
      icon: icons.BugOutlined
    }
  ],
};
