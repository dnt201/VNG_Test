import { iEmployee } from "src/DTO/Employee";
export function removeEmployee(array: iEmployee[], elem: iEmployee) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export function addListEmployeeToLocal(listEmp: iEmployee[]) {
  localStorage.setItem("listEmployee", JSON.stringify(listEmp));
}
