import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
// import { useHistory } from "react-router-dom";
import View from "./View";
import { v4 as uuidv4 } from "uuid";

export const Admin = () => {
  const [adminname, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [dis, setDis] = useState("");
  const [mod, setModel] = useState("");
  const [bran, setBrand] = useState("");
  const [sit, setSitter] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(false);
  const [Uniid, setUniid] = useState(uuidv4());
  const [editupdateID, setEditID] = useState(null);
  const [cardupdatebtn, setCardUpdateBtn] = useState(false);
  const [radio, Setradio] = useState(false);
  const [Percentage, setPercentage] = useState(null);
  const[showoffer,setOfferList]=useState(false)
  // const history = useHistory();

  const setErrorWithDuration = (errorMessage, duration) => {
    setError(errorMessage);
    setTimeout(() => {
      setError("");
    }, duration);
  };
  const setMessageWithDuration = (errorMessage, duration) => {
    setMessage(errorMessage);
    setTimeout(() => {
      setMessage("");
    }, duration);
  };



  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (radio) {
      if (!file) {
        setError("Please select a file to upload.");
        return;
      }
      const path = `/images/${Uniid}`;
      const ref = storage.ref(path);
      try {
        const newUniid = uuidv4();
        setUniid(newUniid);
        const snapshot = await ref.put(file);
        const imageUrl = await snapshot.ref.getDownloadURL();
        const response = await fetch("http://localhost:8000/OfferInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl,
            description: dis,
            sitter: sit,
            model: mod,
            brand: bran,
            Uniid: Uniid,
            Offer: radio,
            Percentage: Percentage,
          }),
        });
        const data = await response.json();
        console.log(data);
        setFile("");
        setError(""); // Clear any previous error
        setBrand("");
        setModel("");
        setDis("");
        setSitter("");
        Setradio(null);
        setPercentage(null);
        setErrorWithDuration("Offer Successfully uploaded",5000)
       
      } catch (error) {
        console.error("Error uploading image & Offer:", error);
        setErrorWithDuration("Failed to upload image. Please try again later.",5000)
       
      }
    } else {
      if (!file) {
        setErrorWithDuration("Please select a file to upload.",5000)
        
        return;
      }
      const path = `/images/${Uniid}`;
      const ref = storage.ref(path);
      try {
        const newUniid = uuidv4();
        setUniid(newUniid);
        const snapshot = await ref.put(file);
        const imageUrl = await snapshot.ref.getDownloadURL();
        const response = await fetch("http://localhost:8000/updateInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl,
            description: dis,
            sitter: sit,
            model: mod,
            brand: bran,
            Uniid: Uniid,
          }),
        });
        const data = await response.json();
        console.log(data);
        setFile(null);
        setError(""); // Clear any previous error
        setBrand("");
        setModel("");
        setDis("");
        setSitter("");
        setErrorWithDuration("Successfully uploaded",5000)
        
         
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrorWithDuration("Failed to upload image. Please try again later.",5000)
     
      }
    }
  };

  async function AdminCheck(e) {
    e.preventDefault();
    try {
      if (adminname !== "" && password !== "") {
        const response = await fetch("http://localhost:8000/Admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminname,
            password,
          }),
        });

        const data = await response.json();
        console.log(data);
        setMessage(data.message);
        setPassword("");
        setAdminName("");
        if (data.status === "success") {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } else {
        setMessageWithDuration("Please enter both admin name and password.",5000)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function HandleEdit() {
    try {
      console.log(adminname,password,"text")
      if (adminname !== "" && password !== "") {
        const response = await fetch("http://localhost:8000/AdminChange", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminname,
            password,
          }),
        });

        const data = await response.json();
        console.log(data);
        setMessageWithDuration(data.message,5000)
        

        if (data.status === "success") {
          setLoggedIn(false);
        }
        setPassword("");
        setAdminName("");
      } else {
        setMessageWithDuration("Please enter both admin name and password.",5000)
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleButtonList = () => {
    setShowList(!showList);
  };
  const handleButtonListOFFER =() =>{
    setOfferList(!showoffer)
  }
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/View");
        const Resposedata = await response.json();
        const store = Resposedata.data;
        setData(Resposedata.data);
        console.log("dgssdgsdgsdgsdg", store);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showList]);
  
  async function HandleDelete(Uniid, isOffer) {
    try {
      const endpoint = isOffer ? "http://localhost:8000/DeleteOfferId" : "http://localhost:8000/DeleteId";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Uniid,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${Uniid}`);
        await imageRef.delete();
  
        alert(responseData.message);
        setShowList(!showList);
      } else {
        throw new Error(responseData.message || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again later.");
    }
  }
  

  async function HandleEditCard(Uniid,isoffer) {
   
    

    if(!isoffer){ try {setEditID(Uniid);
        const response = await fetch("http://localhost:8000/GetCardID", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Uniid,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("now", responseData.data);
        const { imageUrl, description, sitter, model, brand, editid } =
          responseData.data;
        console.log("ids", editid);
        console.log(
          "ddddd",
          imageUrl,
          description,
          sitter,
          model,
          brand,
          editid
        );
        setBrand(brand);
        setDis(description);
        setModel(model);
        setSitter(sitter);
        setCardUpdateBtn(true);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorWithDuration(" Your edit is not updated",5000)
        
      }}else{
        try {setEditID(Uniid);
          const response = await fetch("http://localhost:8000/GetOfferCardID", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Uniid,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const responseData = await response.json();
          console.log("now", responseData.data);
          const { imageUrl, description, sitter, model, brand, editid,offer,Percentage } =
            responseData.data;
          console.log("ids", editid);
          console.log(
            "ddddd",
            imageUrl,
            description,
            sitter,
            model,
            brand,
            editid
          );
          setBrand(brand);
          setDis(description);
          setModel(model);
          setSitter(sitter);
          setCardUpdateBtn(true);
          setPercentage(Percentage)
          Setradio(true)
          
        } catch (error) {
          console.error("Error fetching data:", error);
          setErrorWithDuration("your edit is not updated",5000)
         
        }
      }
    }
  

    async function HandleUpdate() {
      try {
        let apiUrl = "";
        let requestBody = {};
    
        if (cardupdatebtn) {
          // Update for regular item
          apiUrl = "http://localhost:8000/InfoEditCardSet";
          requestBody = {
            editupdateID,
            mod,
            bran,
            sit,
            dis,
          };
        } else {
          // Update for offer item
          apiUrl = "http://localhost:8000/InfoEditOfferCardSet";
          requestBody = {
            editupdateID,
            mod,
            bran,
            sit,
            dis,
            radio,
            Percentage, // Assuming Percentage is defined in your component's state
          };
        }
    
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        setError(data.message);
        setCardUpdateBtn(false);
         
        setBrand("");
        setModel("");
        setSitter("");
        setDis("");
      } catch (error) {
        console.error("Error:", error.message);
        setErrorWithDuration("Failed to update. Please try again later.",5000);
      }
    }
    
  const [offerdata, setofferData] = useState([]);

  useEffect(() => {
    const fetchofferData = async () => {
      try {
        const response = await fetch("http://localhost:8000/ViewOffer");
        const Resposedata = await response.json();
       
        setofferData(Resposedata.data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchofferData();
  }, [offerdata]);
  function HandleEditCanel(){
    setBrand("")
    setDis("")
    setModel("")
    setSitter("")


  }

  // const handleGoBack = () => {
  //   history.goBack(); // Go back to the previous page
  // };

  return (
    <div className="AdminContainer">
      <h1 id="headerAdmin">Admin</h1>
      <div className="AdminlogContainer">
        <form className="AdminlogForm" onSubmit={AdminCheck}>
          <label>Admin name:</label>
          {/* <button type="button" onClick={handleGoBack}>
        Back
      </button> */}
          <input
            value={adminname}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loggedIn}>
            Login
          </button>
          <button type="button" onClick={HandleEdit} disabled={!loggedIn}>
            Edit
          </button>
          <span>{message}</span>
        </form>
      </div>
      <button type="button" onClick={handleButtonList} disabled={!loggedIn}>
        ShowList
      </button>
      <button type="button" onClick={handleButtonListOFFER} disabled={!loggedIn}>
        OFFER ShowList
      </button>
      <div className="LEFT-RIGHTcontainer">
        <div className="left-section">
          <label>Description</label>
          <br />
          <input
            type="text"
            value={dis}
            onChange={(e) => setDis(e.target.value)}
            disabled={!loggedIn} // Disable input when not logged in
          />
          <br />
          <label>Model</label>
          <br />
          <input
            type="text"
            value={mod}
            onChange={(e) => setModel(e.target.value)}
            disabled={!loggedIn} // Disable input when not logged in
          />
          <br />
          <label>Brand</label>
          <br />
          <input
            type="text"
            value={bran}
            onChange={(e) => setBrand(e.target.value)}
            disabled={!loggedIn} // Disable input when not logged in
          />
          <br />
          <label>Sitter</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            max="8"
            step="1"
            value={sit}
            onChange={(e) => setSitter(e.target.value)}
            disabled={!loggedIn} // Disable input when not logged in
          />
        </div>
        <div className="right-section">
          <form onSubmit={handleImageUpload}>
            <label>
              Offer:
              <input
                type="checkbox"
                disabled={!loggedIn}
                checked={radio}
                onClick={() => Setradio(true)}
              ></input>
            </label>
            {radio && (
              <label>
                Enter the Percentage:
                <input
                  type="Number"
                  disabled={!loggedIn}
                  value={Percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                ></input>
              </label>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={!loggedIn} // Disable input when not logged in
            />
            <button disabled={!file || !loggedIn}>Upload</button>
            {cardupdatebtn && (
              <button type="button" onClick={HandleUpdate}>
                update
              </button>
            )}
            {cardupdatebtn && (
              <button type="button" onClick={HandleEditCanel}>
                cancel
              </button>
            )}
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      {/* <button type="button" onClick={handleButtonList} disabled={!loggedIn}>
        ShowList
      </button>
      <button type="button" onClick={handleButtonListOFFER} disabled={!loggedIn}>
        OFFER ShowList
      </button> */}
      {showList && (
        <div className="card-container">
          {data.map((item) => (
            <div className="card" key={item.Uniid}>
              <div className="cross">
                <img
                  src="frontend-carental\src\assets\cross-circle-svgrepo-com.svg"
                  alt="cross"
                ></img>
              </div>
              <div className="discription"></div>
              <div className="card-content">
                <h3>Brand: {item.brand}</h3>
                <div className="img-container">
                  <img src={item.imageUrl} alt="Item" />
                </div>
                <br />
                <div className="span-container">
                  <span>
                    <b>Description</b>: {item.description}
                  </span>
                  <br />
                  <span>
                    <b>Sitter</b>: {item.sitter}
                  </span>
                  <br />
                  <span>
                    <b>Model</b>: {item.model}
                  </span>

                  <br />
                  <button onClick={() => HandleDelete(item.Uniid,false)}>
                    delete
                  </button>
                  <button onClick={() => HandleEditCard(item.Uniid,false)}>
                    edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showoffer&&(
        <div className="card-container">
        {offerdata.map((item) => (
          <div className="card" key={item.Uniid}>
            <div className="cross">
              <img
                src="frontend-carental\src\assets\cross-circle-svgrepo-com.svg"
                alt="cross"
              ></img>
            </div>
            <div className="discription"></div>
            <div className="card-content">
              <h3>Brand: {item.brand}</h3>
              <div className="img-container">
                <img src={item.imageUrl} alt="Item" />
              </div>
              <br />
              <div className="span-container">
                <span>
                  <b>DESCRIPTION:</b> {item.description}
                </span>
                <br />
                <span>
                  <b>SITTER:</b> {item.sitter}
                </span>
                <br />
                <span>
                  <b>MODEL:</b> {item.model}
                </span><br/>
                <span>
                  <b>OFFER PERCENTAGE:</b> {item.Percentage}
                </span>


                <br />
                <button onClick={() => HandleDelete(item.Uniid,true)}>
                  delete
                </button>
                <button onClick={() => HandleEditCard(item.Uniid,true)}>
                  edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Admin;