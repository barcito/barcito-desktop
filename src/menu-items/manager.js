import { UserOutlined } from "@ant-design/icons";

const icons = {
  UserOutlined,
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
  ],
};
