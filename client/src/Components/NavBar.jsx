import React from "react"
import { Link } from "react-router-dom"
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
        <Link to="/details"><button className="current-btn">Current</button></Link>
        <Link to="/month"><button className="month-btn">1 month ago</button></Link>
        <Link to="/quarter"><button className="quarter-btn">3 months ago </button> </Link>
        <Link to="/"><button>Logout</button></Link>
      </div>
    </div>
    )
}

export default NavBar
