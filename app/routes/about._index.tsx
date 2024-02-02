import type { MetaFunction } from "@remix-run/node";
import { Loader } from "~/components/loader";
import { experience } from "~/utilities/experiences";
import { generateTags } from "~/utilities/generate-tags";

export const meta: MetaFunction = () => {
  const tags = generateTags("About");
  return tags;
};

export default function Index() {
  return (
    <>
      <Loader />
      <article>
        <h1 className="text-primary-700 text-4xl md:text-6xl mb-8 font-semibold dark:text-white tracking-tighter">
          About
        </h1>
        <div className="mb-8 text-gray-700 dark:text-white">
          <p className="mb-2 font-semibold text-2xl tracking-tighter">
            Hola, I’m Manu 👋
          </p>
          <div>
            <p className="mb-2">
              I've been in the tech game for over a decade, working with
              different sorts of companies and wearing many hats. From coding to
              managing, I still love the thrill of it.
            </p>
            <p className="mb-2">
              Now, my main gig is taking products to the next level and diving
              into the management world, bridging the gap between product and
              engineering.
            </p>
          </div>
        </div>
        <div>
          <div className="mt-10 flex items-center">
            <a
              target="blank"
              className="mr-4 bg-gray-600 w-10 h-10 p-2 rounded-full hover:scale-110 transform duration-300 hover:opacity-50"
              href="https://www.linkedin.com/in/manuelobregozo/?locale=en_US"
            >
              <span className="hidden">linkedin</span>
              <img
                width="24"
                height="24"
                src="/assets/logo-linkedin.svg"
                alt="linkedin"
              />
            </a>
            <a
              target="blank"
              className="mr-4 bg-gray-600 w-10 h-10 p-2 rounded-full hover:scale-110 transform duration-300 hover:opacity-50"
              href="https://techashuman.substack.com/"
            >
              <span className="hidden">substack</span>
              <img
                width="18"
                height="18"
                className="mx-auto mt-0.5 h-5 w-5"
                src="/assets/logo-substack.svg"
                alt="substack"
              />
            </a>
            <a
              target="blank"
              className="mr-4 bg-gray-600 w-10 h-10 p-2 rounded-full hover:scale-110 transform duration-300 hover:opacity-50"
              href="https://github.com/mobregozo"
            >
              <span className="hidden">github</span>
              <img
                width="24"
                height="24"
                src="/assets/logo-github.svg"
                alt="github"
              />
            </a>
            <a
              target="blank"
              className="mr-4 bg-gray-600 w-10 h-10 p-2 rounded-full hover:scale-110 transform duration-300 hover:opacity-50"
              href="https://dev.to/manuelobre"
            >
              <span className="hidden">dev.to profile</span>
              <img
                width="24"
                height="24"
                src="/assets/logo-devto.svg"
                alt="stackoverflow"
              />
            </a>
            <a
              target="blank"
              className="mr-4 bg-gray-600 w-10 h-10 p-2 rounded-full hover:scale-110 transform duration-300 hover:opacity-50"
              href="https://stackoverflow.com/users/6098430/manuel-obregozo"
            >
              <span className="hidden">stackoverflow</span>
              <img
                width="24"
                height="24"
                src="/assets/logo-stackoverflow.svg"
                alt="stackoverflow"
              />
            </a>
            <a
              target="blank"
              className="mr-4 bg-gray-600 w-10 h-10 p-2 rounded-full hover:scale-110 transform duration-300 hover:opacity-50"
              href="https://www.goodreads.com/user/show/149343642-manu-obre"
            >
              <span className="hidden">goodreads</span>
              <img
                width="24"
                height="24"
                src="/assets/logo-goodreads.svg"
                alt="goodreads"
              />
            </a>
            <a
              target="blank"
              className="mr-4 bg-gray-600 w-10 h-10 p-2 rounded-full hover:scale-110 transform duration-300 hover:opacity-50"
              href="/rss.xml"
            >
              <span className="hidden">rss</span>
              <img
                width="24"
                height="24"
                src="/assets/logo-rss.svg"
                alt="rss"
              />
            </a>
          </div>
        </div>
        <h2 className="text-primary-700 text-xl md:text-5xl mt-16 mb-8 font-semibold dark:text-secondary-500 tracking-tighter">
          Working Experience
        </h2>
        {experience.map((job) => (
          <div
            key={job.period}
            className="flex flex-nowrap flex-col md:flex-row border-solid border-t border-gray-200 dark:border-gray-700 pt-10 pb-6"
          >
            <div className="mr-auto">
              <div className="flex items-stretch mb-6">
                <img
                  alt={job.companyName}
                  src={`/assets/${job.logo}`}
                  width="64"
                  height="64"
                  className="w-16 h-16 rounded-md"
                />
                <div className="ml-4 flex flex-col justify-between">
                  <h2 className="font-bold text-gray-700 text-xl dark:text-white leading-none">
                    {job.companyName}
                  </h2>
                  <div className="text-primary-700 text-sm font-bold whitespace-nowrap dark:text-white leading-4 my-1">
                    {job.period}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 leading-4 text-sm">
                    {job.location}
                  </div>
                </div>
              </div>
              {/* <div className="text-gray-700 dark:text-gray-200 mt-2">
                {job.description}
              </div> */}
              {job.projects.map((project) => (
                <div key={project.description} className="mb-8">
                  <div className="w-full text-xl text-secondary-700 font-semibold dark:text-white mb-1">
                    {project.role}
                  </div>
                  {project.period && (
                    <div className="mb-2 flex items-center text-sm text-gray-600 dark:text-gray-500 dark:font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span className="ml-1">{project.period}</span>
                    </div>
                  )}
                  <div className="text-gray-700 break-words dark:text-gray-300 whitespace-pre-line text-sm mb-4">
                    <p>{project.description}</p>
                  </div>
                  {project.technologies ? (
                    <div className="mt-2 text-gray-700 dark:text-white text-sm">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-sm font-medium mr-2 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </article>
    </>
  );
}
