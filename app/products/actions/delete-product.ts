"use server";

import { del } from "@/app/common/util/fetch";
import revalidateProduct from "@/app/products/actions/revalidate-products";

/**
 * Supprime un produit par son ID
 * et rafraîchit la liste côté client.
 */
export default async function deleteProductAction(productId: number) {
  const { error } = await del(`products/${productId}`);

  if (error) {
    throw new Error(error);
  }

  // Réactualiser la liste des produits
  revalidateProduct();
}
