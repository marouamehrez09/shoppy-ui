"use server";

import { get } from "@/app/common/util/fetch";
import { Order } from "../interfaces/order-interface";

export default async function getAllOrders() {
  return get<[Order]>("orders/all", ["orders"]);
}
