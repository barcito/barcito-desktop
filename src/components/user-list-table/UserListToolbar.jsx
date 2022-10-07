import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { PersonAdd } from "@mui/icons-material";

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

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, handleNew, handleDelete }) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} seleccionado
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Buscar usuario..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.disabled", width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Borrar Usuario(s)">
          <IconButton color="error" onClick={() => handleDelete()}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      ) : ( handleNew &&
        <Tooltip title="Nuevo Usuario">
          <IconButton color="primary" onClick={() => handleNew()}>
            <PersonAdd fontSize="large"/>
          </IconButton>
        </Tooltip>
        )}
    </RootStyle>
  );
}
