import { useNavigate  } from "react-router-dom";


function Login({ setCredentials, credentials}) {
const navigate = useNavigate();


async function submit(event){
  event.preventDefault();
  const form = document.getElementById("octform");
  const formdata = new FormData(form);
  const NewCRED ={}
  NewCRED.AccountAPI = formdata.get("AccountAPI");
  NewCRED.MeterpointMPAN = formdata.get("MeterpointMPAN");
  NewCRED.meterSN = formdata.get("meterSN");
  NewCRED.date = formdata.get("date");
  setCredentials(NewCRED);
  navigate("/details");
}

  return (
        <section className="login">
          <form id = "octform" onSubmit={submit}>
            <input type="text" name="AccountAPI" placeholder="Account API" />
            <input type="text" name="MeterpointMPAN" placeholder="Meterpoint MPAN" />
            <input type="text" name="meterSN" placeholder="Meter Serial Number" />
            <input type="date" name="date" placeholder="From Date" />
            <button type="submit" value = "submit">Login</button>
          </form>
        </section>
  )
}

export default Login
