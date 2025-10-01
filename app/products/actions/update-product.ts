"use server";

import { put } from "@/app/common/util/fetch";
import revalidateProduct from "@/app/products/actions/revalidate-products";

export default async function updateProductAction(
  productId: number,
  data: { [key: string]: unknown }
) {
  const { error } = await put(`products/${productId}`, data);

  if (error) {
    throw new Error(error);
  }

  // ⚡ force refresh des produits en cache
  revalidateProduct();
}
