import { useState ,useEffect} from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[HideLogout,setHideLogout]=useState(false)
  const [uniid, setUniid] = useState(uuidv4());

  const [phoneno,setNumber]=useState("")
  // useEffect(() => {
  //   // Check if user is authenticated
  //   const loggedIn = localStorage.getItem("loggedIn");
  //   if (loggedIn) {
  //     // If user is authenticated, show the logout button
  //     setHideLogout(true);
  //   }
  // }, []);

  const [text, setMessage] = useState("");
  console.log("variables:", username, password);

  async function addNewEntry(e) {
    e.preventDefault();
    setUniid(uuidv4())

    try {
      if (username != "" && password != "") {
        const response = await fetch("http://localhost:8000/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            phoneno:phoneno,
            uniid:uniid
          }),
        });

        const data = await response.json();
        console.log(data);
        setMessage(data.message);
        setPassword("");
        setUsername("");
        setNumber("")
      } else {
        setMessage("enter correct credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function HandleLogin() {
    try {
      if (username != "" && password != "") {
        const response = await fetch("http://localhost:8000/logincheck", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        
        const data = await response.json();
        console.log(data);
        setMessage(data.message);
        setPassword("");
        setUsername("");
        if (data.status === "success") {
          // Set authentication flag (you can use localStorage or session storage)
          setHideLogout(true)
          localStorage.setItem("loggedIn", "true");
          // Redirect user to home page
          window.location.href = "/";
        }
      } else {
        setMessage("Invalid user and password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleLogout() {
    // Clear authentication flag from localStorage
    localStorage.removeItem("loggedIn");
    // Redirect user to the login page
    window.location.href = "/login";
    setHideLogout(false)
  }
  function HandleNumber(e){
    console.log(e.target.value)
    setNumber(e.target.value)
  }

  return (
    <div className="center">
     <div className="photo">
    <img src="https://t3.ftcdn.net/jpg/06/83/94/28/240_F_683942890_c2GjYVRjPh9Wu1YYSqTf8M65ystdhpBR.jpg"></img>
    
    {/* <div> */}
      
      <form className="LoginForm" onSubmit={addNewEntry}>
        
        <label>Username:</label>
        <input value={username} onChange={handleUsername} />
        <label>Password:</label>
        <input value={password} onChange={handlePassword} />
         <label for="phone">Enter your phone number:</label>
        <input type="tel" id="phone" name="phone" value={phoneno}onChange={HandleNumber}></input>
        <div className="login">
        <button type="submit">register</button>
        <button type="button" onClick={HandleLogin}>login</button>
        </div>
       { HideLogout&&<button onClick={handleLogout} >Logout</button>}
        
        

        <span>{text}</span>
      </form>
        
    </div>
    </div>
    // </div>
  );
};

export default Login;

