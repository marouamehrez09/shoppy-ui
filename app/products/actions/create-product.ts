"use server";

import API_URL from "@/app/common/constants/api";
import { getHeaders, post } from "@/app/common/util/fetch";
import { revalidateTag } from "next/cache";

export default async function createProduct(formData: FormData) {
  // Extraire le fichier avant de convertir en objet
  const productImage = formData.get("image") as File | null;

  // Convertir les champs texte en objet
  const formObj = Object.fromEntries(formData.entries());
  formObj.price = String(Number(formObj.price));

  // Envoyer le produit sans le fichier
  const response = await post("products", formObj);

  // Upload de l'image seulement si produit créé avec succès
  if (productImage && !response.error) {
    await uploadProductImage((await response).data.id, productImage);
  }

  revalidateTag("products");
  return response;
}

async function uploadProductImage(productId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);

  await fetch(`${API_URL}/products/${productId}/image`, {
    method: "POST",
    body: formData,
    headers: await getHeaders(), // attention : ne pas mettre 'Content-Type', FormData s'en occupe
  });
}
