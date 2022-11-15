import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Search from "./Search";
import Profile from "./Profile";
import MobileSection from "./MobileSection";

function HeaderContent() {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />}
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
}

export default HeaderContent;
