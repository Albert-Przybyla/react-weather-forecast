import { SearchDirect } from "./SearchDirect";

const NavBar = () => {
  return (
    <nav className="p-4 bg-gray-800 flex">
      <SearchDirect />
    </nav>
  );
};

export default NavBar;
