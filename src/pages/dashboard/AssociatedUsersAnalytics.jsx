import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "../../components/MainCard";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

function calculateLastWeekUsers(usersData) {
  let lastWeekUsers = usersData.filter((user) => {
    let userDate = new Date(user.createdAt);
    let lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    return userDate >= lastWeekDate;
  });
  return lastWeekUsers.length;
}

function calculateLastWeekUsersPercentage(usersData) {
  let lastWeekUsersSum = calculateLastWeekUsers(usersData);

  let lastWeekUsersPercentage = (lastWeekUsersSum / usersData.length) * 100;

  return Math.round(lastWeekUsersPercentage);
}

function calculateLastWeekAssociatedUsers(usersData) {
  let lastWeekUsers = usersData.filter((user) => {
    if (user.applicationDone) {
      let userDate = new Date(user.createdAt);
      let lastWeekDate = new Date();
      lastWeekDate.setDate(lastWeekDate.getDate() - 7);
      return userDate >= lastWeekDate;
    }
  });
  return lastWeekUsers.length;
}

function AssociatedUsersAnalytics({ color, usersData }) {
  // let percentage = calculateLastWeekUsersPercentage(usersData);
  let percentage = 34;
  let isLoss = false;

  if (isNaN(percentage)) {
    percentage = 0;
  }

  if (percentage <= 0) {
    isLoss = true;
  }

  // console.log(percentage);

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          Total Semanal Usuarios
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {/* {usersData.length} */}
              45
            </Typography>
          </Grid>
          {percentage !== 0 && (
            <Grid item>
              <Chip
                variant="combined"
                color={isLoss ? "error" : "success"}
                icon={
                  <>
                    {!isLoss && <RiseOutlined style={{ fontSize: "0.75rem", color: "inherit" }} />}
                    {isLoss && <FallOutlined style={{ fontSize: "0.75rem", color: "inherit" }} />}
                  </>
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}

          {percentage === 0 && (
            <Grid item>
              <Chip variant="combined" color={"error"} icon={<>{isLoss && <FallOutlined style={{ fontSize: "0.75rem", color: "inherit" }} />}</>} label={`${percentage}%`} sx={{ ml: 1.25, pl: 1 }} size="small" />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          En la última semana se asociaron{" "}
          <Typography component="span" variant="caption" sx={{ color: `${color || "primary"}.main` }}>
            {/* {calculateLastWeekAssociatedUsers(usersData)} */}
            15
          </Typography>{" "}
          usuarios
        </Typography>
      </Box>
    </MainCard>
  );
}

export default AssociatedUsersAnalytics;

AssociatedUsersAnalytics.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

AssociatedUsersAnalytics.defaultProps = {
  color: "primary",
};
