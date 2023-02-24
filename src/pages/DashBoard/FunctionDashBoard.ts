import { iCount } from "./index";
export function findExist(list: iCount[], temp: number) {
  var tempIndex = list.findIndex((i) => i.id === temp);
  return tempIndex;
}
