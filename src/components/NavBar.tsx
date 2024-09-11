import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchDirect } from "./SearchDirect";

const NavBar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex">
      <ul className="flex space-x-4">
        <li>
          <Link to="/">
            <Button variant="outline">Home</Button>
          </Link>
        </li>
        <li>
          <Link to="/map">
            <Button variant="outline">Map</Button>
          </Link>
        </li>
      </ul>
      <div className="grow"></div>
      <div>
        <SearchDirect />
      </div>
    </nav>
  );
};

export default NavBar;
