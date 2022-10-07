import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Toolbar, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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

AssociateListToolbar.propTypes = {
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
};

export default function AssociateListToolbar({ filterName, onFilterName }) {
    return (
        <RootStyle>
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
        </RootStyle>
    );
}
