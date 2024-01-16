import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getformdata } from '../Redux/Formstate'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submit(event) {
    event.preventDefault();
    const form = document.getElementById("octform");
    const formdata = new FormData(form);
    const NewCRED = {}
    NewCRED.AccountAPI = formdata.get("AccountAPI");
    NewCRED.mpan = formdata.get("MeterpointMPAN");
    NewCRED.sn = formdata.get("meterSN");
    dispatch(getformdata(NewCRED))
    navigate("/details");
  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://octopus.energy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1><strong>Octopus</strong>Energy</h1>
        </a>
      </header>
      <section className="login">
        <form id="octform" onSubmit={submit}>
          <input type="text" name="AccountAPI" placeholder="Account API" />
          <input type="text" name="MeterpointMPAN" placeholder="Meterpoint MPAN" />
          <input type="text" name="meterSN" placeholder="Meter Serial Number" />
          <button type="submit" value="submit">Login</button>
        </form>
      </section>
    </div>
  )
}

export default Login
