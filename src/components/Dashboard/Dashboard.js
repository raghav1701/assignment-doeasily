import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { OutlinedInput, Typography, Modal, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import { Chip } from "@material-ui/core";
import { PlusCircle, UserCircle } from "@phosphor-icons/react";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Navbar from "../SideNavbar/Navbar";

// USING STYLED COMPONENTS FOR CSS DESIGNS

const Root = styled(Box)`
  overflow: hidden;
`;

const Home = styled(Box)`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 100vh;
  overflow: hidden;
`;

const SelectedParty = styled(Box)`
  display: flex;
  flex-direction: column;
  width: fit-content;
  border: 5px solid rgba(79, 97, 125, 1);
  border-radius: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  align-items: flex-start;
`;

const TableContainer = styled(Box)`
  flex: 0.88;
  overflow-y: auto;
  height: 100vh;
`;

const ModalContainer = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: fit-content;
  height: fit-content;

  background-color: #fff;
  outline: 0;

  border-radius: ${({ theme }) => theme.spacing(1)};
`;

const FormContainer = styled("div")`
  display: flex;

  align-items: center;
  justify-content: center;

  padding: 20px 30px 40px 30px;
`;

const MainDisplay = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 0.88;
  padding: 20px 50px;
  gap: 20px;
`;

const PartyDebt = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 50px;
  background: rgba(72, 72, 72, 1);
  width: fit-content;
  border-radius: 15px;
  padding: 3px 30px;
  color: white;
  border: 1px solid black;
  cursor: pointer;
  margin-top: 20px;
`;

const Party = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  gap: 35px;
`;

const PartyDetails = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 110px;
`;

const StyledRow = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const SearchSection = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);

  //fetching users data from localStorage on initial load.
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users_data"));
    if (data !== null && Object.keys(data).length !== 0) setUsers(data);
  }, []);

  // function to handle updating users data
  const handleEdit = (id) => {
    const [user] = users.filter((user) => user.id === id);
    setSelectedUser(user);
    setIsEditing(true);
  };

  // function to delete user data
  const handleDelete = (id) => {
    const usersCopy = users.filter((user) => user.id !== id);
    localStorage.setItem("users_data", JSON.stringify(usersCopy));
    setUsers(usersCopy);
  };

  // search user handler
  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUser(filteredUsers[0]);
  };

  // function to render modal on action button clicks present in the table view
  const renderModal = () => (
    <Modal open={isAdding || isEditing}>
      <ModalContainer>
        <FormContainer>
          {isAdding && (
            <Add users={users} setUsers={setUsers} setIsAdding={setIsAdding} />
          )}

          {isEditing && (
            <Edit
              users={users}
              selectedUser={selectedUser}
              setUsers={setUsers}
              setIsEditing={setIsEditing}
            />
          )}
        </FormContainer>
      </ModalContainer>
    </Modal>
  );

  return (
    <Root>
      {!isAdding && !isEditing && (
        <Home>
          {/* rendering side Navbar */}
          <Navbar />

          <MainDisplay>
            {/* TabBar display */}
            <Header>
              <PartyDebt>
                <Typography>Gold</Typography>
                <Typography>Silver</Typography>
                <Typography>Both</Typography>
              </PartyDebt>
              <UserCircle size={40} weight="duotone" />
            </Header>

            {/* displaying data for searched / selected party */}
            <SelectedParty>
              <Party>
                <Typography color="primary" fontWeight={600}>
                  {filteredUser.name ? filteredUser.name : "Party"}
                </Typography>
                <Chip
                  color="primary"
                  label="Add Party"
                  icon={<PlusCircle size={20} />}
                  onClick={() => setIsAdding(true)}
                  size="small"
                  variant="outlined"
                />
              </Party>
              <PartyDetails>
                <StyledRow>
                  <Typography>Silver</Typography>
                  <Typography fontWeight={700} color="rgba(188, 92, 92, 1)">
                    14.200 Kg
                  </Typography>
                  <Typography fontWeight={700} color="rgba(188, 92, 92, 1)">
                    Lena
                  </Typography>
                </StyledRow>
                <StyledRow>
                  <Typography>Gold</Typography>
                  <Typography fontWeight={700} color="rgba(188, 92, 92, 1)">
                    25.966 Gm
                  </Typography>
                  <Typography fontWeight={700} color="rgba(188, 92, 92, 1)">
                    Lena
                  </Typography>
                </StyledRow>
                <StyledRow>
                  <Typography>Amount</Typography>
                  <Typography fontWeight={700} color="rgba(85, 166, 84, 1)">
                    1,850.00
                  </Typography>
                  <Typography fontWeight={700} color="rgba(85, 166, 84, 1)">
                    Dena
                  </Typography>
                </StyledRow>
              </PartyDetails>
            </SelectedParty>

            {/* search bar to search registered users */}
            <SearchSection>
              <FormControl sx={{ width: "30ch" }}>
                <OutlinedInput
                  placeholder="Search Karigar"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </FormControl>
              <Chip
                label="Search"
                variant="outlined"
                onClick={handleSearch}
                size="medium"
              />
            </SearchSection>

            {/* tabular display of registered users */}
            <TableContainer>
              <Table
                users={users}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                searchQuery={searchQuery}
              />
            </TableContainer>
          </MainDisplay>
        </Home>
      )}

      {/* rendering of the modal when edit or add button is clicked */}
      {isEditing && renderModal()}
      {isAdding && renderModal()}
    </Root>
  );
};

export default Dashboard;
