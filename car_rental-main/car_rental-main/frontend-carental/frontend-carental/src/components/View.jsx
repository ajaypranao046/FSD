import { useState, useEffect } from "react";

const View = () => {
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
  }, []);
  useEffect(() => {
    // Check if user is authenticated
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      // Redirect to login page or display a message
      window.location.href = "/login"; // Redirect to login page
    }
  }, []);

  return (
    <>
      <div className="card-container">
        {data.map((item) => (
          <div className="card" key={item.Uniid}>
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
                <button>register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default View;