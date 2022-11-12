import { UserOutlined, BugOutlined, BugFilled, BugTwoTone } from "@ant-design/icons";

const icons = {
  UserOutlined,
  BugOutlined,
  BugFilled,
  BugTwoTone
};

export const menuManager = {
  id: "Gerente",
  title: "Menu Encargado",
  type: "group",
  children: [
    {
      id: "manager0",
      title: "Barcito",
      type: "item",
      url: "/barcito",
      icon: icons.BugFilled
    },
    {
      id: "manager1",
      title: "Pedidos",
      type: "item",
      url: "/pedidos",
      icon: icons.BugFilled,
    },
    {
      id: "manager2",
      title: "Productos",
      type: "item",
      url: "/productos",
      icon: icons.BugFilled
    },
    {
      id: "manager3",
      title: "Stock",
      type: "item",
      url: "/stock",
      icon: icons.BugFilled
    },
    {
      id: "manager5",
      title: "Categorías",
      type: "item",
      url: "/categorias",
      icon: icons.BugFilled
    },
    {
      id: "manager6",
      title: "Recibos",
      type: "item",
      url: "/recibos",
      icon: icons.BugFilled
    },
    {
      id: "manager7",
      title: "Socios",
      type: "item",
      url: "/socios",
      icon: icons.UserOutlined,
    },
  ],
};
