import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../../graphql/queries";

export function ViewUserModel() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const handleClose = () => navigate(-1);

  return (
    <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Информация о пользователе</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Ошибка: {error.message}</Typography>
        ) : (
          <Box py={2}>
            <Stack spacing={3} mb={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Имя:
                </Typography>
                <Typography variant="subtitle1">{data.user.name}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email:
                </Typography>
                <Typography variant="subtitle1">{data.user.email}</Typography>
              </Box>
            </Stack>
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                ID пользователя:
              </Typography>
              <Typography variant="body1">{data.user.id}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
