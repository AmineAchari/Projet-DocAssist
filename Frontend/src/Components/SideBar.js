import React from "react";
import { Outlet, Link } from "react-router-dom";
import Logout from "../Login/logout/logout";

const SideBar = () => {
  return (
    <>
      <nav>
        <Logout />
        <ul>
          <li>
            <Link to={"/"}>Accueil</Link>
          </li>
          <li>
            <Link to="/Calendrier">Calendrier</Link>
          </li>
          <li>
            <Link to="/Patients">Patients</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default SideBar;
