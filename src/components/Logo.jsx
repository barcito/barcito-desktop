import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { config } from "../config";
import logo from "../assets/favicon.ico";
import useTheme from "@mui/material/styles/useTheme";

function LogoSection({ sx, to }) {
  const theme = useTheme();

  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <Stack direction="row" spacing={2}>
        <img src={logo} alt="Barcito" width="30" />
        <Typography variant="h3" component="h1" fontWeight="normal">
          Barcito
        </Typography>
      </Stack>
    </ButtonBase>
  );
}

export default LogoSection;

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};
