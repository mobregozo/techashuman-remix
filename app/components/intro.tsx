import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export const Intro = () => {
  return (
    <section>
      <div className="mx-auto mb-20 grid max-w-screen-xl pt-8 text-center md:text-left lg:grid-cols-12 lg:gap-8 lg:py-20 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Tech as Human
          </h1>
          <p className="my-8 max-w-2xl font-light text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
            Written by <span className="font-semibold tracking-wide">Manu</span>{" "}
            - Passionate about the intersection of technology and human
            experience.
          </p>
          <Link
            to="/about"
            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4"
          >
            About me
          </Link>
          <Link
            to="/blog"
            className="group inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Start reading
            <ChevronRight className="ml-2 h-6 w-6 translate-x-0 rotate-0 transform transition-all duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="hidden place-self-end lg:col-span-5 lg:mt-0 lg:flex">
          <img
            src="/assets/home.png"
            alt=""
            className="mt-6 h-auto w-28 md:mt-0 md:w-72"
          />
        </div>
      </div>
    </section>
  );
};
