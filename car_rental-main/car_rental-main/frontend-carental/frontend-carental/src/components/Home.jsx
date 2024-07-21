import { Link } from "react-router-dom"

const Home = (props) => {
  const {login}=props
  
    function HandleLogin(){
      login()
    }

    function HandleLogout(){
      logout()
    }
  return (
    <>
      {/* <div className="offerHead">
        <marquee className="mar-head" direction="right">
          🤑🤑offers is going on'🤑🤑
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          🤑🤑offers is going
          on'🤑🤑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🤑🤑offers
          is going on'🤑🤑
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          🤑🤑offers is going on'🤑🤑
        </marquee>
      </div> */}
      <header className="header">
        <div className="between">
        <ul className="nav-ul">
          <li className="nav-logo"><img src="https://static.vecteezy.com/system/resources/thumbnails/032/752/217/small_2x/super-car-logo-icon-ai-generative-free-png.png"></img> </li>
          <li className="nav-item"><Link to="/">Home</Link></li>
          {/* <li className="nav-item"><Link to="/View">View</Link></li> */}
          <li className="nav-item"><Link to="/Offers">Offers</Link></li>
          <li className="nav-item"><Link to="/About">About</Link></li>
          <li className="nav-item" onClick={HandleLogin}><Link to="/Login">Signup</Link></li>
          <li className="nav-item"><Link to="/Admin">Admin</Link></li>
          <li className="logout" onClick={HandleLogout}><Link to="/Login">Logout</Link></li>
        </ul>
        </div>
      </header>
      <div className="contactFixed">
        <span>contact Us</span>
      </div>
      {/* <footer>
        
        <div className="footer">
          <div className="carrent-footer">
            <a>carrent</a>
          </div>

          <div className="social">
            <a>social</a>
            <ul className="footer-social-list">
              <li>instagram</li>
              <li>linkedIn</li>
              <li>x</li>
              <li>facebook</li>
              <li>youtube</li>
            </ul>
          </div>
          <span>Copy RIghts Included</span>
          <span>This is to certify that this has a copyright</span>
          <span>money return policy</span>
        </div>
      </footer> */}
    </>
  );
};

export default Home;