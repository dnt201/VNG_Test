import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { listCountry } from "src/data/country";
import { iCustomer } from "src/DTO/Customers";
import { addListCustomerToLocal } from "../FunctionCustomer";
interface iEditCustomerProps extends React.HTMLProps<HTMLDivElement> {
  isShow: boolean;
  setIsShow: (b: boolean) => void;
  setConfirmCloseEdit: (b: boolean) => void;
  customer: iCustomer;
  listCus: iCustomer[];
  setListCus: (list: iCustomer[]) => void;
  setListSelect: (list: iCustomer[]) => void;
  changed: boolean;
  setChanged: (b: boolean) => void;
}
const EditCustomer: React.FC<iEditCustomerProps> = (props) => {
  const {
    customer,
    setConfirmCloseEdit,
    setIsShow,
    listCus,
    changed,
    setChanged,
  } = props;

  const [_firstName, _setFirstName] = useState(customer.custFirstName);
  const [_lastName, _setLastName] = useState(customer.custLastName);
  const [_address, _setAddress] = useState(customer.custStreetAddress);
  const [_city, _setCity] = useState(customer.custCity);
  const [_state, _setState] = useState(customer.custState);
  const [_zipCode, _setZipCode] = useState(customer.custZipCode);
  const [_phoneNumber, _setPhoneNumber] = useState(customer.custPhone);
  const [_email, _setEmail] = useState(customer.custEmailAddress);

  const editUser = () => {
    //#region Check logic
    console.log(_phoneNumber.length !== 10);
    if (_firstName.length <= 0) {
      toast.error("First name is required");
      document.getElementById("floating_first_name")?.focus();
    } else if (_lastName.length <= 0) {
      toast.error("Last name is required");
      document.getElementById("floating_last_name")?.focus();
    } else if (_address.length <= 0) {
      toast.error("Address is required");
      document.getElementById("floating_address")?.focus();
    } else if (_city.length <= 0) {
      toast.error("City is required");
      document.getElementById("floating_city")?.focus();
    } else if (_state.length <= 0) {
      toast.error("State is required");
      document.getElementById("floating_state")?.focus();
    } else if (_zipCode === 0) {
      toast.error("Zip code is invalid");
      document.getElementById("floating_zipCode")?.focus();
    } else if (_phoneNumber.length !== 10) {
      toast.error("Phone number should be 10 digit number!");
      document.getElementById("floating_phone")?.focus();
    } else if (_email.length <= 0) {
      toast.error("Email is required");
      document.getElementById("floating_email")?.focus();
    } else if (
      _email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
    ) {
      toast.error("Email is invalid");
      document.getElementById("floating_email")?.focus();
    }
    //#endregion Check logic
    else {
      if (_firstName !== undefined) {
        //#region Create temp emp
        let tempCus: iCustomer = {
          customerId: customer.customerId,
          custFirstName: _firstName,
          custLastName: _lastName,
          custStreetAddress: _address,
          custCity: _city,
          custState: _state,
          custZipCode: _zipCode,
          custPhone: _phoneNumber,
          custEmailAddress: _email,
        };
        //#endregion Create temp emp

        let tempList: iCustomer[] = listCus;
        var tempIndex = tempList.findIndex(
          (i) => i.customerId === tempCus.customerId
        );

        if (tempIndex > -1) {
          tempList[tempIndex] = tempCus;
        }

        addListCustomerToLocal(tempList);
        setIsShow(false);
        toast.success("Edit employee success");
      }
    }
  };
  //#region Check changed?
  useEffect(() => {
    if (
      _firstName === customer.custFirstName &&
      _lastName === customer.custLastName &&
      _address === customer.custStreetAddress &&
      _city === customer.custCity &&
      _state === customer.custState &&
      _zipCode === customer.custZipCode &&
      _phoneNumber === customer.custPhone &&
      _email === customer.custEmailAddress
    )
      setChanged(false);
    else setChanged(true);
  }, [
    _firstName,
    _lastName,
    _address,
    _city,
    _state,
    _zipCode,
    _phoneNumber,
    _email,
  ]);
  //#endregion Check changed?
  return (
    <div className="bg-transparent  px-4 pb-2 w-[80vw]">
      <h2 className="text-center pb-2">
        Edit customer - ID: {customer.customerId}
      </h2>
      <form>
        <div className="grid md:grid-cols-2 md:gap-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              defaultValue={_firstName}
              onChange={(e) => {
                _setFirstName(e.target.value);
              }}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              defaultValue={_lastName}
              onChange={(e) => {
                _setLastName(e.target.value);
              }}
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            name="floating_address"
            id="floating_address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
            placeholder=" "
            defaultValue={_address}
            onChange={(e) => {
              _setAddress(e.target.value);
            }}
            required
          />
          <label
            htmlFor="floating_address"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address
          </label>
        </div>
        <div className="grid md:grid-cols-3 md:gap-4">
          <div className="relative z-0 w-full mb-6 group">
            <select
              name="floating_city"
              id="floating_city"
              className="select-items block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              defaultValue={_city}
              onChange={(e) => {
                _setCity(e.target.value);
              }}
              required
            >
              {listCountry.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_state"
              id="floating_state"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              defaultValue={_state}
              onChange={(e) => {
                _setState(e.target.value);
              }}
              required
            />
            <label
              htmlFor="floating_state"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              State
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_zipCode"
              id="floating_zipCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              defaultValue={_zipCode || 0}
              onChange={(e) => {
                let temp = parseInt(e.target.value);
                if (isNaN(temp)) _setZipCode(0);
                else _setZipCode(temp);
              }}
              required
            />
            <label
              htmlFor="floating_zipCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ZipCode
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-4 md:gap-4">
          <div className="relative z-0 w-full mb-6 group col-span-2">
            <input
              type="tel"
              maxLength={10}
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              value={_phoneNumber}
              onChange={(e) => {
                if (isNaN(parseInt(e.target.value))) {
                  _setPhoneNumber("");
                } else {
                  _setPhoneNumber(e.target.value.replace(/[^0-9]+/g, ""));
                }
              }}
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (0123-456-789)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group col-span-2">
            <input
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              value={_email}
              onChange={(e) => {
                _setEmail(e.target.value);
              }}
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email (duynhatran@vng.com.vn)
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
            // type="submit"
            disabled={!changed}
            className="text-white bg-primary hover:opacity-75 border-primary border-[1px] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-muted disabled:hover:opacity-100 disabled:border-muted "
            onClick={(e) => {
              editUser();
              e.preventDefault();
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
