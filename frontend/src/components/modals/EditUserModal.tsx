import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER } from "../../graphql/mutations";
import { GET_USER_BY_ID } from "../../graphql/queries";
import { userSchema } from "../../types/form.types";
import { Loading } from "../ui/Loading";
import { ErrorPage } from "../ui/ErrorPage";

export function EditUserModal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });

  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, {
    refetchQueries: ["GetUsers"],
    awaitRefetchQueries: true,
    onCompleted: () => navigate(-1),
  });

  const [form, setForm] = useState({ email: "", name: "" });
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  useEffect(() => {
    if (data?.user) {
      setForm({ email: data.user.email, name: data.user.name });
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleClose = () => navigate(-1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        name: fieldErrors.name?.[0],
      });
      return;
    }

    try {
      await updateUser({ variables: { id, input: form } });
      handleClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        const message = err.message;
        if (message.includes("E11000 duplicate key error")) {
          setErrors((prev) => ({
            ...prev,
            email: "Пользователь с таким email уже существует",
          }));
        }
      } else {
        console.error(err);
      }
    }
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "500px",
          maxWidth: "90vw",
          minHeight: "320px",
        },
      }}
    >
      <DialogTitle>Редактировать пользователя</DialogTitle>
      <DialogContent>
        <form id="edit-user-form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Имя"
            type="text"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={updating}>
          Отмена
        </Button>
        <Button
          type="submit"
          form="edit-user-form"
          disabled={updating}
          variant="contained"
        >
          {updating ? "Сохраняю..." : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
