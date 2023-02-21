import NavLeft from "./modules/NavLeft";

const App = () => {
  return (
    <div className="flex">
      <NavLeft className="w-1/5" />
      <div className="w-4/5">content</div>
    </div>
  );
};

export default App;
