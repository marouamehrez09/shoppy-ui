"use client";

import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import deleteProductAction from "../actions/delete-product";
import { useState } from "react";

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

export default function ConfirmDeleteModal({
  open,
  handleClose,
  productId,
}: ConfirmDeleteModalProps) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteProductAction(productId);
      handleClose();
    } catch (err: unknown) {
      // Vérifie si err est un Error avant d'accéder à message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(""use client";

import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import deleteProductAction from "../actions/delete-product";
import { useState } from "react";

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

export default function ConfirmDeleteModal({
  open,
  handleClose,
  productId,
}: ConfirmDeleteModalProps) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteProductAction(productId);
      handleClose();
    } catch (err: unknown) {
      // Vérifie si err est un Error avant d'accéder à message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to delete this product.");
      }
    } // <-- Accolade fermante ajoutée ici
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles}>
        <Typography variant="h6">Confirm deletion</Typography>

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={2}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
");
      }
    } // <-- Accolade fermante ajoutée ici
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles}>
        <Typography variant="h6">Confirmer suppression</Typography>

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={2}>
          <Button onClick={handleClose}>Annuler</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Supprimer
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
