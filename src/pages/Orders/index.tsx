import { useEffect, useState } from "react";
// import { listEmployees } from "src/data/customers";
import {
  Check,
  Magnifying,
  PickAll,
  Plus,
  Trash,
  UnPickAll,
  Wrench,
} from "src/icons";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { customStyles } from "src/assets/customModal";
import { toast } from "react-toastify";

import Select from "react-select";
import { iTh, listFilter } from "src/data/interface";
import { ThreeDots } from "react-loader-spinner";
import { iOrders } from "src/DTO/Orders";
import {
  addListOrderToLocal,
  findIndexOfOrder,
  removeOrder,
} from "./FunctionOrder";
import AddNewOrder from "./AddNew";
import EditOrder from "./Edit";

const Orders = () => {
  const [selectOrder, setSelectOrder] = useState<iOrders[]>([]);
  const [listOrderFromDb, setListOrderFromDb] = useState<iOrders[]>([]);
  const [renderLazy, setRenderLazy] = useState(false);

  const [isShowDelete, setShowDelete] = useState(false);
  const [isShowAdd, setShowAdd] = useState(false);
  const [confirmCloseAdd, setConfirmCloseAdd] = useState(false);

  const [isShowEdit, setShowEdit] = useState(false);
  const [confirmCloseEdit, setConfirmCloseEdit] = useState(false);

  const [changed, setChanged] = useState(false);

  const [colFilterSelected, setColFilterSelected] = useState<string>("");
  const [typeOfFilter, setTypeOfFilter] = useState(listFilter[0]);
  const [findString, setFindString] = useState("");
  const [findStringFakeCallApi, setFindStringFakeCallApi] = useState("");
  const [typing, setTyping] = useState<boolean | undefined>();

  useEffect(() => {
    let fakeCallListOrder = localStorage.getItem("listOrder");

    if (fakeCallListOrder) {
      var tempListOrderFromLocal = JSON.parse(fakeCallListOrder) as iOrders[];
      setListOrderFromDb(tempListOrderFromLocal);
    }
  }, []);

  useEffect(() => {
    var fakeCallListTemp = localStorage.getItem("listOrder");
    if (fakeCallListTemp) {
      var tempListOrderFromLocal = JSON.parse(fakeCallListTemp) as iOrders[];
      var resultList = tempListOrderFromLocal;
      let typeFilter = typeOfFilter.label;
      //#region Sort logic - can write function to clean code - shorter
      if (colFilterSelected === "Customer Id") {
        if (typeFilter === "Increase") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            o1.customerId < o2.customerId
              ? -1
              : o1.customerId > o2.customerId
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            o1.customerId < o2.customerId
              ? 1
              : o1.customerId > o2.customerId
              ? -1
              : 0
          );
        }
        if (findString.length > 0) {
          let temp: iOrders[] = [];
          resultList.forEach((item) => {
            if (item.customerId.toString().includes(findStringFakeCallApi))
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Order Number") {
        if (typeFilter === "Increase") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            o1.orderNumber < o2.orderNumber
              ? -1
              : o1.orderNumber > o2.orderNumber
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            o1.orderNumber < o2.orderNumber
              ? 1
              : o1.orderNumber > o2.orderNumber
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iOrders[] = [];
          resultList.forEach((item) => {
            if (
              item.orderNumber
                .toString()
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Order Date") {
        if (typeFilter === "Increase") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            new Date(o1.orderDate) < new Date(o2.orderDate)
              ? -1
              : new Date(o1.orderDate) > new Date(o2.orderDate)
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            new Date(o1.orderDate) < new Date(o2.orderDate)
              ? 1
              : new Date(o1.orderDate) > new Date(o2.orderDate)
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iOrders[] = [];
          resultList.forEach((item) => {
            if (
              item.orderDate
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Ship Date") {
        if (typeFilter === "Increase") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            new Date(o1.shipDate) < new Date(o2.shipDate)
              ? -1
              : new Date(o1.shipDate) > new Date(o2.shipDate)
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            new Date(o1.shipDate) < new Date(o2.shipDate)
              ? 1
              : new Date(o1.shipDate) > new Date(o2.shipDate)
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iOrders[] = [];
          resultList.forEach((item) => {
            if (
              item.shipDate
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Employee Number") {
        if (typeFilter === "Increase") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            o1.employeeNumber < o2.employeeNumber
              ? -1
              : o1.employeeNumber > o2.employeeNumber
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListOrderFromLocal.sort((o1, o2) =>
            o1.employeeNumber < o2.employeeNumber
              ? 1
              : o1.employeeNumber > o2.employeeNumber
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iOrders[] = [];
          resultList.forEach((item) => {
            if (
              item.employeeNumber
                .toString()
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      }

      //#endregion Sort logic - can write function to clean code - shorter
      setListOrderFromDb(resultList);

      // toast(findStringFakeCallApi);
    } else {
      // toast.error("Can't fetch data from server, please contact IT service");
    }
  }, [typeOfFilter, findStringFakeCallApi]); //colFilterSelected

  useEffect(() => {
    setTypeOfFilter(listFilter[0]);
  }, [colFilterSelected]);

  useEffect(() => {
    if (typing === undefined) setTyping(false);
    else setTyping(true);
    const delayToTyping = setTimeout(() => {
      setTyping(false);
      setFindStringFakeCallApi(findString);
      // Send Axios request here
    }, 1500);

    return () => clearTimeout(delayToTyping);
  }, [findString]);

  return (
    <div>
      {/*Start: Add New Modal */}
      <Modal
        isOpen={isShowAdd}
        ariaHideApp={false}
        onRequestClose={() => {
          setConfirmCloseAdd(true);
        }}
        style={customStyles}
        contentLabel="Add Modal"
      >
        <AddNewOrder
          isShow={isShowAdd}
          setIsShow={setShowAdd}
          setConfirmCloseAdd={setConfirmCloseAdd}
          listOrder={listOrderFromDb}
          setListOrder={setListOrderFromDb}
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
                setShowAdd(false);
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
        isOpen={isShowDelete}
        ariaHideApp={false}
        onRequestClose={() => {
          setShowDelete(false);
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
              setShowDelete(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-primary text-white rounded-md"
            onClick={() => {
              //delete
              let tempListOrder: iOrders[] = listOrderFromDb;
              if (selectOrder.length <= 0) {
                toast.error("Error Check again");
              } else {
                selectOrder.forEach((curSelect) => {
                  removeOrder(tempListOrder, curSelect);
                });
                addListOrderToLocal(tempListOrder);
                setSelectOrder([]);
              }
              toast.success("Delete success!");
              setShowDelete(false);
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
      {/*End: Delete Modal*/}

      {/*Start: Edit Modal  */}
      <Modal
        isOpen={isShowEdit}
        ariaHideApp={false}
        onRequestClose={() => {
          setConfirmCloseEdit(true);
        }}
        style={customStyles}
        contentLabel="Add Modal"
      >
        <EditOrder
          isShow={isShowEdit}
          setIsShow={setShowEdit}
          setConfirmCloseEdit={setConfirmCloseEdit}
          order={selectOrder[0]}
          listOrder={listOrderFromDb}
          setListOrder={setListOrderFromDb}
          setListSelect={setSelectOrder}
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
                setShowEdit(false);
                setConfirmCloseEdit(false);
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
      </Modal>
      {/*End: Edit Modal */}

      <div className="flex  items-center w-auto">
        <h1 className="text-center my-4">Order List</h1>
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
            disabled={selectOrder.length === listOrderFromDb.length}
            onClick={() => {
              setSelectOrder([...listOrderFromDb]);
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
            disabled={selectOrder.length <= 0}
            onClick={() => {
              setSelectOrder([]);
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
            disabled={selectOrder.length > 0}
            onClick={() => setShowAdd(true)}
          >
            <Plus />
            <ReactTooltip id="addNewEmployee" place="top" effect="solid" />
          </button>
          <button
            className="text-warning disabled:text-muted"
            data-tip="Edit"
            data-for="editEmployee"
            disabled={selectOrder.length !== 1}
            onClick={() => setShowEdit(true)}
          >
            <Wrench />
            <ReactTooltip id="editEmployee" place="top" effect="solid" />
          </button>
          <button
            className="text-error disabled:text-muted"
            data-tip="Delete"
            data-for="deleteEmployee"
            disabled={selectOrder.length <= 0}
            onClick={() => {
              setShowDelete(true);
            }}
          >
            <Trash />
            <ReactTooltip id="deleteEmployee" place="top" effect="solid" />
          </button>
        </div>
        {/* End: List action */}
      </div>
      <div className="relative overflow-x-scroll table-auto overflow-y-scroll h-[calc(100vh-82px)] pb-8 ">
        <table
          className={
            "  w-full text-sm text-left" +
            (!listOrderFromDb || listOrderFromDb.length <= 0 ? "  " : " ")
          }
        >
          <thead>
            <tr className="bg-gray-300 text-center">
              {listTh.map((i) => (
                <th
                  key={i.value}
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
                      setSelectOrder([]);
                    }
                  }}
                >
                  {i.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-100 relative">
            {!listOrderFromDb ||
            listOrderFromDb === null ||
            listOrderFromDb.length <= 0 ? (
              <tr className="flex justify-center w-full text-center absolute ">
                <td className="col-span-full py-8">Have no order to show!</td>
              </tr>
            ) : (
              listOrderFromDb.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    var tempListOrder: iOrders[] = selectOrder;

                    let index = findIndexOfOrder(tempListOrder, item);
                    if (index === -1) {
                      tempListOrder.push(item);
                    } else {
                      tempListOrder.splice(index, 1);
                    }
                    setSelectOrder(tempListOrder);

                    setColFilterSelected("");
                    setRenderLazy(!renderLazy);
                  }}
                  className={
                    "hover:cursor-pointer border-b text-center  " +
                    (findIndexOfOrder(selectOrder, item) !== -1
                      ? " bg-primaryHover "
                      : " null ")
                  }
                >
                  <td
                    className={
                      "px-3.5 py-2  text-center " +
                      (colFilterSelected === "Order Number"
                        ? " bg-primaryHover "
                        : null)
                    }
                  >
                    {findIndexOfOrder(selectOrder, item) !== -1 ? (
                      <span className="w-full flex justify-center text-success ">
                        <Check />
                      </span>
                    ) : (
                      item.orderNumber
                    )}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2  " +
                      (colFilterSelected === "Customer Id"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.customerId}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Order Date"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.orderDate}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2  " +
                      (colFilterSelected === "Ship Date"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.shipDate}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2  " +
                      (colFilterSelected === "Employee Number"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.employeeNumber}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

const listTh: iTh[] = [
  { title: "Order Number", value: "id" },
  { title: "Customer Id", value: "cusId" },
  { title: "Order Date", value: "orderDate" },
  { title: "Ship Date", value: "shipDate" },
  { title: "Employee Number", value: "empId" },
];
