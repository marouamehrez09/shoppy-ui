import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import getOrders from "./actions/get-order";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <Box className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <Card key={order.id} className="shadow-md">
          <CardContent>
            <Typography variant="h6">{order.product.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {order.product.description}
            </Typography>
            <Typography variant="body1" className="mt-2 font-bold">
              ${order.product.price}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Purchased on {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
