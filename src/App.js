import "./App.css";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <ToastContainer/> */}
    </>
  );
}

export default App;
