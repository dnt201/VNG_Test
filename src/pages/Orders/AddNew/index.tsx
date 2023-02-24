import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { customStyles } from "src/assets/customModal";
import { iOrders } from "src/DTO/Orders";
import { iEmployee } from "src/DTO/Employee";
import { iCustomer } from "src/DTO/Customers";
import { addListOrderToLocal } from "../FunctionOrder";

interface iAddNewOrder extends React.HTMLProps<HTMLDivElement> {
  isShow: boolean;
  setIsShow: (b: boolean) => void;
  setConfirmCloseAdd: (b: boolean) => void;
  listOrder: iOrders[];
  setListOrder: (list: iOrders[]) => void;
}
const AddNewOrder: React.FC<iAddNewOrder> = (props) => {
  const { setConfirmCloseAdd, setIsShow, listOrder, setListOrder } = props;
  const _idOrder =
    listOrder.length > 0 ? listOrder[listOrder.length - 1].orderNumber + 1 : 0;

  const [_customerId, _setCustomerId] = useState<number | undefined>();
  const [_orderDate, _setOrderDate] = useState(new Date());
  const [_shipDate, _setShipDate] = useState(new Date());
  const [_employeeNumber, _setEmployeeNumber] = useState<number | undefined>();

  const [listEmployee, setListEmployee] = useState<iEmployee[]>([]);
  const [listCustomer, setListCustomer] = useState<iCustomer[]>([]);

  useEffect(() => {
    let fakeCallListEmp = localStorage.getItem("listEmployee");
    let fakeCallListCus = localStorage.getItem("listCustomer");
    if (fakeCallListEmp && fakeCallListCus) {
      var tempListEmpFromLocal = JSON.parse(fakeCallListEmp) as iEmployee[];
      var tempListCusFromLocal = JSON.parse(fakeCallListCus) as iCustomer[];
      setListEmployee([...tempListEmpFromLocal]);
      setListCustomer([...tempListCusFromLocal]);
      if (tempListEmpFromLocal[0]) {
        _setEmployeeNumber(tempListEmpFromLocal[0].employeeNumber);
      } else _setEmployeeNumber(undefined);
      if (tempListCusFromLocal[0]) {
        _setCustomerId(tempListCusFromLocal[0].customerId);
      } else _setCustomerId(undefined);
    }
  }, []);

  const addNewOrder = () => {
    //#region Check logic
    if (_customerId === undefined) {
      toast.error("Customer Id is required");
      document.getElementById("floating_customerID")?.focus();
    } else if (_employeeNumber === undefined) {
      toast.error("Employee Id is required");
      document.getElementById("floating_employeeNumber")?.focus();
    }
    //#endregion Check logic
    else {
      let order: iOrders = {
        orderNumber: _idOrder,
        customerId: _customerId,
        orderDate: _orderDate.toDateString(),
        shipDate: _shipDate.toDateString(),
        employeeNumber: _employeeNumber,
      };
      let tempList: iOrders[] = listOrder;
      tempList.push(order);
      addListOrderToLocal(tempList);
      // localStorage.setItem("listEmployee", JSON.stringify(tempList));
      setIsShow(false);
      setListOrder(tempList);
      toast.success("Add new order success");
    }
  };

  const [_showAddConfirm, _setShowAddConfirm] = useState(false);

  return (
    <div className="bg-transparent  px-4 pb-2 w-[80vw] h-[80vh]">
      <h2 className="text-center pb-2">Add New Order - ID: {_idOrder}</h2>
      <Modal
        isOpen={_showAddConfirm}
        ariaHideApp={false}
        onRequestClose={() => {
          ("click out site?");
          _setShowAddConfirm(true);
        }}
        style={customStyles}
        contentLabel="Add Modal"
      >
        <h3>Add new order!</h3>
        <i className="text-sm">
          Do u have any change? Confirm your decision...
        </i>
        <div className="flex justify-end items-center mt-4 gap-2">
          <button
            className="px-5 py-2.5 rounded-md border-[1px] "
            onClick={() => {
              _setShowAddConfirm(false);
            }}
          >
            Edit
          </button>
          <button
            className="px-5 py-2.5 bg-primary text-white rounded-md"
            onClick={() => {
              addNewOrder();
              _setShowAddConfirm(false);
            }}
          >
            Add new
          </button>
        </div>
      </Modal>
      <form>
        <div className="grid md:grid-cols-2 md:gap-4 mt-8">
          <div className="relative z-0 w-full mb-6 peer">
            <select
              name="floating_customerID"
              id="floating_customerID"
              defaultValue={_customerId}
              onChange={(e) => {
                _setCustomerId(parseInt(e.target.value));
              }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-primary peer"
            >
              {listCustomer.map((c) => (
                <option key={c.customerId} value={c.customerId}>
                  {c.customerId}
                </option>
              ))}
            </select>
            <label
              htmlFor="floating_customerID"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Customer Id
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              name="floating_employeeNumber"
              id="floating_employeeNumber"
              defaultValue={_employeeNumber}
              onChange={(e) => {
                _setEmployeeNumber(parseInt(e.target.value));
              }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-primary peer"
            >
              {listEmployee.map((e) => (
                <option key={e.employeeNumber} value={e.employeeNumber}>
                  {e.employeeNumber}
                </option>
              ))}
            </select>

            <label
              htmlFor="floating_employeeNumber"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Employee Number
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-4">
          <div className="relative z-0 w-full mb-6 peer">
            <DatePicker
              name="floating_orderDate"
              id="floating_orderDate"
              className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-primary   "
              selected={_orderDate}
              onChange={(date: Date) => {
                let curDate = new Date();
                if (date > curDate) {
                  toast.error("Selected date greater than current date!");
                } else if (
                  date.getTime() > _shipDate.getTime() &&
                  date.toDateString() !== _shipDate.toDateString()
                ) {
                  toast.error("Order date can't greater than ship date!");
                } else {
                  _setOrderDate(date);
                }
              }}
            />
            <label
              htmlFor="floating_orderDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Order Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <DatePicker
              name="floating_shipDate"
              id="floating_shipDate"
              className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-primary   "
              selected={_shipDate}
              onChange={(date: Date) => {
                let curDate = new Date();
                if (date > curDate) {
                  toast.error("Selected date greater than current date!");
                } else if (
                  date.getTime() < _orderDate.getTime() &&
                  date.toDateString() !== _orderDate.toDateString()
                ) {
                  toast.error("Ship date can't smaller than order date!");
                } else {
                  _setShipDate(date);
                }
              }}
            />
            <label
              htmlFor="floating_shipDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 left-0 origin-[0] "
            >
              Ship Date
            </label>
          </div>
        </div>
        <div className=" float-right flex gap-2">
          <button
            className="border-black border-[1px] font-medium px-5 py-2.5 rounded-md hover:bg-gray-200"
            onClick={(e) => {
              e.preventDefault();
              setConfirmCloseAdd(true);
            }}
          >
            Cancel
          </button>
          <button
            className="text-white bg-primary hover:opacity-75 border-primary border-[1px] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            onClick={(e) => {
              e.preventDefault();
              addNewOrder();
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewOrder;
