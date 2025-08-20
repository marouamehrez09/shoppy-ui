"use client";

import { Product as IProduct } from "./interfaces/product.interface";
import { Grid } from "@mui/material";
import Product from "./product";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import API_URL from "../common/constants/api";
import revalidateProducts from "./actions/revalidate-products";
import getAuthentication from "../auth/actions/get-authentication";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  useEffect(() => {
    let socket: Socket;

    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication(),
        },
      });

      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    };

    createSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "85vh", overflow: "scroll" }}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 6, md: 4 }}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
