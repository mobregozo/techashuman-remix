import { RssIcon } from 'lucide-react'
import { NavLink, href } from 'react-router'

export const Header = () => {
  const navLinks = [
    { name: 'HOME', href: href('/') },
    { name: 'ARTICLES', href: href('/blog') },
    { name: 'ABOUT', href: href('/about') },
  ]

  return (
    <nav className="">
      <div className="container mx-auto flex max-w-3xl justify-between px-5 py-8 text-sm lg:max-w-4xl">
        <ul className="flex space-x-8 font-semibold text-white">
          {navLinks.map((link) => (
            <li key={link.name} className="relative overflow-hidden">
              <NavLink
                to={link.href}
                className="group focus-visible:outline-none"
              >
                {({ isActive }) => (
                  <>
                    <span className="mb-1 inline-block transition-transform duration-300 [--clr:currentColor] [text-shadow:0_-1lh_var(--clr)] group-hover:translate-y-[1lh] group-focus-visible:translate-y-[1lh]">
                      {link.name}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 mt-2 h-0.5 w-full bg-gray-200" />
                    )}
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
    </nav>
  )
}
