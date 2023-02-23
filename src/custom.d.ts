declare interface String {
  prettyMoney: () => String;
}
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.ttf";

declare interface Array<T> {
  contains: (obj: T) => boolean;
}

// Array.prototype.contains = function (obj) {
//   var i = 0;
//   for (; i < this.length; i++) {
//     if (this[i] === obj) return true;
//   }
//   return false;
// };
