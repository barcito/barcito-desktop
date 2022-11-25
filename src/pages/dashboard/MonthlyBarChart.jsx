import { useEffect, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import ReactApexChart from "react-apexcharts";

function getMondayUsersOrders(usersOrdersData) {
  const mondayUsersOrders = usersOrdersData.filter((order) => {
    if (order.status === "Entregado") {
      const orderDate = new Date(order.updatedAt);
      const day = orderDate.getDay();
      return day === 1;
    }
  });
  // console.log("mondayUsersOrders", mondayUsersOrders.length.toString());
  return mondayUsersOrders.length;
}

function getTuesdayUsersOrders(usersOrdersData) {
  const tuesdayUserOrders = usersOrdersData.filter((order) => {
    if (order.status === "Entregado") {
      const orderDate = new Date(order.updatedAt);
      const day = orderDate.getDay();
      return day === 2;
    }
  });
  // console.log("tuesdayUserOrders", tuesdayUserOrders);
  return tuesdayUserOrders.length;
}

function getWednesdayUsersOrders(usersOrdersData) {
  const wednesdayUserOrders = usersOrdersData.filter((order) => {
    if (order.status === "Entregado") {
      const orderDate = new Date(order.updatedAt);
      const day = orderDate.getDay();
      return day === 3;
    }
  });
  // console.log("wednesdayUserOrders", wednesdayUserOrders);
  return wednesdayUserOrders.length;
}

function getThusdayUsersOrders(usersOrdersData) {
  const thursdayUserOrders = usersOrdersData.filter((order) => {
    if (order.status === "Entregado") {
      const orderDate = new Date(order.updatedAt);
      const day = orderDate.getDay();
      return day === 4;
    }
  });
  // console.log("thursdayUserOrders", thursdayUserOrders);
  return thursdayUserOrders.length;
}

function getFridayUsersOrders(usersOrdersData) {
  const fridayUserOrders = usersOrdersData.filter((order) => {
    if (order.status === "Entregado") {
      const orderDate = new Date(order.updatedAt);
      const day = orderDate.getDay();
      return day === 5;
    }
  });
  // console.log("fridayUserOrders", fridayUserOrders);
  return fridayUserOrders.length;
}

function MonthlyBarChart({ usersOrdersData }) {
  const theme = useTheme();

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 365,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ["Lu", "Ma", "Mi", "Ju", "Vi"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  let mondaySales = getMondayUsersOrders(usersOrdersData);
  let tuesdaySales = getTuesdayUsersOrders(usersOrdersData);
  let wednesdaySales = getWednesdayUsersOrders(usersOrdersData);
  let thursdaySales = getThusdayUsersOrders(usersOrdersData);
  let fridaySales = getFridayUsersOrders(usersOrdersData);

  let dailySales = [mondaySales, tuesdaySales, wednesdaySales, thursdaySales, fridaySales];

  // console.log(dailySales);

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series] = useState([
    {
      name: "Total de ventas del día",
      data: [42, 72, 73, 83, 76, 8],
      // data: [dailySales[0], dailySales[1], dailySales[2], dailySales[3], dailySales[4]],
    },
  ]);

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary],
          },
        },
      },
      tooltip: {
        theme: "light",
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
}

export default MonthlyBarChart;
