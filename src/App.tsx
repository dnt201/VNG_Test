import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { redirect } from "react-router-dom";
import NavLeft from "./modules/NavLeft";

const App = () => {
  const [_mini, _setMini] = useState(false);
  const [_lazy, _setLazy] = useState(false);
  useEffect(() => {
    <Navigate to="/" replace />;
  }, []);
  return (
    <div className="flex relative h-screen ">
      <NavLeft
        className="w-[240px] z-10 "
        mini={_mini}
        setMini={_setMini}
        lazy={_lazy}
        setLazy={_setLazy}
      />
      <div
        className={
          "relative z-0  flex-1  overflow-y-hidden duration-300 p-1 pr-0" +
          (_mini && _lazy === false ? " -left-[180px]  " : " left-0  ") +
          (_lazy ? " left-0 w-full " : null)
        }
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
