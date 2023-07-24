import React from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { styled } from "@mui/system";

const PencilIcon = styled(Pencil)`
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const TrashIcon = styled(Trash)`
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const StyledTableRow = styled("tr")`
  background-color: rgba(209, 204, 246, 1);
`;

const Table = ({ users, handleEdit, handleDelete, searchQuery }) => {
  users.forEach((user, i) => {
    user.id = i + 1;
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <table>
        <thead>
          <StyledTableRow>
            <th>#</th>
            <th>Party Name</th>
            <th>Mobile Number</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Amount</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </StyledTableRow>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => (
              <tr key={user.id}>
                {/* Render the table rows for the filtered users */}
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.gold}</td>
                <td>{user.silver}</td>
                <td>{user.amount} </td>
                <td className="text-right">
                  <PencilIcon
                    weight="fill"
                    onClick={() => handleEdit(user.id)}
                  />
                </td>
                <td className="text-left">
                  <TrashIcon
                    weight="fill"
                    onClick={() => handleDelete(user.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Party Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
