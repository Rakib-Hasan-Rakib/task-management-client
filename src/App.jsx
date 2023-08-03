import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Pages/Shared/Navbar";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="w-11/12 mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
