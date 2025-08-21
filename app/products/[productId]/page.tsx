import { Stack, Typography, Grid } from "@mui/material";

import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../interfaces/product-image";
import Checkout from "@/app/checkout/checkout";
import { JSX } from "react";

interface SingleProductProps {
  params: { productId: string };
}

export default async function SingleProduct({
  params,
}: SingleProductProps): Promise<JSX.Element> {
  //const product = await getProduct(+params.productId);
  const { productId } = params; //  on attend params
  const product = await getProduct(+productId);

  return (
    <Grid container marginBottom={"2rem"} spacing={10}>
      {product?.imageExists && (
        <Grid size={6}>
          <Image
            src={getProductImage(product.id)}
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
