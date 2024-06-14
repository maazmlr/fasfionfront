import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <img src={logo} alt="" className="h-24 w-54" />
            </div>
            <p>Phone: 92 332 8822724</p>
            <p className="mt-4 flex justify-between  text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              <NavLink
                to={
                  "https://www.facebook.com/profile.php?id=61561108675867&mibextid=LQQJ4d"
                }
              >
                <CiFacebook size={30} />
              </NavLink>
              <NavLink to={"https://www.instagram.com/blissfulshopping/?hl=en"}>
                <FaInstagram size={30} />
              </NavLink>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
