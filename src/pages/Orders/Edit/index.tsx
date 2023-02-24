import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { listCountry } from "src/data/country";
import { iOption } from "src/data/interface";
import { iCustomer } from "src/DTO/Customers";
import { iEmployee } from "src/DTO/Employee";
import { iOrders } from "src/DTO/Orders";
import { findIndexOfOrder, addListOrderToLocal } from "../FunctionOrder";
// import { addListCustomerToLocal } from "../FunctionCustomer";
interface iEditOrderProps extends React.HTMLProps<HTMLDivElement> {
  isShow: boolean;
  setIsShow: (b: boolean) => void;
  setConfirmCloseEdit: (b: boolean) => void;
  order: iOrders;
  listOrder: iOrders[];
  setListOrder: (list: iOrders[]) => void;
  setListSelect: (list: iOrders[]) => void;
  changed: boolean;
  setChanged: (b: boolean) => void;
}
const EditOrder: React.FC<iEditOrderProps> = (props) => {
  const {
    order,
    setConfirmCloseEdit,
    setIsShow,
    listOrder,
    setListOrder,
    changed,
    setChanged,
    setListSelect,
  } = props;
  const _idOrder = order.orderNumber;
  const [_customerId, _setCustomerId] = useState(order.customerId);
  const [_orderDate, _setOrderDate] = useState(new Date(order.orderDate));
  const [_shipDate, _setShipDate] = useState(new Date(order.shipDate));
  const [_employeeNumber, _setEmployeeNumber] = useState(order.employeeNumber);

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
    }
  }, []);

  const editOrder = () => {
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
      let tempOrder: iOrders = {
        orderNumber: _idOrder,
        customerId: _customerId,
        orderDate: _orderDate.toDateString(),
        shipDate: _shipDate.toDateString(),
        employeeNumber: _employeeNumber,
      };
      let tempList: iOrders[] = listOrder;
      // tempList.push(order);
      let tempIndex = findIndexOfOrder(tempList, tempOrder);
      // localStorage.setItem("listEmployee", JSON.stringify(tempList));

      if (tempIndex > -1) {
        tempList[tempIndex] = tempOrder;
        addListOrderToLocal(tempList);
        setListOrder(tempList);
        setIsShow(false);
        setListSelect([tempOrder]);
        toast.success("Edit order success");
      } else {
        toast.error("Edit order error");
      }
    }
  };

  //#region  Check changed?
  useEffect(() => {
    if (
      _customerId === order.customerId &&
      _orderDate.toDateString() === order.orderDate &&
      _shipDate.toDateString() === order.shipDate &&
      _employeeNumber === order.employeeNumber
    ) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [_customerId, _orderDate, _shipDate, _employeeNumber, changed]);
  //#endregion Check changed?
  return (
    <div className="bg-transparent  px-4 pb-2 w-[80vw] h-[80vh]">
      <h2 className="text-center pb-2">Edit order - ID: {_idOrder}</h2>
      <form>
        <div className="grid md:grid-cols-2 md:gap-4 mt-8">
          <div className="relative z-0 w-full mb-6 peer">
            <select
              name="floating_customerID"
              id="floating_customerID"
              defaultValue={_customerId}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-primary peer"
              onChange={(e) => {
                _setCustomerId(parseInt(e.target.value));
              }}
            >
              {listCustomer.map((c) => (
                <option
                  key={c.customerId}
                  value={c.customerId}
                  selected={c.customerId === _customerId}
                >
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-primary peer"
              required
              onChange={(e) => {
                _setEmployeeNumber(parseInt(e.target.value));
              }}
            >
              {listEmployee.map((e) => (
                <option
                  key={e.employeeNumber}
                  value={e.employeeNumber}
                  selected={e.employeeNumber === _employeeNumber}
                >
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
              setConfirmCloseEdit(true);
            }}
          >
            Cancel
          </button>
          <button
            className="text-white bg-primary hover:opacity-75 border-primary border-[1px] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-muted disabled:border-muted"
            onClick={(e) => {
              e.preventDefault();
              editOrder();
            }}
            disabled={!changed}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
