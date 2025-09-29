"use server";

import { get } from "@/app/common/util/fetch";
import { Order } from "../interfaces/order-interface";

export default async function getOrders() {
  return get<[Order]>(
    "products",
    ["products"]
    // new URLSearchParams({ status: "availible" })
  );
}
