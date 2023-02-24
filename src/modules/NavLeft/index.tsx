import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customStyles } from "src/assets/customModal";
import {
  Customers,
  Employees,
  Orders,
  CustomersFill,
  EmployeesFill,
  OrdersFill,
  Dashboard,
  DashboardFill,
  ChevronLeft,
  ChevronRight,
} from "src/icons";
import Modal from "react-modal";

import VNGLogo from "../../assets/image/VinaGame_logo.png";
import { listCustomer, listEmployee, listOrder } from "src/data/seed";
import { iCustomer } from "src/DTO/Customers";
import { iEmployee } from "src/DTO/Employee";
import { iOrders } from "src/DTO/Orders";
interface iNavItem {
  title: string;
  icon: React.ElementType;
  iconFill: React.ElementType;
  linkTo: string;
}
const listNav: iNavItem[] = [
  {
    title: "DashBoard",
    icon: Dashboard,
    iconFill: DashboardFill,
    linkTo: "/",
  },
  {
    title: "Employees",
    icon: Employees,
    iconFill: EmployeesFill,
    linkTo: "/employees",
  },
  {
    title: "Customers",
    icon: Customers,
    iconFill: CustomersFill,
    linkTo: "/customers",
  },
  {
    title: "Orders",
    icon: Orders,
    iconFill: OrdersFill,
    linkTo: "/orders",
  },
];

interface iNavLeftProps extends React.HTMLProps<HTMLDivElement> {
  mini: boolean;
  setMini: (b: boolean) => void;
  lazy: boolean;
  setLazy: (b: boolean) => void;
}
const NavLeft: React.FC<iNavLeftProps> = (props) => {
  const { className, mini, setMini, lazy, setLazy } = props;
  const pathname = window.location.pathname;

  const [isShowGene, setShowGene] = useState(false);
  const [curPath, setCurPath] = useState(pathname);
  useEffect(() => {
    if (mini === true) {
      var a = setTimeout(() => {
        setLazy(true);
      }, 300);
    } else setLazy(false);
    return () => {
      clearTimeout(a);
    };
  }, [mini, setLazy]);
  return (
    <div
      className={
        "flex flex-col min-h-screen  bg-gray-300  relative duration-300  " +
        className +
        (mini && lazy === false
          ? " -left-[180px] "
          : lazy === true
          ? " w-[60px] left-0  "
          : " left-0 overflow-hidden")
      }
    >
      <button
        className={
          " bg-gray-300 absolute right-0 z-20 top-1/2 -translate-y-1/2 py-2 hover:bg-primaryHover duration-300" +
          (mini ? " rounded-r-full translate-x-full   " : "  rounded-l-full ")
        }
        onClick={() => setMini(!mini)}
      >
        {mini ? <ChevronRight /> : <ChevronLeft />}
      </button>
      <div
        className={
          "relative flex flex-col items-center  duration-300 " +
          (mini && lazy === false
            ? " -left-[260px]   "
            : lazy === true
            ? " w-[60px] -left-[260px] "
            : " left-0  ")
        }
      >
        <a href="/">
          <img src={VNGLogo} alt="VNG - Logo" />
        </a>
        <h2 className="pt-2">VNG - Test</h2>
      </div>
      <div className="flex flex-col mt-8 overflow-hidden flex-1">
        {listNav.map((item) => (
          <Link
            key={item.title}
            to={item.linkTo}
            onClick={() => {
              setCurPath(item.linkTo);
            }}
            className={
              "px-4 py-4 hover:bg-primary hover:text-white duration-300  group  " +
              (curPath === item.linkTo ? " bg-primary text-white " : " null")
            }
          >
            <span
              className={
                "flex items-center  gap-2 relative " +
                (mini ? " translate-x-full " : " null ")
              }
            >
              <div className={mini ? "  -translate-x-full  duration-300" : " "}>
                {curPath === item.linkTo ? <item.iconFill /> : <item.icon />}
              </div>
              <p className={" font-semibold"}>{item.title}</p>
            </span>
          </Link>
        ))}
      </div>
      <button
        className="px-2 py-3 bg-primary font-semibold"
        onClick={() => setShowGene(true)}
      >
        Gene Data
      </button>
      <Modal
        isOpen={isShowGene}
        ariaHideApp={false}
        onRequestClose={() => {
          setShowGene(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Want to generate?</h2>
        <p>If you click yes, all data will be reset!</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-5 py-2.5 rounded-md border-[1px] "
            onClick={() => {
              setShowGene(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-primary text-white rounded-md"
            onClick={() => {
              //delete
              localStorage.clear();
              var tempListCus: iCustomer[] = listCustomer;
              var tempListEmp: iEmployee[] = listEmployee;
              var tempListOrder: iOrders[] = listOrder;
              localStorage.setItem("listCustomer", JSON.stringify(tempListCus));
              localStorage.setItem("listEmployee", JSON.stringify(tempListEmp));
              localStorage.setItem("listOrder", JSON.stringify(tempListOrder));
              window.location.reload();
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NavLeft;
