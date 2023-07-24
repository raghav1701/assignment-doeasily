import React, { useState } from "react";
import { Box } from "@mui/system";
import { Chip } from "@material-ui/core";
import { Camera } from "@phosphor-icons/react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";

const Header = styled(Box)`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  gap: 10px;
`;

const HeaderText = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  color: gba(79, 97, 125, 1);
`;

const GroupsSelect = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-bottom: 20px;
`;

const DisplayChip = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

const FormInputs = styled(Box)`
  margin-top: 25px;
  padding-left: 70px;
`;

const FormFeilds = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 100px;
  justify-content: center;
  align-items: flex-start;
`;

const FormRow = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormButtons = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  gap: 20px;
`;

const FormButton = styled(Button)`
  color: rgba(72, 72, 72, 1);
  border: 1px solid black;
  &:hover {
    color: black;
  }
`;

const Edit = ({ users, selectedUser, setUsers, setIsEditing }) => {
  const id = selectedUser.id;
  console.log(selectedUser.partyGroup);
  const [partyGroup, setPartyGroup] = useState(selectedUser.partyGroup);
  const [name, setName] = useState(selectedUser.name);
  const [phoneNumber, setPhoneNumber] = useState(selectedUser.phoneNumber);
  const [address, setAddress] = useState(selectedUser.address);
  const [city, setCity] = useState(selectedUser.city);
  const [pincode, setPincode] = useState(selectedUser.pincode);
  const [gst, setGst] = useState(selectedUser.gst);
  const [pan, setPan] = useState(selectedUser.pan);
  const [aadhar, setAadhar] = useState(selectedUser.aadhar);
  const [error, setError] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    if (isNaN(phoneNumber) || phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (isNaN(aadhar) || aadhar.length !== 12) {
      setError("Please enter a valid 12-digit aadhar number.");
      return;
    }

    if (isNaN(pan) || pan.length !== 10) {
      setError("Please enter a valid pan number.");
      return;
    }

    const user = {
      id,
      partyGroup,
      name,
      phoneNumber,
      address,
      city,
      pincode,
      gst,
      pan,
      aadhar,
      gold: "-25.966 gm",
      silver: "-14.200 kg",
      amount: "+1,850.00",
    };
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        users.splice(i, 1, user);
        break;
      }
    }

    localStorage.setItem("users_data", JSON.stringify(users));
    setUsers(users);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleUpdate}>
      <Header>
        <HeaderText>Add Party</HeaderText>
        <Camera size={25} weight="duotone" />
      </Header>
      <FormInputs>
        <label>Party Groups</label>
        <GroupsSelect>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="partyGroupLabel">Select Party Group</InputLabel>
            <Select
              labelId="partyGroupLabel"
              id="partyGroup"
              multiple
              value={partyGroup}
              label="Select Party Group"
              onChange={(e) => setPartyGroup(e.target.value)}
            >
              <MenuItem value="Karigar">Karigar</MenuItem>
              <MenuItem value="Bullion">Bullion</MenuItem>
              <MenuItem value="Supplier">Supplier</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
            </Select>
          </FormControl>
          <DisplayChip>
            {partyGroup.map((group) => (
              <Chip key={group} label={group} />
            ))}
          </DisplayChip>
        </GroupsSelect>

        <FormFeilds>
          <FormRow>
            <Box sx={{ width: 200 }}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                required="true"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ width: 200 }}>
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <Box sx={{ width: 200 }}>
              <label htmlFor="gst">GSTIN</label>
              <input
                id="gst"
                type="text"
                name="gst"
                placeholder="Enter 16 digit GSTIN"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              />
            </Box>
          </FormRow>

          <FormRow>
            <Box>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="number"
                name="phoneNumber"
                placeholder="Enter 10 digit number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Box>
            <Box sx={{ width: 200 }}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                value={city}
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
              />
            </Box>
            <Box sx={{ width: 200 }}>
              <label htmlFor="pan">PAN Number</label>
              <input
                id="pan"
                type="text"
                name="pan"
                placeholder="Enter 10 PAN number"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              />
            </Box>
          </FormRow>

          <FormRow>
            <Box sx={{ width: 200 }}>
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                type="number"
                name="pincode"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </Box>
            <Box sx={{ width: 200 }}>
              <label htmlFor="aadhar">Aadhar</label>
              <input
                id="aadhar"
                type="number"
                name="aadhar"
                value={aadhar}
                placeholder="Enter 12 digit Aadhar"
                onChange={(e) => setAadhar(e.target.value)}
              />
            </Box>
          </FormRow>
        </FormFeilds>
      </FormInputs>

      <FormButtons>
        <FormButton onClick={() => setIsEditing(false)}>Cancel</FormButton>
        <FormButton type="submit">Save</FormButton>
      </FormButtons>

      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
};

export default Edit;
