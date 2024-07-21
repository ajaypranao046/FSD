import { useState, useEffect } from "react";
const Offers = () => {
  useEffect(() => {
    // Check if user is authenticated
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      // Redirect to login page or display a message
      window.location.href = "/login"; // Redirect to login page
    }
  }, []);
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
  return (
    <>
      <div className="card-container">
        {offerdata.map((item) => (
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
                  <b>DESCRIPTION:</b> {item.description}
                </span>
                <br />
                <span>
                  <b>SITTER:</b> {item.sitter}
                </span>
                <br />
                <span>
                  <b>MODEL:</b> {item.model}
                </span>
                <br />
                <span>
                  <b>OFFER PERCENTAGE:</b> {item.Percentage}
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

export default Offers;
