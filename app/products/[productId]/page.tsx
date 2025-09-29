import React from "react";
import { Stack, Typography, Grid } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import Checkout from "@/app/checkout/checkout";
import authenticated from "@/app/auth/actions/authenticated";

// Define the interface for the params
interface SingleProductParams {
  productId: string;
}

// Define the props interface for the page
interface SingleProductProps {
  params: Promise<SingleProductParams>; // params is a Promise
}

export default async function SingleProduct({
  params,
}: SingleProductProps): Promise<React.JSX.Element> {
  // Await the params to get the actual productId
  const { productId } = await params; // Resolve the Promise
  const product = await getProduct(+productId);
  const isAuthenticated = await authenticated();
  return (
    <Grid container marginBottom={"2rem"} spacing={10}>
      {product?.image && (
        <Grid size={6}>
          <Image
            src={product.image!} // l’URL Cloudinary
            alt={product.name}
            width={400} // largeur fixe
            height={400} // hauteur fixe
            style={{ objectFit: "cover" }}
          />
        </Grid>
      )}
      <Grid size={6}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">$ {product.price} </Typography>
          {isAuthenticated && <Checkout productId={product.id} />}
        </Stack>
      </Grid>
    </Grid>
  );
}
