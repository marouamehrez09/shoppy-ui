"use client";

import { Card, CardActionArea, Stack, Typography, Box } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/products/${product.id}`)}
      sx={{
        width: 280,
        m: 1,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea sx={{ p: 2 }}>
        <Stack spacing={2}>
          {/* Image uniforme */}
          <Box
            sx={{
              width: "100%",
              height: 200,
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              bgcolor: "#f0f0f0",
            }}
          >
            {product?.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>

          {/* Texte uniforme */}
          <Box sx={{ minHeight: 80 }}>
            <Typography
              variant="h6"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.description}
            </Typography>
          </Box>

          {/* Prix */}
          <Typography variant="subtitle1" fontWeight="bold">
            $ {product.price}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
