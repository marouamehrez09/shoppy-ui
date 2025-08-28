"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Image from "next/image";
import { getProductImage } from "./interfaces/product-image";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/products/${product.id}`)}>
      <CardActionArea className="p-4">
        <Stack>
          <Typography variant="h4">{product.name}</Typography>
          {product?.imageUrl && (
            <Image
              src={product.imageUrl}
              className="w-full h-auto"
              alt="Picture of the product"
              width={100}
              height={100}
            />
          )}
          <Typography>{product.description}</Typography>
          <Typography>$ {product.price}</Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
