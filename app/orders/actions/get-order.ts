"use server";

import { get } from "@/app/common/util/fetch";
import { Order } from "../interfaces/order-interface";

export default async function getOrders() {
  return get<[Order]>(
    "orders",
    ["orders"]
    // new URLSearchParams({ status: "availible" })
  );
}
