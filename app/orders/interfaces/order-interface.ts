import { Product } from "./../../products/interfaces/product.interface";
import { User } from "@/app/profile/interfaces/user-interface";

export interface Order {
  id: number;
  userId: number;
  user: User;
  product: Product;
  productId: number;
  createdAt: Date;
}
