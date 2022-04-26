import "./App.css";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useState } from "react";

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const [userData, setUserData] = useState(null);
  let backendURI;

  if (process.env.NODE_ENV === "development") {
    backendURI = "http://localhost:8080";
  } else {
    backendURI = "https://google-authreact.herokuapp.com";
  }

  const handleLogin = async (googleData) => {
    const fetchData = () => {
      const response = axios.post(`${backendURI}/data`, googleData);
      return response;
    };
    const data = await fetchData();
    if (data.data.status === "success") {
      setUserData(data.data.data);
    }
  };

  const handleFailure = (result) => {
    console.log(result);
  };

  const handleLogout = () => {
    setUserData(null);
  };

  const showHandler = async () => {
    const fetchData = () => {
      const response = axios.get(`${backendURI}/show`);
      return response;
    };
    const data = await fetchData();
    if (data.data.status === "success") {
      alert(data.data.data);
    }
  };

  return (
    <div className="App">
      <h1>Google login</h1>
      {userData !== null ? (
        <>
          <p>Welcome, {userData.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={showHandler}>Show</button>
        </>
      ) : (
        <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </div>
      )}
    </div>
  );
}

export default App;
