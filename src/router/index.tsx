import { Routes, Route } from "react-router-dom";
import Customers from "src/pages/Customers";
import DashBoard from "src/pages/DashBoard";
import Employees from "src/pages/Employees";
import Orders from "src/pages/Orders";
import SomeThingWentWrong from "src/pages/SomeThingWentWrong";
import App from "../App";

const DeclareRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<DashBoard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="customers" element={<Customers />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path="*" element={<SomeThingWentWrong />} />
    </Routes>
  );
};

export default DeclareRouter;
