import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Customers,
  Employees,
  Orders,
  CustomersFill,
  EmployeesFill,
  OrdersFill,
  Dashboard,
  DashboardFill,
} from "src/icons";
import VNGLogo from "../../assets/image/VinaGame_logo.png";
type Path = "/" | "/employees" | "/customers" | "/orders";
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

interface iNavLeftProps extends React.HTMLProps<HTMLDivElement> {}
const NavLeft: React.FC<iNavLeftProps> = (props) => {
  const pathname = window.location.pathname;
  const [curPath, setCurPath] = useState(pathname);
  const { className } = props;
  return (
    <div className={"flex flex-col min-h-screen  bg-gray-300 " + className}>
      <div className="flex flex-col max-h-fit items-center">
        <a href="/">
          <img src={VNGLogo} />
        </a>

        <h2 className="pt-2">VNG - Test</h2>
      </div>
      <div className="flex flex-col mt-8">
        {listNav.map((item) => (
          <Link
            key={item.title}
            to={item.linkTo}
            onClick={() => {
              setCurPath(item.linkTo);
            }}
            className={
              "px-4 py-4 hover:bg-primary hover:text-white duration-200 group" +
              (curPath === item.linkTo ? " bg-primary text-white " : " null")
            }
          >
            <span className="flex items-center gap-2">
              <item.icon />
              <p className=" font-semibold"> {item.title}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLeft;
