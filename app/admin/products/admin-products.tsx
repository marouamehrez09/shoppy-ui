"use client";

import { useState } from "react";
import CreateProductFab from "@/app/products/create-product/create-product-fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  TextField,
} from "@mui/material";

import ConfirmDeleteModal from "@/app/products/delete-product/confirm-delete-modal";
import UpdateProductModal from "@/app/products/update-product/update-product-modal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface AdminOrdersPageProps {
  products: Product[];
}

export default function AdminProductPage({ products }: AdminOrdersPageProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState("");

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleOpenDelete = (product: Product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  const handleCloseModals = () => {
    setOpenEdit(false);
    setOpenDelete(false);
    setSelectedProduct(null);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Product History
        </Typography>
        <CreateProductFab />
      </div>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {products
                  .filter((p) =>
                  p.name.toLowerCase().includes(searchText.toLowerCase())
            )
              .map((p) => (
        <TableRow key={p.id}>
          <TableCell>{p.name}</TableCell>
          <TableCell>{p.description}</TableCell>
          <TableCell>
        {p.price.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        })}
      </TableCell>
      <TableCell>
        <Button color="warning" onClick={() => handleOpenEdit(p)}>
          <EditIcon />
        </Button>
        <Button color="error" onClick={() => handleOpenDelete(p)}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
))}

        </TableBody>
      </Table>

            {/* Modal update */}
      {selectedProduct && (
        <UpdateProductModal
          open={openEdit}
          handleClose={handleCloseModals}
          product={selectedProduct}
        />
      )}

      {/* Modal delete */}
      {selectedProduct && (
        <ConfirmDeleteModal
          open={openDelete}
          handleClose={handleCloseModals}
          productId={selectedProduct.id}
        />
      )}
    </Paper>
  );
}
