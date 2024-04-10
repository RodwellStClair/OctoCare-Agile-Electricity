import './Login.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setStorage } from "../Utilities/setStorage";

function Login() {
  const navigate = useNavigate();
  const [cred, setcred] = useState(null);


  function submit(event) {
    event.preventDefault();
    const form = document.getElementById("octform");
    const formdata = new FormData(form);
    const NewCRED = {}
    NewCRED.token = formdata.get("AccountAPI") + ":";
    NewCRED.mpan = formdata.get("MeterpointMPAN");
    NewCRED.sn = formdata.get("meterSN");
    NewCRED.demo = false ;
    setcred(NewCRED);
  }
  function handleDemoClick(event) {
    event.preventDefault();
    setStorage({'demo': true,}).then(() => {
        navigate("/details");
      });

    }

  useEffect(() => {
    if (cred) {
      setStorage(cred).then(() => {
        navigate("/details");
      });
    }
  }, );

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://octopus.energy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1><strong>OctoCare</strong>Energy</h1>
        </a>
      </header>

        <form id="octform" className="form_main" onSubmit={submit}>
         <p className="heading">Login</p>
          <input type="text" name="AccountAPI" placeholder="Account API" />
          <input type="text" name="MeterpointMPAN" placeholder="Meterpoint MPAN" />
          <input type="text" name="meterSN" placeholder="Meter Serial Number" />
          <button type="submit" value="submit" className="login-btn">Login</button>
          <button type="submit" onClick={handleDemoClick} className="login-btn">Demo</button>
        </form>

    </div>
  )
}

export default Login
