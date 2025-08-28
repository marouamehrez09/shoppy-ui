import React from "react";
import { Stack, Typography, Grid } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../interfaces/product-image";
import Checkout from "@/app/checkout/checkout";

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

  return (
    <Grid container marginBottom={"2rem"} spacing={10}>
      {product?.imageUrl && (
        <Grid size={6}>
          <Image
            src={product.imageUrl}
            width={200}
            height={0}
            className="w-full h-auto sm:"
            alt="Picture of the product"
          />
        </Grid>
      )}
      <Grid size={6}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">$ {product.price} </Typography>
          <Checkout productId={product.id} />
        </Stack>
      </Grid>
    </Grid>
  );
}
