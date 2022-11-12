import { ShopOutlined, UserOutlined } from "@ant-design/icons";

const icons = {
  ShopOutlined,
  UserOutlined,
};

export const menuAdmin = {
  id: "Admin",
  title: "Menu Admin",
  type: "group",
  children: [
    {
      id: "admin1",
      title: "Usuarios",
      type: "item",
      url: "/usuarios",
      icon: icons.UserOutlined,
    },
    {
      id: "admin2",
      title: "Barcitos",
      type: "item",
      url: "/barcitos",
      icon: icons.ShopOutlined,
    },
  ],
};
