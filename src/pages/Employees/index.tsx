import { useEffect, useState } from "react";
// import { listEmployees } from "src/data/customers";
import {
  Check,
  DocumentArrowDown,
  Magnifying,
  PickAll,
  Plus,
  Trash,
  UnPickAll,
  Wrench,
} from "src/icons";
import ReactTooltip from "react-tooltip";
import { iEmployee } from "src/DTO/Employee";
import Modal from "react-modal";
import { customStyles } from "src/assets/customModal";
import { toast } from "react-toastify";
import AddNewEmployee from "./AddNew";
import {
  addListEmployeeToLocal,
  findIndexOfEmployee,
  removeEmployee,
} from "./FunctionEmployee";

import EditEmployee from "./Edit";
import { exportPDF, exportToCSV } from "./Export";
import Select from "react-select";
import { iTh, listFilter } from "src/data/interface";
import { prettyMoney } from "src/prototype";
import { ThreeDots } from "react-loader-spinner";

const Employees = () => {
  const [selectEmployees, setSelectEmployees] = useState<iEmployee[]>([]);
  console.log(selectEmployees);
  const [listEmpFromDb, setListEmpFromDb] = useState<iEmployee[]>([]);
  const [renderLazy, setRenderLazy] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [confirmCloseAdd, setConfirmCloseAdd] = useState(false);

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [confirmCloseEdit, setConfirmCloseEdit] = useState(false);

  const [changed, setChanged] = useState(false);

  const [showExport, setShowExport] = useState(false);
  const [colFilterSelected, setColFilterSelected] = useState<string>("");
  const [typeOfFilter, setTypeOfFilter] = useState(listFilter[0]);
  const [findString, setFindString] = useState("");
  const [findStringFakeCallApi, setFindStringFakeCallApi] = useState("");
  const [typing, setTyping] = useState<boolean | undefined>();
  useEffect(() => {
    let fakeCallListTemp = localStorage.getItem("listEmployee");
    if (fakeCallListTemp) {
      var tempListEmpFromLocal = JSON.parse(fakeCallListTemp) as iEmployee[];
      setListEmpFromDb(tempListEmpFromLocal);
    }
  }, []);
  useEffect(() => {
    var fakeCallListTemp = localStorage.getItem("listEmployee");
    if (fakeCallListTemp) {
      var tempListEmpFromLocal = JSON.parse(fakeCallListTemp) as iEmployee[];
      var resultList = tempListEmpFromLocal;
      let typeFilter = typeOfFilter.label;
      //#region Sort logic - can write function to clean code - shorter
      if (colFilterSelected === "Employee Number") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.employeeNumber < e2.employeeNumber
              ? -1
              : e1.employeeNumber > e2.employeeNumber
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.employeeNumber < e2.employeeNumber
              ? 1
              : e1.employeeNumber > e2.employeeNumber
              ? -1
              : 0
          );
        }
        if (findString.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (item.employeeNumber.toString().includes(findStringFakeCallApi))
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "First Name") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empFirstName < e2.empFirstName
              ? -1
              : e1.empFirstName > e2.empFirstName
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empFirstName < e2.empFirstName
              ? 1
              : e1.empFirstName > e2.empFirstName
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.empFirstName
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Last Name") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empLastName < e2.empLastName
              ? -1
              : e1.empLastName > e2.empLastName
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empLastName < e2.empLastName
              ? 1
              : e1.empLastName > e2.empLastName
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.empLastName
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Street Address") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empStreetAddress < e2.empStreetAddress
              ? -1
              : e1.empStreetAddress > e2.empStreetAddress
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empStreetAddress < e2.empStreetAddress
              ? 1
              : e1.empStreetAddress > e2.empStreetAddress
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.empStreetAddress
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "City") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empCity < e2.empCity ? -1 : e1.empCity > e2.empCity ? 1 : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empCity < e2.empCity ? 1 : e1.empCity > e2.empCity ? -1 : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.empCity
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "State") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empState < e2.empState ? -1 : e1.empState > e2.empState ? 1 : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empState < e2.empState ? 1 : e1.empState > e2.empState ? -1 : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.empState
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Zip Code") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empZipCode < e2.empZipCode
              ? -1
              : e1.empZipCode > e2.empZipCode
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empZipCode < e2.empZipCode
              ? 1
              : e1.empZipCode > e2.empZipCode
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.empZipCode
                .toString()
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Phone Number") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empPhoneNumber < e2.empPhoneNumber
              ? -1
              : e1.empPhoneNumber > e2.empPhoneNumber
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empPhoneNumber < e2.empPhoneNumber
              ? 1
              : e1.empPhoneNumber > e2.empPhoneNumber
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.empPhoneNumber
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Position") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empPosition < e2.empPosition
              ? -1
              : e1.empPosition > e2.empPosition
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.empPosition < e2.empPosition
              ? 1
              : e1.empPosition > e2.empPosition
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.empPosition
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Hourly Rate") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.hourlyRate < e2.hourlyRate
              ? -1
              : e1.hourlyRate > e2.hourlyRate
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.hourlyRate < e2.hourlyRate
              ? 1
              : e1.hourlyRate > e2.hourlyRate
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.hourlyRate
                .toString()
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Date Hired") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            new Date(e1.dateHired) < new Date(e2.dateHired)
              ? -1
              : new Date(e1.dateHired) > new Date(e2.dateHired)
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            new Date(e1.dateHired) < new Date(e2.dateHired)
              ? 1
              : new Date(e1.dateHired) > new Date(e2.dateHired)
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iEmployee[] = [];
          resultList.forEach((item) => {
            if (
              item.dateHired
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      }

      //#endregion Sort logic - can write function to clean code - shorter
      setListEmpFromDb(resultList);

      // toast(findStringFakeCallApi);
    } else {
      toast.error("Can't fetch data from server, please contact IT service");
    }
  }, [typeOfFilter, findStringFakeCallApi]); //colFilterSelected
  useEffect(() => {
    setTypeOfFilter(listFilter[0]);
  }, [colFilterSelected]);

  useEffect(() => {
    if (typing === undefined) setTyping(false);
    else setTyping(true);
    const delayDebounceFn = setTimeout(() => {
      // console.log(searchTerm)
      setTyping(false);
      setFindStringFakeCallApi(findString);
      // Send Axios request here
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [findString]);

  return (
    <div className=" ">
      {/*Start: Add New Modal */}
      <Modal
        isOpen={isOpenAdd}
        ariaHideApp={false}
        onRequestClose={() => {
          console.log("click out site?");
          setConfirmCloseAdd(true);
        }}
        style={customStyles}
        contentLabel="Add Modal"
      >
        <AddNewEmployee
          isShow={isOpenAdd}
          setIsShow={setIsOpenAdd}
          setConfirmCloseAdd={setConfirmCloseAdd}
          listEmp={listEmpFromDb}
          setListEmp={setListEmpFromDb}
        />
        <Modal
          isOpen={confirmCloseAdd}
          ariaHideApp={false}
          onRequestClose={() => {
            setConfirmCloseAdd(false);
          }}
          style={customStyles}
          contentLabel="Stop add, Are your sure about that?"
        >
          <h3>Stop add, Are your sure about that?</h3>
          <i className="text-sm">
            If you stopped, you can't restore it after do it.
          </i>
          <div className="flex justify-end items-center mt-4 gap-2">
            <button
              className="px-5 py-2.5 rounded-md border-[1px] "
              onClick={() => {
                setConfirmCloseAdd(false);
              }}
            >
              No
            </button>
            <button
              className="px-5 py-2.5 bg-primary text-white rounded-md"
              onClick={() => {
                setIsOpenAdd(false);
                setConfirmCloseAdd(false);
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
      </Modal>
      {/*End: Add New Modal */}

      {/*Start: Delete Modal */}
      <Modal
        isOpen={isOpenDelete}
        ariaHideApp={false}
        onRequestClose={() => {
          setIsOpenDelete(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Want to delete?</h2>
        <p>If you delete this selected, you can't restore it after deleting </p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-5 py-2.5 rounded-md border-[1px] "
            onClick={() => {
              setIsOpenDelete(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-primary text-white rounded-md"
            onClick={() => {
              //delete
              let tempListEmp: iEmployee[] = listEmpFromDb;
              if (selectEmployees.length <= 0) {
                toast.error("Error Check again");
              } else {
                selectEmployees.forEach((curSelect) => {
                  removeEmployee(tempListEmp, curSelect);
                });
                addListEmployeeToLocal(tempListEmp);
                setSelectEmployees([]);
                setRenderLazy(!renderLazy);
              }
              toast.success("Delete success! ");
              setIsOpenDelete(false);
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
      {/*End: Delete Modal*/}

      {/*Start: Edit Employee Modal */}
      <Modal
        isOpen={isOpenEdit}
        ariaHideApp={false}
        onRequestClose={() => {
          setConfirmCloseEdit(true);
        }}
        style={customStyles}
        contentLabel="Add Modal"
      >
        <EditEmployee
          isShow={isOpenEdit}
          setIsShow={setIsOpenEdit}
          setConfirmCloseEdit={setConfirmCloseEdit}
          employee={selectEmployees[0]}
          listEmp={listEmpFromDb}
          setListEmp={setListEmpFromDb}
          setListSelect={setSelectEmployees}
          changed={changed}
          setChanged={setChanged}
        />
        <Modal
          isOpen={confirmCloseEdit}
          ariaHideApp={false}
          onRequestClose={() => {
            setConfirmCloseEdit(false);
          }}
          style={customStyles}
          contentLabel="Stop add, Are your sure about that?"
        >
          <h3>Stop add, Are your sure about that?</h3>
          <i className="text-sm">
            If you stopped, you can't restore it after do it.
          </i>
          <div className="flex justify-end items-center mt-4 gap-2">
            <button
              className="px-5 py-2.5 rounded-md border-[1px] "
              onClick={() => {
                setConfirmCloseEdit(false);
              }}
            >
              No
            </button>
            <button
              className="px-5 py-2.5 bg-primary text-white rounded-md"
              onClick={() => {
                setIsOpenEdit(false);
                setConfirmCloseEdit(false);
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
      </Modal>
      {/*End: Edit Employee Modal */}

      {/*Start: Export Modal */}
      <Modal
        isOpen={showExport}
        ariaHideApp={false}
        onRequestClose={() => {
          setShowExport(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>
          Want to export{" "}
          {selectEmployees.length <= 0 ? "all" : selectEmployees.length}?
        </h2>
        <p>
          If you click export, File will download after a few second! Please
          <b> choose</b> the type of file...{" "}
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-5 py-2.5 rounded-md border-[1px] "
            onClick={() => {
              setShowExport(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-success text-white rounded-md"
            onClick={(e) => {
              //delete
              var tempListEmp: iEmployee[] = listEmpFromDb;
              if (selectEmployees.length > 0) tempListEmp = selectEmployees;
              exportToCSV(tempListEmp, "ListEmployee");
              setShowExport(false);
            }}
          >
            Excel
          </button>
          <button
            className="px-5 py-2.5 bg-error text-white rounded-md"
            onClick={(e) => {
              var tempListEmp: iEmployee[] = listEmpFromDb;
              if (selectEmployees.length > 0) tempListEmp = selectEmployees;
              exportPDF(tempListEmp, "List Employee");
              setShowExport(false);
            }}
          >
            PDF
          </button>
        </div>
      </Modal>
      {/*End: Export Modal*/}

      {/*Start: Content Employees List */}
      <div className="flex  items-center w-auto">
        <h1 className="text-center my-4">Employees List</h1>
        <div className="flex flex-1 items-center gap-2 ml-4  relative">
          {/* Start: Filer */}
          <i className={" absolute translate-x-1/3   -translate-y-1/2 top-1/2"}>
            {typing ? (
              <ThreeDots height={24} width={24} color={"#000"} />
            ) : (
              <Magnifying />
            )}
          </i>
          <input
            className=" w-full  pl-9 outline-none focus:border-[1px] focus:border-black  text-black disabled:bg-[#e5e7eb] disabled:opacity-50"
            disabled={colFilterSelected.length === 0}
            onChange={(e) => {
              setFindString(e.target.value);
            }}
          ></input>
          <Select
            options={listFilter}
            value={typeOfFilter}
            isDisabled={colFilterSelected.length === 0}
            className={"w-40 mr-4"}
            onChange={(e) => {
              if (e !== undefined && e !== null) setTypeOfFilter(e);
              else toast.error("Filter error, check again");
            }}
          />
          {/* End: Filter */}
        </div>
        <div className="flex items-center justify-between my-4 "></div>
        {/* Start: List action */}
        <div className="flex gap-4 justify-end pr-4">
          <button
            className={"text-blue-600 disabled:text-muted"}
            data-tip="Select All"
            data-for="selectAll"
            disabled={selectEmployees.length === listEmpFromDb.length}
            onClick={() => {
              setSelectEmployees([...listEmpFromDb]);
              setColFilterSelected("");
            }}
          >
            <PickAll />
            <ReactTooltip id="selectAll" place="top" effect="solid" />
          </button>
          <button
            className={"text-success disabled:text-muted"}
            data-tip="Un Select All"
            data-for="unSelectAll"
            disabled={selectEmployees.length <= 0}
            onClick={() => {
              setSelectEmployees([]);
            }}
          >
            <UnPickAll />
            <ReactTooltip id="unSelectAll" place="top" effect="solid" />
          </button>
          <span>|</span>
          <button
            className={"text-success disabled:text-muted"}
            data-tip="Add new"
            data-for="addNewEmployee"
            disabled={selectEmployees.length > 0}
            onClick={() => setIsOpenAdd(true)}
          >
            <Plus />
            <ReactTooltip id="addNewEmployee" place="top" effect="solid" />
          </button>
          <button
            className="text-warning disabled:text-muted"
            data-tip="Edit"
            data-for="editEmployee"
            disabled={selectEmployees.length !== 1}
            onClick={() => setIsOpenEdit(true)}
          >
            <Wrench />
            <ReactTooltip id="editEmployee" place="top" effect="solid" />
          </button>
          <button
            className="text-error disabled:text-muted"
            data-tip="Delete"
            data-for="deleteEmployee"
            disabled={selectEmployees.length <= 0}
            onClick={() => {
              setIsOpenDelete(true);
            }}
          >
            <Trash />
            <ReactTooltip id="deleteEmployee" place="top" effect="solid" />
          </button>
          <button
            className="text-indigo-800 disabled:text-muted"
            data-tip={selectEmployees.length === 0 ? "Export all" : "Export"}
            data-for="exportEmployee"
            disabled={listEmpFromDb.length <= 0}
            onClick={() => setShowExport(true)}
          >
            <DocumentArrowDown />
            <ReactTooltip id="exportEmployee" place="top" effect="solid" />
          </button>
        </div>
        {/* End: List action */}
      </div>
      <div className="relative overflow-x-scroll overflow-y-scroll h-[calc(100vh-82px)] pb-8 ">
        <table
          className={
            "  w-full text-sm text-left" +
            (!listEmpFromDb || listEmpFromDb.length <= 0 ? " grid " : " ")
          }
        >
          <thead>
            <tr className="bg-gray-300">
              {listTh.map((i) => (
                <th
                  key={i.title}
                  scope="col"
                  className={
                    "px-6 py-3 hover:cursor-pointer  duration-200 " +
                    (i.title === colFilterSelected
                      ? " bg-primaryLow "
                      : " hover:bg-gray-400 ")
                  }
                  onClick={() => {
                    if (i.title === colFilterSelected) {
                      setColFilterSelected("");
                    } else {
                      setColFilterSelected(i.title);
                      setSelectEmployees([]);
                    }
                  }}
                >
                  {i.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {!listEmpFromDb ||
            listEmpFromDb === null ||
            listEmpFromDb.length <= 0 ? (
              <tr className="flex justify-center ">
                <td className="col-span-full">
                  <p className="text-center  w-full p-4 ">
                    Have no employee to show!
                  </p>
                </td>
              </tr>
            ) : (
              listEmpFromDb.map((item) => (
                <tr
                  key={item.employeeNumber}
                  onClick={() => {
                    var tempListEmp: iEmployee[] = selectEmployees;
                    console.log("selectEmployees", selectEmployees.length);
                    let index = findIndexOfEmployee(tempListEmp, item);
                    if (index === -1) {
                      tempListEmp.push(item);
                    } else {
                      tempListEmp.splice(index, 1);
                    }
                    setSelectEmployees(tempListEmp);
                    console.log("listEmpFromDb", listEmpFromDb);
                    setColFilterSelected("");
                    setRenderLazy(!renderLazy);
                  }}
                  className={
                    "hover:cursor-pointer border-b " +
                    (findIndexOfEmployee(selectEmployees, item) !== -1
                      ? " bg-primaryHover "
                      : " null ")
                  }
                >
                  <td
                    className={
                      "px-3.5 py-2  text-center " +
                      (colFilterSelected === "Employee Number"
                        ? " bg-primaryHover "
                        : null)
                    }
                  >
                    {findIndexOfEmployee(selectEmployees, item) !== -1 ? (
                      <span className="w-full flex justify-center text-success ">
                        <Check />
                      </span>
                    ) : (
                      item.employeeNumber
                    )}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "First Name"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.empFirstName}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Last Name"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.empLastName}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Street Address"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.empStreetAddress}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "City" ? " bg-primaryHover" : null)
                    }
                  >
                    {item.empCity}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "State"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.empState}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Zip Code"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.empZipCode}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Phone Number"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.empPhoneNumber}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Position"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.empPosition}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Hourly Rate"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {prettyMoney(item.hourlyRate.toString()) + " đ"}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Date Hired"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.dateHired}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/*End: Content Employees List */}
    </div>
  );
};

export default Employees;

const listTh: iTh[] = [
  { title: "Employee Number", value: "id" },
  { title: "First Name", value: "firstName" },
  { title: "Last Name", value: "lastName" },
  { title: "Street Address", value: "streetAddress" },
  { title: "City", value: "city" },
  { title: "State", value: "state" },
  { title: "Zip Code", value: "zipCode" },
  { title: "Phone Number", value: "phoneNumber" },
  { title: "Position", value: "position" },
  { title: "Hourly Rate", value: "hourlyRate" },
  { title: "Date Hired", value: "dateHired" },
];
