import { UserOutlined, BugOutlined, BugFilled, BugTwoTone } from "@ant-design/icons";

const icons = {
  UserOutlined,
  BugOutlined,
  BugFilled,
  BugTwoTone
};

export const menuManager = {
  id: "manager",
  title: "Menu Encargado",
  type: "group",
  children: [
    {
      id: "manager1",
      title: "Pedidos",
      type: "item",
      url: "/pedidos",
      icon: icons.BugFilled,
    },
    {
      id: "manager2",
      title: "Stock",
      type: "collapse",
      icon: icons.BugTwoTone,
      children: [
        {
          id: "manager21",
          title: "Listado de productos",
          type: "item",
          url: "/stock/productos",
          icon: icons.BugFilled
        },
        {
          id: "manager22",
          title: "Combos",
          type: "item",
          url: "/stock/combos",
          icon: icons.BugOutlined
        },
        {
          id: "manager23",
          title: "Insumos",
          type: "item",
          url: "/stock/insumos",
          icon: icons.BugFilled
        },
        {
          id: "manager24",
          title: "Categorías",
          type: "item",
          url: "/stock/categorias",
          icon: icons.BugFilled
        },
        {
          id: "manager25",
          title: "Producto",
          type: "item",
          url: "/stock/producto"
        },
        {
          id: "manager26",
          title: "Recibos",
          type: "item",
          url: "/stock/recibos",
          icon: icons.BugFilled
        }
      ]
    },
    {
      id: "manager3",
      title: "Personal",
      type: "item",
      url: "/personal",
      icon: icons.BugOutlined,
    },
    {
      id: "manager4",
      title: "Socios",
      type: "item",
      url: "/socios",
      icon: icons.UserOutlined,
    },
  ],
};
