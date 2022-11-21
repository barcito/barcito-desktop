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
      enabled: false,
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

  let mondaySales = 0;
  let tuesdaySales = 0;
  let wednesdaySales = 0;
  let thursdaySales = 0;
  let fridaySales = 0;

  if (usersOrdersData !== []) {
    mondaySales = getMondayUsersOrders(usersOrdersData);
    tuesdaySales = getTuesdayUsersOrders(usersOrdersData);
    wednesdaySales = getWednesdayUsersOrders(usersOrdersData);
    thursdaySales = getThusdayUsersOrders(usersOrdersData);
    fridaySales = getFridayUsersOrders(usersOrdersData);
  }

  console.log(mondaySales, tuesdaySales, wednesdaySales, thursdaySales, fridaySales);

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series] = useState([
    {
      data: [mondaySales, tuesdaySales, wednesdaySales, thursdaySales, fridaySales],
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
