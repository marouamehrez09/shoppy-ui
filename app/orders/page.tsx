"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import API_URL from "@/app/common/constants/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface Order {
  id: number;
  createdAt: string;
  product: Product;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/orders`, {
          credentials: "include", // important pour envoyer le cookie JWT
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box className="flex flex-col justify-center items-center h-64">
        <Typography variant="h6">You don’t have any orders yet.</Typography>
      </Box>
    );
  }

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
