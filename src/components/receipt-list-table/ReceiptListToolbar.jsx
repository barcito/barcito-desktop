import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AddBox } from "@mui/icons-material";

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

ReceiptListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function ReceiptListToolbar({ filterName, onFilterName, handleNew }) {
  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Buscar recibo..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "text.disabled", width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Tooltip title="Generar recibo">
        <IconButton color="primary" onClick={() => handleNew()}>
          <AddBox fontSize="large" />
        </IconButton>
      </Tooltip>
    </RootStyle>
  );
}
