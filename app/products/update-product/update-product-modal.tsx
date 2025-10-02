"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import updateProductAction from "../actions/update-product";

const styles = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface EditProductModalProps {
  open: boolean;
  handleClose: () => void;
  product: { id: number; name: string; description: string; price: number };
}

export default function UpdateProductModal({
  open,
  handleClose,
  product,
}: EditProductModalProps) {
  const [form, setForm] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProductAction(product.id, form);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles}>
        <Typography variant="h6">Edit Product</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              name="description"
              label="Description"
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              name="price"
              label="Price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
