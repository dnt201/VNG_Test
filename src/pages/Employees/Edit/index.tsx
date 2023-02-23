import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { listCountry } from "src/data/country";
import { iEmployee } from "src/DTO/Employee";
import { addListEmployeeToLocal } from "../FunctionEmployee";
interface iEditEmployeeProps extends React.HTMLProps<HTMLDivElement> {
  isShow: boolean;
  setIsShow: (b: boolean) => void;
  setConfirmCloseEdit: (b: boolean) => void;
  employee: iEmployee;
  listEmp: iEmployee[];
  setListEmp: (list: iEmployee[]) => void;
  setListSelect: (list: iEmployee[]) => void;
  changed: boolean;
  setChanged: (b: boolean) => void;
}
const EditEmployee: React.FC<iEditEmployeeProps> = (props) => {
  const {
    employee,
    setConfirmCloseEdit,
    setIsShow,
    listEmp,
    changed,
    setChanged,
  } = props;

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
    } else if (_zipCode.toString().length <= 0) {
      toast.error("Zip code is required");
      document.getElementById("floating_zipCode")?.focus();
    } else if (_phoneNumber.length !== 10) {
      toast.error("Phone number should be 10 digit number!");
      document.getElementById("floating_phone")?.focus();
    } else if (_position.length <= 0) {
      toast.error("Position is required");
      document.getElementById("floating_position")?.focus();
    }
    //#endregion Check logic
    else {
      if (_firstName !== undefined) {
        //#region Create temp emp
        let tempEmp: iEmployee = {
          employeeNumber: _idEmp,
          empFirstName: _firstName,
          empLastName: _lastName,
          empStreetAddress: _address,
          empPhoneNumber: _phoneNumber,
          dateHired: _dateHired.toDateString(),
          empCity: _city,
          empPosition: _position,
          empState: _state,
          empZipCode: _zipCode,
          hourlyRate: _hourlyRate,
        };
        //#endregion Create temp emp
        let tempList: iEmployee[] = listEmp;
        var tempIndex = tempList.findIndex(
          (i) => i.employeeNumber === tempEmp.employeeNumber
        );
        console.log("tempEmp", tempEmp);
        console.log("tempList", tempList);
        console.log("tempIndex", tempIndex);
        if (tempIndex > -1) {
          tempList[tempIndex] = tempEmp;
        }

        addListEmployeeToLocal(tempList);
        setIsShow(false);
        toast.success("Edit employee success");
      }
    }
  };
  const _idEmp = employee.employeeNumber || 0;
  const [_firstName, _setFirstName] = useState(employee.empFirstName);
  const [_lastName, _setLastName] = useState(employee.empLastName);
  const [_address, _setAddress] = useState(employee.empStreetAddress);
  const [_city, _setCity] = useState(employee.empCity);
  const [_state, _setState] = useState(employee.empState);
  const [_zipCode, _setZipCode] = useState(employee.empZipCode);
  const [_phoneNumber, _setPhoneNumber] = useState(employee.empPhoneNumber);
  const [_position, _setPosition] = useState(employee.empPosition);
  const [_hourlyRate, _setHourlyRate] = useState(employee.hourlyRate);
  const [_dateHired, _setDateHired] = useState(new Date(employee.dateHired));

  //#region Check changed?
  useEffect(() => {
    if (
      _firstName === employee.empFirstName &&
      _lastName === employee.empLastName &&
      _address === employee.empStreetAddress &&
      _city === employee.empCity &&
      _state === employee.empState &&
      _zipCode === employee.empZipCode &&
      _phoneNumber === employee.empPhoneNumber &&
      _position === employee.empPosition &&
      _hourlyRate === employee.hourlyRate &&
      _dateHired.toDateString() === employee.dateHired
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
    _position,
    _hourlyRate,
    _dateHired,
    employee.dateHired,
    employee.empFirstName,
    employee.empLastName,
    employee.empPhoneNumber,
    employee.empPosition,
    employee.empState,
    employee.empStreetAddress,
    employee.empZipCode,
    employee.hourlyRate,
    employee.empCity,
    setChanged,
  ]);
  //#endregion Check changed?
  return (
    <div className="bg-transparent  px-4 pb-2 w-[80vw]">
      <h2 className="text-center pb-2">Add New Employee - ID: {_idEmp}</h2>
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
                _setZipCode(parseInt(e.target.value));
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
        <div className="grid md:grid-cols-5 md:gap-4">
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
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_position"
              id="floating_position"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              value={_position}
              onChange={(e) => {
                _setPosition(e.target.value);
              }}
            />
            <label
              htmlFor="floating_position"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Position
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_hourlyRate"
              id="floating_hourlyRate"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300     focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              value={_hourlyRate || 0}
              onChange={(e) => {
                try {
                  let temp = parseInt(e.target.value);
                  console.log(temp);
                  _setHourlyRate(temp);
                } catch {}
              }}
              required
            />
            <label
              htmlFor="floating_hourlyRate"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Hourly Rate
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group  ">
            <DatePicker
              name="floating_dateHired"
              id="floating_dateHired"
              className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-primary   "
              selected={_dateHired}
              onChange={(date: Date) => {
                let curDate = new Date();
                if (date > curDate) {
                  toast.error("Selected date greater than current date!");
                } else {
                  _setDateHired(date);
                  console.log(date);
                }
              }}
            />
            <label
              htmlFor="floating_dateHired"
              className=" absolute text-sm text-gray-500  duration-300 group-focus:text-primary -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0   "
            >
              Date hired
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

export default EditEmployee;
