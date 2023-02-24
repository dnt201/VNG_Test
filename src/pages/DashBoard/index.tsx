import React, { useEffect, useState } from "react";
import { iCustomer } from "src/DTO/Customers";
import { iEmployee } from "src/DTO/Employee";
import { iOrders } from "src/DTO/Orders";
import { findExistCus } from "./FunctionDashBoard";
export interface iCount {
  id: number;
  count: number;
}
const DashBoard = () => {
  const [listEmp, setListEmp] = useState<iEmployee[]>([]);
  const [listCus, setListCus] = useState<iCustomer[]>([]);
  const [listOrder, setListOrder] = useState<iOrders[]>([]);

  const [listCusTop5, setListCusTop5] = useState<iCount[]>([]);

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
      tempTop10.push({ id: tempListOrder[0].customerId, count: 1 });
      for (var i = 1; i < tempListOrder.length; i++) {
        let checkExist = findExistCus(tempTop10, tempListOrder[i].customerId);
        if (checkExist === -1) {
          tempTop10.push({ id: tempListOrder[i].customerId, count: 1 });
        } else {
          tempTop10[checkExist].count++;
        }
      }
      var resultList = tempTop10.sort((e1, e2) =>
        e1.count < e2.count ? 1 : e1.count > e2.count ? -1 : 0
      );
      setListCusTop5(resultList);
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
            <b className="text-green-800 text-center text-sm">Increase 15%</b>
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
            <circle cx={"50%"} cy={"50%"} r={"74"} fill="red" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 py-4 flex-1 ">
        <div className="flex flex-col h-auto ">
          <div className="flex-1 pt-2 flex items-end gap-6 border-b-[1.5px] border-black pl-2">
            {listCusTop5.map((e, index) => (
              <div
                key={e.id}
                style={{
                  height:
                    index === 0
                      ? " 90% "
                      : `  ${(e.count / listCusTop5[0].count) * 90}% `,
                }}
                className={" px-2 "}
              >
                <div className="px-[12px] bg-gray-300 h-full relative">
                  <span className="absolute -bottom-3 translate-y-1/2 -translate-x-1/2 left-1/2 text-sm font-semibold">
                    {e.id}
                  </span>
                  <span className="absolute -top-3 translate-y-1/2 -translate-x-1/2 left-1/2 text-sm">
                    {e.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <h6 className=" mt-5 text-center">
            Top 5 customer have the most orders
          </h6>
        </div>
        <div>
          <div className="flex-1 ">a</div>
          <h6>Top 5 customer have the most orders</h6>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
