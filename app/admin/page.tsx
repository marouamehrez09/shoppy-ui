import getProducts from "@/app/products/actions/get-product";
import getOrders from "@/app/orders/actions/get-order";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";

export default async function AdminOrdersPage() {
  const products = await getProducts();
  const orders = await getOrders();


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              color: "white",
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Typography variant="h6">Products</Typography>
              <Typography variant="h3" fontWeight="bold">
                {products.length}
              </Typography>
              <Typography variant="body2">Total Registered</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
              color: "white",
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="h3" fontWeight="bold">
                {orders.length}
              </Typography>
              <Typography variant="body2">Total Received</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #9c27b0, #ba68c8)",
              color: "white",
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
