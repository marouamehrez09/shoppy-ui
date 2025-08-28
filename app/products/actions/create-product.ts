"use server";

import { revalidateTag } from "next/cache";
import { post } from "@/app/common/util/fetch";
import { uploadToCloudinary } from "@/app/common/util/cloudinary";

export default async function createProduct(formData: FormData) {
  // Extraire le fichier image
  const productImage = formData.get("image") as File | null;

  // Construire l’objet produit sans l’image
  const formObj = Object.fromEntries(formData.entries());
  formObj.price = String(Number(formObj.price));
  delete formObj.image; 

  // Upload image sur Cloudinary avant création du produit
  let imageUrl: string | null = null;
  if (productImage) {
    imageUrl = await uploadToCloudinary(productImage);
    console.log("✅ URL reçue de Cloudinary (frontend):", imageUrl);
  }

  // Envoyer le produit au backend avec l’URL de Cloudinary
  console.log("🚀 Produit envoyé au backend (frontend):", { ...formObj, image: imageUrl });
  const response = await post("products", { ...formObj, image: imageUrl });

  revalidateTag("products");
  return response;
}
