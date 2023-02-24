import { iCustomer } from "src/DTO/Customers";
import { iCount } from "./index";
export function findExistCus(list: iCount[], temp: number) {
  var tempIndex = list.findIndex((i) => i.id === temp);
  return tempIndex;
}
