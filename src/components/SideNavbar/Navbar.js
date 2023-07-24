import React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
import { House } from "@phosphor-icons/react";
import { Typography } from "@mui/material";

const SideNavbar = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 0.12;
  border-right: 1px solid grey;
  position: sticky;
`;

const StyledImage = styled("img")`
  display: flex;
  width: 70%;
  margin-bottom: 40px;
  margin-top: 40px;
  margin-left: 20px;
  align-items: center;
  cursor: pointer;
`;

const NavHeadLabel = styled(Box)`
  display: flex;
  justify-content: row;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 5px;
  gap: 5px;
  cursor: pointer;
`;

const NavItems = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
`;

const NavItemSelected = styled(Box)`
  text-align: center;
  background: rgba(72, 72, 72, 1);
  color: white;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <SideNavbar>
      <StyledImage src={process.env.PUBLIC_URL + "/brand_logo.png"} />
      <NavHeadLabel>
        <House size={20} weight="fill" />
        <Typography fontWeight={700}>Parties</Typography>
      </NavHeadLabel>
      <NavItems>
        <NavItemSelected>Karigar</NavItemSelected>
        <Typography sx={{ textAlign: "center" }}>Bullion</Typography>
        <Typography sx={{ textAlign: "center" }}>Supplier</Typography>
        <Typography sx={{ textAlign: "center" }}>Customer</Typography>
      </NavItems>
    </SideNavbar>
  );
};

export default Navbar;
