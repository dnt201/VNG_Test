import { iOrders } from "../../DTO/Orders";
export function removeOrder(array: iOrders[], elem: iOrders) {
  var index = findIndexOfOrder(array, elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export function addListOrderToLocal(listOrder: iOrders[]) {
  localStorage.setItem("listOrder", JSON.stringify(listOrder));
}

// return index and -1 list not contain
export function findIndexOfOrder(listOrder: iOrders[], emp: iOrders) {
  var tempIndex = listOrder.findIndex((i) => i.orderNumber === emp.orderNumber);
  return tempIndex;
}
