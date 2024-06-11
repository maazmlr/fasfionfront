import { useState } from "react";
import "../../App.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "./Icons.jsx";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa6";
import NavItem from "./Navitem.jsx";
import App from "./Jewllery.jsx";
import Women from "./Women.jsx";
import logo from "../../assets/logo.jpg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <Navbar className="">
      <NavbarBrand>
        <img src={logo} alt="" className="h-16 w-full mr-20" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavItem />
        </NavbarItem>
        <NavbarItem>
          <App />
        </NavbarItem>
        <NavbarItem>
          <Women />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <CiShoppingCart
          size={30}
          color="black"
          onClick={() => navigate("/cart")}
        />
      </NavbarContent>
      <NavbarItem className="lg:hidden">
        <FaGripLines
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          size={30}
          color="black"
        />
      </NavbarItem>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg lg:hidden">
          <div className="flex flex-col p-4">
            <NavbarItem className="w-full">
              <Women />
            </NavbarItem>
            <NavbarItem className="w-full ">
              <App />
            </NavbarItem>
            <NavbarItem className="w-full">
              <NavItem />
            </NavbarItem>
          </div>
        </div>
      )}
    </Navbar>
  );
}
