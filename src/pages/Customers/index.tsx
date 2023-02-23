import { useEffect, useState } from "react";
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
import { iCustomer } from "src/DTO/Customers";
import { ThreeDots } from "react-loader-spinner";
import { iTh, listFilter } from "src/data/interface";
import Select from "react-select";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import {
  addListCustomerToLocal,
  findIndexOfCustomer,
  removeCustomer,
} from "./FunctionCustomer";
import Modal from "react-modal";
import { customStyles } from "src/assets/customModal";
import AddNewCus from "./AddNew";
import EditCustomer from "./Edit";

const Customers = () => {
  const [selectCustomer, setSelectCustomer] = useState<iCustomer[]>([]);
  const [listCusFromDb, setListCusFromDb] = useState<iCustomer[]>([]);

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
    let fakeCallListTemp = localStorage.getItem("listCustomer");
    if (fakeCallListTemp) {
      var tempListEmpFromLocal = JSON.parse(fakeCallListTemp) as iCustomer[];
      setListCusFromDb(tempListEmpFromLocal);
    }
  }, []);

  useEffect(() => {
    var fakeCallListTemp = localStorage.getItem("listCustomer");
    if (fakeCallListTemp) {
      var tempListEmpFromLocal = JSON.parse(fakeCallListTemp) as iCustomer[];
      var resultList = tempListEmpFromLocal;
      let typeFilter = typeOfFilter.label;
      //#region Sort logic - can write function to clean code - shorter
      if (colFilterSelected === "ID") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.customerId < e2.customerId
              ? -1
              : e1.customerId > e2.customerId
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.customerId < e2.customerId
              ? 1
              : e1.customerId > e2.customerId
              ? -1
              : 0
          );
        }
        if (findString.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (item.customerId.toString().includes(findStringFakeCallApi))
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "First Name") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custFirstName < e2.custFirstName
              ? -1
              : e1.custFirstName > e2.custFirstName
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custFirstName < e2.custFirstName
              ? 1
              : e1.custFirstName > e2.custFirstName
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (
              item.custFirstName
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
            e1.custLastName < e2.custLastName
              ? -1
              : e1.custLastName > e2.custLastName
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custLastName < e2.custLastName
              ? 1
              : e1.custLastName > e2.custLastName
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (
              item.custLastName
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
            e1.custStreetAddress < e2.custStreetAddress
              ? -1
              : e1.custStreetAddress > e2.custStreetAddress
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custStreetAddress < e2.custStreetAddress
              ? 1
              : e1.custStreetAddress > e2.custStreetAddress
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (
              item.custStreetAddress
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
            e1.custCity < e2.custCity ? -1 : e1.custCity > e2.custCity ? 1 : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custCity < e2.custCity ? 1 : e1.custCity > e2.custCity ? -1 : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (
              item.custCity
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
            e1.custState < e2.custState
              ? -1
              : e1.custState > e2.custState
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custState < e2.custState
              ? 1
              : e1.custState > e2.custState
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (
              item.custState
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
            e1.custZipCode < e2.custZipCode
              ? -1
              : e1.custZipCode > e2.custZipCode
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custZipCode < e2.custZipCode
              ? 1
              : e1.custZipCode > e2.custZipCode
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (
              item.custZipCode
                .toString()
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Phone") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custPhone < e2.custPhone
              ? -1
              : e1.custPhone > e2.custPhone
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custPhone < e2.custPhone
              ? 1
              : e1.custPhone > e2.custPhone
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (
              item.custPhone
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      } else if (colFilterSelected === "Email") {
        if (typeFilter === "Increase") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custEmailAddress < e2.custEmailAddress
              ? -1
              : e1.custEmailAddress > e2.custEmailAddress
              ? 1
              : 0
          );
        } else if (typeFilter === "Decrease") {
          resultList = tempListEmpFromLocal.sort((e1, e2) =>
            e1.custEmailAddress < e2.custEmailAddress
              ? 1
              : e1.custEmailAddress > e2.custEmailAddress
              ? -1
              : 0
          );
        }
        if (findStringFakeCallApi.length > 0) {
          let temp: iCustomer[] = [];
          resultList.forEach((item) => {
            if (
              item.custEmailAddress
                .toLowerCase()
                .includes(findStringFakeCallApi.toLowerCase())
            )
              temp.push(item);
          });
          resultList = temp;
        }
      }

      //#endregion Sort logic - can write function to clean code - shorter
      setListCusFromDb(resultList);

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
    const delayToTyping = setTimeout(() => {
      // console.log(searchTerm)
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
          console.log("click out site?");
          setConfirmCloseAdd(true);
        }}
        style={customStyles}
        contentLabel="Add Modal"
      >
        <AddNewCus
          isShow={isShowAdd}
          setIsShow={setShowAdd}
          setConfirmCloseAdd={setConfirmCloseAdd}
          listCus={listCusFromDb}
          setListCus={setListCusFromDb}
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
              let tempListCus: iCustomer[] = listCusFromDb;
              if (selectCustomer.length <= 0) {
                toast.error("Error Check again");
              } else {
                selectCustomer.forEach((curSelect) => {
                  // console.log(curSelect);
                  removeCustomer(tempListCus, curSelect);
                });
                addListCustomerToLocal(tempListCus);
                setSelectCustomer([]);
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
        <EditCustomer
          isShow={isShowEdit}
          setIsShow={setShowEdit}
          setConfirmCloseEdit={setConfirmCloseEdit}
          customer={selectCustomer[0]}
          listCus={listCusFromDb}
          setListCus={setListCusFromDb}
          setListSelect={setSelectCustomer}
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
        <h1 className="text-center my-4">Customer List</h1>
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
            disabled={selectCustomer.length === listCusFromDb.length}
            onClick={() => {
              setSelectCustomer([...listCusFromDb]);
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
            disabled={selectCustomer.length <= 0}
            onClick={() => {
              setSelectCustomer([]);
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
            disabled={selectCustomer.length > 0}
            onClick={() => setShowAdd(true)}
          >
            <Plus />
            <ReactTooltip id="addNewEmployee" place="top" effect="solid" />
          </button>
          <button
            className="text-warning disabled:text-muted"
            data-tip="Edit"
            data-for="editEmployee"
            disabled={selectCustomer.length !== 1}
            onClick={() => setShowEdit(true)}
          >
            <Wrench />
            <ReactTooltip id="editEmployee" place="top" effect="solid" />
          </button>
          <button
            className="text-error disabled:text-muted"
            data-tip="Delete"
            data-for="deleteEmployee"
            disabled={selectCustomer.length <= 0}
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
      <div className="relative overflow-x-scroll overflow-y-scroll h-[calc(100vh-82px)] pb-8 ">
        <table
          className={
            "  w-full text-sm text-left table-auto  " +
            (!listCusFromDb || listCusFromDb.length <= 0 ? " relative " : " ")
          }
        >
          <thead>
            <tr className="bg-gray-300">
              {listThCust.map((i) => (
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
                      setSelectCustomer([]);
                    }
                  }}
                >
                  {i.title}
                </th>
              ))}
            </tr>
          </thead>

          {!listCusFromDb ||
          listCusFromDb === null ||
          listCusFromDb.length <= 0 ? (
            <tbody className=" absolute w-full py-10 bg-gray-200">
              <tr>
                <td className="text-center w-full absolute pb-5 text-base">
                  Have no customer to show
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-gray-100">
              {listCusFromDb.map((item) => (
                <tr
                  key={item.customerId}
                  onClick={() => {
                    var tempListCus: iCustomer[] = selectCustomer;
                    let index = findIndexOfCustomer(tempListCus, item);
                    if (index === -1) {
                      tempListCus.push(item);
                    } else {
                      tempListCus.splice(index, 1);
                    }
                    setSelectCustomer([...tempListCus]);
                    console.log("listCusFromDb", listCusFromDb);
                    setColFilterSelected("");
                  }}
                  className={
                    "hover:cursor-pointer border-b " +
                    (findIndexOfCustomer(selectCustomer, item) !== -1
                      ? " bg-primaryHover "
                      : " null ")
                  }
                >
                  <td
                    className={
                      "px-3.5 py-2  text-center " +
                      (colFilterSelected === "ID" ? " bg-primaryHover " : null)
                    }
                  >
                    {findIndexOfCustomer(selectCustomer, item) !== -1 ? (
                      <span className="w-full flex justify-center text-success ">
                        <Check />
                      </span>
                    ) : (
                      item.customerId
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
                    {item.custFirstName}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Last Name"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.custLastName}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Street Address"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.custStreetAddress}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "City" ? " bg-primaryHover" : null)
                    }
                  >
                    {item.custCity}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "State"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.custStreetAddress}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Zip Code"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.custZipCode}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Phone"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.custPhone}
                  </td>
                  <td
                    className={
                      "px-3.5 py-2 " +
                      (colFilterSelected === "Email"
                        ? " bg-primaryHover"
                        : null)
                    }
                  >
                    {item.custEmailAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Customers;
const listThCust: iTh[] = [
  { title: "ID", value: "id" },
  { title: "First Name", value: "firstName" },
  { title: "Last Name", value: "lastName" },
  { title: "Street Address", value: "streetAddress" },
  { title: "City", value: "city" },
  { title: "State", value: "state" },
  { title: "Zip Code", value: "zipCode" },
  { title: "Phone", value: "phoneNumber" },
  { title: "Email", value: "email" },
];
