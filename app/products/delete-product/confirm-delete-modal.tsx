"use client";

import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import deleteProductAction from "../actions/delete-product";


const styles = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ConfirmDeleteModalProps {
  open: boolean;
  handleClose: () => void;
  productId: number;
}

export default function ConfirmDeleteModal({ open, handleClose, productId }: ConfirmDeleteModalProps) {
  const handleDelete = async () => {
    await deleteProductAction(productId);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles}>
        <Typography variant="h6">Confirmer suppression</Typography>
        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={2}>
          <Button onClick={handleClose}>Annuler</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Supprimer</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
