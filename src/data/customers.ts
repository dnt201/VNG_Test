import { iEmployee } from "src/DTO/Employee";

export interface iOption {
  value: string;
  label: string;
}

export var listFilter: iOption[] = [
  { value: "not", label: "Not set" },
  {
    value: "inc",
    label: "Increase",
  },
  { value: "dec", label: "Decrease" },
];

export var listEmployees: iEmployee[] = [
  {
    employeeNumber: 1,
    empFirstName: "Trần Duy",
    empLastName: "Nhã",
    empStreetAddress: "7 Đường 19 An Bình Quận 2",
    empCity: "Thủ Đức",
    empState: "Hồ Chí Minh",
    empZipCode: 100000,
    empPhoneNumber: "0368689201",
    empPosition: "Nhân viên",
    hourlyRate: 50000,
    dateHired: "28/02/2023",
  },
  {
    employeeNumber: 2,
    empFirstName: "Trần Duy",
    empLastName: "Nhã",
    empStreetAddress: "7 Đường 19 An Bình Quận 2",
    empCity: "Thủ Đức",
    empState: "Hồ Chí Minh",
    empZipCode: 100000,
    empPhoneNumber: "0368689201",
    empPosition: "Nhân viên",
    hourlyRate: 50000,
    dateHired: "28/02/2023",
  },
  {
    employeeNumber: 3,
    empFirstName: "Trần Duy",
    empLastName: "Nhã",
    empStreetAddress: "7 Đường 19 An Bình Quận 2",
    empCity: "Thủ Đức",
    empState: "Hồ Chí Minh",
    empZipCode: 100000,
    empPhoneNumber: "0368689201",
    empPosition: "Nhân viên",
    hourlyRate: 50000,
    dateHired: "28/02/2023",
  },
];
