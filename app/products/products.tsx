import getProducts from "./actions/get-product";
import ProductGrid from "./products-grid";

export default async function Products() {
  const products = await getProducts();

  return (
    <ProductGrid products={products} />
  );
}
