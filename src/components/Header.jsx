import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { GiSpikedDragonHead } from "react-icons/gi";
import { handleLogout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user";

const pages = ["Home", "Profile", "Upload"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GiSpikedDragonHead className="mr-1" size={25} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OSRB
          </Typography>
          {!user ? (
            <> </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => {
                      navigate("/" + page.toLowerCase());
                    }}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </>
          )}
          {!user ? (
            <></>
          ) : (
            <Button
              onClick={() => {
                handleLogout();

                navigate("/landing");
              }}
              variant="text"
              color="inherit"
            >
              LogOut
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
