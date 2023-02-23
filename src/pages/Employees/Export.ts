import { iEmployee } from "src/DTO/Employee";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import pdfFonts from "pdfmake/build/vfs_fonts";
var pdfMake = require("pdfmake");
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";
export const exportToCSV = (csvData: iEmployee[], fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export const exportPDF = (dataExport: iEmployee[], titleExort: string) => {
  const headers = dataExport.map((e) => [
    e.employeeNumber.toString(),
    e.empFirstName.toString(),
    e.empLastName.toString(),
    e.dateHired.toString(),
    e.empCity.toString(),
    e.empPhoneNumber.toString(),
    e.empPosition.toString(),
    e.empState.toString(),
    e.empStreetAddress.toString(),
    e.empZipCode.toString(),
    e.hourlyRate.toString(),
  ]);
  var docDefinition = {
    content: [
      { text: "Tables List Employee", style: "subheader" },
      {
        table: {
          widths: [20, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
          body: [
            [
              "ID",
              "First Name",
              "Last Name",
              "Date Hired",
              "City",
              "Phone Number",
              "Position",
              "State",
              "Street Address",
              "Zip Code",
              "Hourly Rate",
            ],

            ...headers,
          ],
        },
      },
    ],
  };
  //   const title = titleExort || "My export PDF file";

  //   autoTable(doc, {
  //     head: headers,
  //     body: data,
  //     didDrawCell: (data) => {},
  //   });
  //   doc.addFileToVFS("yourFont.ttf", MyFont); // your font in binary format as second parameter
  //   doc.addFont("yourFont.ttf", "yourFont", "normal");
  //   doc.setFont("yourFont");
  //   doc.save("table.pdf");
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake
    .createPdf(docDefinition, undefined, undefined, pdfFonts.pdfMake.vfs)
    .download();
};
