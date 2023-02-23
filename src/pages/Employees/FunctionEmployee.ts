import { iEmployee } from "src/DTO/Employee";
export function removeEmployee(array: iEmployee[], elem: iEmployee) {
  var index = findIndexOfEmployee(array, elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export function addListEmployeeToLocal(listEmp: iEmployee[]) {
  localStorage.setItem("listEmployee", JSON.stringify(listEmp));
}

// return index and -1 list not contain
export function findIndexOfEmployee(listEmp: iEmployee[], emp: iEmployee) {
  var tempIndex = listEmp.findIndex(
    (i) => i.employeeNumber === emp.employeeNumber
  );
  return tempIndex;
}
