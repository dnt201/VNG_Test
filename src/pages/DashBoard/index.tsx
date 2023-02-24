import React, { useEffect, useState } from "react";
import { iCustomer } from "src/DTO/Customers";
import { iEmployee } from "src/DTO/Employee";
import { iOrders } from "src/DTO/Orders";
import BarChart from "./BarChart";
import { findExist } from "./FunctionDashBoard";
export interface iCount {
  id: number;
  count: number;
}
const DashBoard = () => {
  const [listEmp, setListEmp] = useState<iEmployee[]>([]);
  const [listCus, setListCus] = useState<iCustomer[]>([]);
  const [listOrder, setListOrder] = useState<iOrders[]>([]);

  const [listCusTop5, setListCusTop5] = useState<iCount[]>([]);
  const [listEmpTop5, setListEmpTop5] = useState<iCount[]>([]);

  useEffect(() => {
    let fakeCallListEmp = localStorage.getItem("listEmployee");
    let fakeCallListCus = localStorage.getItem("listCustomer");
    let fakeCallListOrder = localStorage.getItem("listOrder");

    if (fakeCallListEmp && fakeCallListCus && fakeCallListOrder) {
      var tempListEmp = JSON.parse(fakeCallListEmp) as iEmployee[];
      var tempListCus = JSON.parse(fakeCallListCus) as iCustomer[];
      var tempListOrder = JSON.parse(fakeCallListOrder) as iOrders[];
      setListEmp(tempListEmp);
      setListCus(tempListCus);
      setListOrder(tempListOrder);

      var tempTop10: iCount[] = [];
      var tempTopEmp5: iCount[] = [];
      if (tempListOrder.length > 0) {
        tempTop10.push({ id: tempListOrder[0].customerId, count: 1 });
        tempTopEmp5.push({ id: tempListOrder[0].employeeNumber, count: 1 });
        for (var i = 1; i < tempListOrder.length; i++) {
          let checkExist = findExist(tempTop10, tempListOrder[i].customerId);
          let checkExistEmp = findExist(
            tempTopEmp5,
            tempListOrder[i].employeeNumber
          );
          if (checkExist === -1) {
            tempTop10.push({ id: tempListOrder[i].customerId, count: 1 });
          } else {
            tempTop10[checkExist].count++;
          }
          if (checkExistEmp === -1) {
            tempTopEmp5.push({ id: tempListOrder[i].employeeNumber, count: 1 });
          } else {
            tempTopEmp5[checkExistEmp].count++;
          }
        }
        var resultList = tempTop10.sort((e1, e2) =>
          e1.count < e2.count ? 1 : e1.count > e2.count ? -1 : 0
        );
        var resultListEmpTop5 = tempTopEmp5.sort((e1, e2) =>
          e1.count < e2.count ? 1 : e1.count > e2.count ? -1 : 0
        );
        setListCusTop5(resultList);
        setListEmpTop5(resultListEmpTop5);
      }
    }
  }, []);

  return (
    <div className="flex flex-col  px-4 h-full ">
      <div className="grid grid-cols-4 gap-8 pt-2 ">
        <div className=" flex flex-col px-2 self-center  py-3.5 bg-gray-200 rounded-md w-[200px] h-[200px] ">
          <h6>Employee</h6>
          <div className=" flex-1 flex flex-col justify-center  ">
            <h1 className="text-5xl text-center text-slate-800 line-clamp-1">
              {listEmp.length}
            </h1>
            <b className="text-green-800 text-center text-sm">Increase 15%</b>
            <i className="text-[10px] text-center ">vs premium 30days</i>
          </div>
        </div>
        <div className=" flex flex-col px-2  py-3.5 bg-gray-200 rounded-md w-[200px] h-[200px] ">
          <h6>Customer</h6>
          <div className=" flex-1 flex flex-col justify-center  ">
            <h1 className="text-5xl text-center text-slate-800 line-clamp-1">
              {listCus.length}
            </h1>
            <b className="text-green-800 text-center text-sm">Increase 5%</b>
            <i className="text-[10px] text-center ">vs premium 30days</i>
          </div>
        </div>
        <div className=" flex flex-col px-2  py-3.5 bg-gray-200 rounded-md w-[200px] h-[200px] ">
          <h6>Order</h6>
          <div className=" flex-1 flex flex-col justify-center  ">
            <h1 className="text-5xl text-center text-slate-800 line-clamp-1">
              {listOrder.length}
            </h1>
            <b className="text-green-800 text-center text-sm">Increase 35%</b>
            <i className="text-[10px] text-center ">vs premium 30days</i>
          </div>
        </div>
        <div className=" flex flex-col px-2  py-3.5 bg-gray-200 rounded-md w-[200px] h-[200px] ">
          <h6>Preview</h6>
          <svg>
            <circle cx={"50%"} cy={"50%"} r={"60"} fill="#4444" />
          </svg>
          <span className="text-[10px] text-center">
            em chưa vẽ pie chart không dùng thư viện bao giờ {":<"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 py-4 flex-1 ">
        <BarChart
          listData={listCusTop5}
          xLabel={"ID Customer"}
          mainLabel={"Top 5 customer have the most orders"}
        />

        <BarChart
          listData={listEmpTop5}
          xLabel={"ID Employee"}
          mainLabel={"Top 5 employee have the most orders"}
        />
      </div>
    </div>
  );
};

export default DashBoard;
