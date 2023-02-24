import React from "react";
import { iCount } from "../index";
interface iBarChartProps {
  listData: iCount[];
  xLabel?: string;
  yLabel?: string;
  mainLabel: string;
}

const BarChart: React.FC<iBarChartProps> = (props) => {
  const { listData, xLabel, mainLabel } = props;
  return (
    <div className="flex flex-col h-auto ">
      <div className="flex-1 pt-2 flex items-end gap-6 border-b-[1.5px] border-black pl-2 relative ">
        {listData && listData.length >= 0 && (
          <span className="absolute right-0 font-semibold text-xs">
            {xLabel ? xLabel : "xLabel"}
          </span>
        )}
        {!listData || listData.length <= 0 ? (
          <i className="text-center w-full pb-2 text-sm">No data to show!</i>
        ) : (
          listData.map((e, index) => (
            <div
              key={e.id}
              style={{
                height:
                  index === 0
                    ? " 90% "
                    : `  ${(e.count / listData[0].count) * 90}% `,
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
          ))
        )}
      </div>
      <h6 className=" mt-5 text-center">{mainLabel || "Main label"}</h6>
    </div>
  );
};

export default BarChart;
