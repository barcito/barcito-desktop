import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import useTheme from "@mui/material/styles/useTheme";
import ReactApexChart from "react-apexcharts";
const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

function IncomeAreaChart({ slot, usersOrdersData }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: slot === "month" ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] : ["Lun", "Mar", "Mie", "Jue", "Vie"],
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary],
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: slot === "month" ? 11 : 7,
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
    }));
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: "Socios",
      data: [0, 86, 28, 115, 48, 210, 136],
    },
    {
      name: "No Socios",
      data: [0, 43, 14, 56, 24, 105, 68],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: "Socios",
        data: slot === "month" ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42],
      },
      {
        name: "No Socios",
        data: slot === "month" ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34],
      },
    ]);
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

export default IncomeAreaChart;

IncomeAreaChart.propTypes = {
  slot: PropTypes.string,
};
