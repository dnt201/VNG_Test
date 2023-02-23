import { iCustomer } from "./../../DTO/Customers";
export function removeCustomer(array: iCustomer[], elem: iCustomer) {
  var index = findIndexOfCustomer(array, elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export function addListCustomerToLocal(listCus: iCustomer[]) {
  localStorage.setItem("listCustomer", JSON.stringify(listCus));
}

// return index and -1 list not contain
export function findIndexOfCustomer(listCus: iCustomer[], emp: iCustomer) {
  var tempIndex = listCus.findIndex((i) => i.customerId === emp.customerId);
  return tempIndex;
}
