import Login from "./components/Login";
import View from "./components/View";
import Discount from "./components/Discount";
import Home from "./components/Home";
import Offers from "./components/Offer";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

//usestate
//useeffect
//useparams
//usecallback
//usememo

const App = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [loggenIn, setLog] = useState(false);

  function login() {
    setLog(true);
  }
  return (
    <>
      {/* <Login></Login> */}
      <Home login={login} />
      {/* {loggenIn ? <Login /> : null} */}
      <Outlet/>

    </>
  );
};

export default App;