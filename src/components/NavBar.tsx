import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
        </li>
        <li>
          <Link to="/map">
            <Button variant="ghost">Map</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
