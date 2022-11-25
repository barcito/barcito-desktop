import { UserOutlined, BugOutlined, BugFilled, BugTwoTone } from "@ant-design/icons";
import { FaBoxes, FaReceipt, FaStore, FaUserAlt } from "react-icons/fa";
import { TbPaperBag } from "react-icons/tb";
import { SiBuymeacoffee } from "react-icons/si";
import { MdDashboard, MdLabel } from "react-icons/md";

const icons = {
  FaUserAlt,
  BugOutlined,
  BugFilled,
  BugTwoTone,
  FaStore,
  SiBuymeacoffee,
  TbPaperBag,
  FaBoxes,
  FaReceipt,
  MdLabel,
  MdDashboard,
};

export const menuManager = {
  id: "Gerente",
  title: "Menu Encargado",
  type: "group",
  children: [
    {
      id: "manager0",
      title: "Dashboard",
      type: "item",
      url: "/",
      icon: icons.MdDashboard,
    },
    {
      id: "manager1",
      title: "Barcito",
      type: "item",
      url: "/barcito",
      icon: icons.FaStore,
    },
    {
      id: "manager2",
      title: "Pedidos",
      type: "item",
      url: "/pedidos",
      icon: icons.TbPaperBag,
    },
    {
      id: "manager3",
      title: "Productos",
      type: "item",
      url: "/productos",
      icon: icons.SiBuymeacoffee,
    },
    {
      id: "manager4",
      title: "Stock",
      type: "item",
      url: "/stock",
      icon: icons.FaBoxes,
    },
    {
      id: "manager5",
      title: "Categorías",
      type: "item",
      url: "/categorias",
      icon: icons.MdLabel,
    },
    {
      id: "manager6",
      title: "Recibos",
      type: "item",
      url: "/recibos",
      icon: icons.FaReceipt,
    },
    {
      id: "manager7",
      title: "Socios",
      type: "item",
      url: "/socios",
      icon: icons.FaUserAlt,
    },
  ],
};
