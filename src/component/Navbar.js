import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
  const logout = () => {
    localStorage.removeItem("islogin");
    localStorage.removeItem("admin");
    alert("Logout Suceessfully");
    navigate("/");
  };
  const [menu, setMenu] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">EMS</div>
  <button className="menu-btn" onClick={() => setMenu(!menu)}>
        ☰
      </button>
       <ul className={menu ? "nav-links active-menu" : "nav-links"}>
        <li>
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/employee">Employees</NavLink>
        </li>

        <li>
          <NavLink to="/add">Add Employee</NavLink>
        </li>

      <div className="logout">
        <h3 style={{cursor:"default"}}>{admin}</h3>
        <button onClick={logout} className="logout-btn">
          <IoMdLogOut />
        </button>
      </div>
       </ul>


    </nav>
  );
}

export default Navbar;
