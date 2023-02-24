import { iCustomer } from "src/DTO/Customers";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import pdfFonts from "pdfmake/build/vfs_fonts";
var pdfMake = require("pdfmake");
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";
export const exportToCSV = (csvData: iCustomer[], fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export const exportPDF = (dataExport: iCustomer[]) => {
  const rows = dataExport.map((e) => [
    e.customerId.toString(),
    e.custFirstName.toString(),
    e.custLastName.toString(),
    e.custStreetAddress.toString(),
    e.custCity.toString(),
    e.custState.toString(),
    e.custZipCode.toString(),
    e.custPhone.toString(),
    e.custEmailAddress.toString(),
  ]);
  var docDefinition = {
    content: [
      { text: "Table customer", style: "subheader" },
      {
        table: {
          widths: [20, 50, 50, 50, 50, 50, 50, 50, 50],
          body: [
            [
              "ID",
              "First Name",
              "Last Name",
              "Address",
              "City",
              "State",
              "Zip Code",
              "Phone",
              "Email",
            ],

            ...rows,
          ],
        },
      },
    ],
  };

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake
    .createPdf(docDefinition, undefined, undefined, pdfFonts.pdfMake.vfs)
    .download();
};
