import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "../types/user.types";

export function UserTableRow({ user }: { user: User }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <TableRow key={user.id}>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() =>
              navigate(`/users/${user.id}`, {
                state: { backgroundLocation: location },
              })
            }
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              navigate(`/users/${user.id}/edit`, {
                state: { backgroundLocation: location },
              })
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              navigate(`/users/${user.id}/delete`, {
                state: { backgroundLocation: location },
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
