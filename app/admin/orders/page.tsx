
import getOrders from "@/app/orders/actions/get-order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
      Order History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Produit</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell>{o.id}</TableCell>
              <TableCell>{o.user?.email}</TableCell>
              <TableCell>{o.product?.name}</TableCell>
              <TableCell>
                {new Date(o.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
