import React, { useEffect, useState } from "react";
// import { listEmployees } from "src/data/customers";
import { Check, DocumentArrowDown, Plus, Trash, Wrench } from "src/icons";
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

const Employees = () => {
  useEffect(() => {
    let fakeCallListTemp = localStorage.getItem("listEmployee");
    if (fakeCallListTemp) {
      var tempListEmpFromLocal = JSON.parse(fakeCallListTemp) as iEmployee[];
      setListEmpFromDb(tempListEmpFromLocal);
    }
  }, []);
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

  return (
    <div className="w-auto">
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
                selectEmployees.map((curSelect) =>
                  removeEmployee(tempListEmp, curSelect)
                );
                addListEmployeeToLocal(tempListEmp);
                setSelectEmployees([]);
                setRenderLazy(!renderLazy);
              }
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

      {/*Start: Content Employees List */}
      <div className="flex  items-center">
        <h1 className="flex-1 text-center">Employees List</h1>
        {/* Start: List action */}
        <div className="flex gap-4 justify-end pr-4">
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
          >
            <DocumentArrowDown />
            <ReactTooltip id="exportEmployee" place="top" effect="solid" />
          </button>
        </div>
        {/* End: List action */}
      </div>
      <table
        className={
          "  w-full border-collapse border-spacing-1 border border-slate-500" +
          (!listEmpFromDb || listEmpFromDb.length <= 0 ? " grid " : " ")
        }
      >
        <thead>
          <tr>
            <th className="border border-slate-600 p-1">Employee Number</th>
            <th className="border border-slate-600  p-1">EmpFirst Name</th>
            <th className="border border-slate-600 p-1">EmpLast Name</th>
            <th className="border border-slate-600 p-1">EmpStreet Address</th>
            <th className="border border-slate-600 p-1">EmpCity</th>
            <th className="border border-slate-600 p-1">EmpState</th>
            <th className="border border-slate-600 p-1">EmpZipCode</th>
            <th className="border border-slate-600 p-1">EmpPhone Number</th>
            <th className="border border-slate-600 p-1">Position</th>
            <th className="border border-slate-600 p-1">Hourly Rate</th>
            <th className="border border-slate-600 p-1">Date Hired</th>
          </tr>
        </thead>
        <tbody className="">
          {!listEmpFromDb ||
          listEmpFromDb === null ||
          listEmpFromDb.length <= 0 ? (
            <tr className="flex justify-center">
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
                  let tempListEmp: iEmployee[] = selectEmployees;
                  let index = findIndexOfEmployee(selectEmployees, item);
                  if (index === -1) {
                    tempListEmp.push(item);
                  } else {
                    tempListEmp.splice(index, 1);
                  }
                  setSelectEmployees(tempListEmp);
                  setRenderLazy(!renderLazy);
                  console.log(selectEmployees);
                }}
                className={
                  "hover:cursor-pointer " +
                  (findIndexOfEmployee(selectEmployees, item) !== -1
                    ? " bg-gray-200 "
                    : " null")
                }
              >
                <td className="border border-slate-600 p-1 text-center ">
                  {findIndexOfEmployee(selectEmployees, item) !== -1 ? (
                    <span className="w-full flex justify-center text-success ">
                      <Check />
                    </span>
                  ) : (
                    item.employeeNumber
                  )}
                </td>
                <td className="border border-slate-600 p-1">
                  {item.empFirstName}
                </td>
                <td className="border border-slate-600 p-1">
                  {item.empLastName}
                </td>
                <td className="border border-slate-600 p-1">
                  {item.empStreetAddress}
                </td>
                <td className="border border-slate-600 p-1">{item.empCity}</td>
                <td className="border border-slate-600 p-1">{item.empState}</td>
                <td className="border border-slate-600 p-1">
                  {item.empZipCode}
                </td>
                <td className="border border-slate-600 p-1">
                  {item.empPhoneNumber}
                </td>
                <td className="border border-slate-600 p-1">
                  {item.empPosition}
                </td>
                <td className="border border-slate-600 p-1">
                  {item.hourlyRate}
                </td>
                <td className="border border-slate-600 p-1">
                  {item.dateHired}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/*End: Content Employees List */}
    </div>
  );
};

export default Employees;
