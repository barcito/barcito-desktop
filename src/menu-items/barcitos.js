import { ShopOutlined, UserOutlined } from "@ant-design/icons";

const icons = {
  ShopOutlined,
  UserOutlined,
};

export const menuBarcitos = {
  id: "menu",
  title: "Menu Barcitos",
  type: "group",
  children: [
    {
      id: "menu1",
      title: "Listado Barcitos",
      type: "item",
      url: "/barcitos",
      icon: icons.ShopOutlined,
    },
    {
      id: "menu2",
      title: "Listado Usuarios",
      type: "item",
      url: "/usuarios",
      icon: icons.UserOutlined,
    },
  ],
};
