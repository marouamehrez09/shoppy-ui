import getProducts from "@/app/products/actions/get-product";
import AdminProductPage from "./admin-products";


export default async function ProductsPage() {
  const products = await getProducts(); // fetch côté serveur

  return <AdminProductPage products={products} />;
}
