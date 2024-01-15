import React from 'react'

function NavBar() {
  return (
    <div className="nav-bar">
    <label className="logo">Select a time period to view</label>
        <button className="current-btn">Current</button>
        <button className="month-btn">1 month ago</button>
        <button className="month3-btn">3 months ago </button>
    </div>)
}

export default NavBar
