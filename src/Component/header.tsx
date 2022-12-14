import logo from "./../assets/images/atharva-brand-logo-dark.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../Services/LocalStorageService";
import { useNavigate, Link } from "react-router-dom";
import { removeToken } from "../Services/LocalStorageService";
import { ToastContainer, toast } from "react-toastify";
import Dropdawn from "../shared/dropdawn";
import Changepassword from "./Changepassword";

function Header(props: any) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const usertoken = useSelector((state: any) => state.counter.value);
  const [tokens, settoken] = useState<any>(getToken());
  const [isMenuOpen, setIsMenuOpen] = useState<any>(false);
  const token = usertoken || tokens;
  const navigate = useNavigate();

  const logout = () => {
    setIsMenuOpen(false)
    removeToken("token");
    toast.success("Logout Success!");
    navigate("/");
    window.location.reload()
  };

  return (
    <>
      <nav
        className={
          (props.transparent
            ? "top-0 absolute z-50 w-full"
            : "relative  bg-white shadow-lg") +
          " flex flex-wrap items-center justify-between px-2 py-3 "
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              href="/"
              className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              }
            >
              <img src={logo} alt="Atharva System" />
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-white" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>

          {token ? (
            <div
              className={
                "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
                (navbarOpen ? " block rounded shadow-lg" : "")
              }
              id="example-navbar-warning"
            >
              <ul className="flex flex-col lg:flex-row list-none mr-auto">
                <li className="flex items-center">
                  <a
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="/candidate-table"
                  >
                    Candidate
                  </a>
                </li>
                <li>
                  <a
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="/question-table"
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") + "text-lg leading-lg mr-2"
                      }
                    />
                    Question
                  </a>
                </li>
              </ul>

              <div className="inline-flex bg-white border rounded-md">
                <span
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
                >
                  Profile
                </span>

                <div className="relative">
                  {isMenuOpen && (
                    <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                      <div className="p-2">
                        <span
                          onClick={logout}
                          className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                        >
                          Logout
                        </span>
                        <Link
                          to="/change-password"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                        >
                          Change Password
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
}
export default Header;
