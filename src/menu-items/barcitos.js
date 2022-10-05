import { ShopOutlined, UserOutlined } from "@ant-design/icons";

const icons = {
  ShopOutlined,
  UserOutlined,
};

export const menuBarcitos = {
  id: "menu",
  title: "Menu Admin",
  type: "group",
  children: [
    {
      id: "menu1",
      title: "Usuarios",
      type: "item",
      url: "/usuarios",
      icon: icons.UserOutlined,
    },
    {
      id: "menu2",
      title: "Barcitos",
      type: "item",
      url: "/barcitos",
      icon: icons.ShopOutlined,
    },
  ],
};
