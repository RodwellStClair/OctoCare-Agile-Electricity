
import { Link } from "react-router-dom"
import './NavBar.css'
function NavBar() {
  return (
    <div className="nav-bar">
      <div className="octolink">
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
      </div>
      <div className="navlink">
        <Link to="/details"><button className="btn">Current Tariff</button></Link>
        <Link to="/Consumption"><button className="btn">Current Consumption</button></Link>
        <Link to="/"><button className="btn">Logout</button></Link>
      </div>
    </div>
    )
}

export default NavBar
