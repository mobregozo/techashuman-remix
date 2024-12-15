import { NavLink } from "react-router";
import { Loader } from "./loader";
import { RssIcon } from "lucide-react";

const Header = () => {
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ARTICLES", href: "/blog" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <nav className="bg-primary-700 dark:bg-primary-900 sticky top-0 z-50">
      <div className="container mx-auto flex max-w-3xl justify-between px-5 py-3 text-sm lg:max-w-4xl">
        <ul className="flex space-x-8 font-semibold text-white">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <NavLink to={link.href} className="group">
                {({ isActive }) => (
                  <>
                    <div className="mb-1">{link.name}</div>
                    <span
                      className={`absolute bottom-0 left-0 mt-2 h-0.5 w-full scale-x-0 transform bg-gray-200 transition-transform duration-300 group-hover:scale-x-100 ${
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
            <RssIcon
              className="size-6 text-white"
              aria-label="get the rss xml file of the website"
            />
          </a>
        </button>
      </div>
      <Loader />
    </nav>
  );
};

export default Header;
