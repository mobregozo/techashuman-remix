import { NavLink } from "react-router";
import { Loader } from "./loader";

const Header = () => {
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ARTICLES", href: "/blog" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <nav className="bg-primary-700 dark:bg-primary-900 sticky top-0 z-50">
      <div className="container text-sm justify-between flex py-3 max-w-3xl lg:max-w-4xl mx-auto px-5">
        <ul className="flex space-x-8 font-semibold text-white">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <NavLink to={link.href} className="group">
                {({ isActive }) => (
                  <>
                    <div className="mb-1">{link.name}</div>
                    <span
                      className={`absolute group-hover:scale-x-100 mt-2 bottom-0 left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 transition-transform duration-300 ${
                        isActive ? "scale-x-100" : ""
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <button className="hover:opacity-60">
          <a href="/rss.xml">
            <img className="h-5 w-5" alt="rss" src="/assets/logo-rss.svg" />
          </a>
        </button>
      </div>
      <Loader />
    </nav>
  );
};

export default Header;
