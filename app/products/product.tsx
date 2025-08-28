"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Image from "next/image";
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
          {product?.image && (
            <Image
            src={product.image}          // ton URL Cloudinary
            alt={product.name}
            width={400}                   // largeur standard
            height={400}                  // hauteur standard
            objectFit="cover"             // pour que l'image remplisse le carré
            style={{ borderRadius: '8px' }} // optionnel pour arrondir
            />
          )}
          <Typography>{product.description}</Typography>
          <Typography>$ {product.price}</Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
