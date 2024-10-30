import type { MetaFunction } from "@remix-run/node";
import { SocialMedia } from "../components/social-media";
import { EXPERIENCE } from "../utilities/experiences";
import { generateTags } from "../utilities/generate-tags";

export const meta: MetaFunction = () => {
  const tags = generateTags("About");
  return tags;
};
export default function Index() {
  return (
    <>
      <article>
        <h1 className="text-primary-700 text-4xl md:text-6xl mb-8 font-semibold dark:text-white tracking-tighter">
          About
        </h1>
        <div className="mb-8 text-gray-700 dark:text-white flex space-x-20 w-full">
          <div>
            <p className="mb-4 font-bold text-2xl tracking-tighter">
              Hola, I’m Manu 👋
            </p>
            <div className="dark:text-zinc-400">
              <p className="mb-2">I am product-driven JavaScript engineer.</p>
              <p className="mb-2">
                I've been in the tech game for over a decade, working with
                different sorts of companies and wearing many hats. From coding
                to managing, I still enjoy the thrill of it.
              </p>
              <p>
                This blog idea popped up during a chat with my therapist about
                overthinking. I started turning those thoughts into articles,
                and being a web dev, bingo, it became a blog.
              </p>
            </div>
            <div className="mt-12">
              <SocialMedia />
            </div>
          </div>
          <div className="hidden md:block md:w-[600px]">
            <img
              alt=""
              loading="lazy"
              width="800"
              height="800"
              decoding="async"
              data-nimg="1"
              className="aspect-square bg-zinc-100 dark:bg-zinc-800 object-cover rotate-3 rounded-2xl"
              sizes="(min-width: 1024px) 32rem, 20rem"
              src="/assets/about.jpeg"
            ></img>
          </div>
        </div>
        <h2 className="text-primary-700 text-3xl md:text-4xl mt-32 mb-12 font-bold dark:text-secondary-500 tracking-tighter">
          Working Experience
        </h2>
        <div>
          {EXPERIENCE.map((job) => (
            <div
              key={job.period}
              className="flex flex-nowrap flex-col md:flex-row mb-16 py-2 md:border-l md:border-zinc-200 md:pl-6 md:dark:border-zinc-700/40"
            >
              <div className="mr-auto w-full">
                <div className="flex items-stretch align-top justify-start">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    <img
                      alt={job.companyName}
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      className="h-8 w-8 rounded-full object-cover"
                      src={`/assets/${job.logo}`}
                      style={{ color: "transparent" }}
                    />
                  </div>
                  <div className="ml-4 flex flex-col flex-1">
                    <h2 className="font-bold text-gray-700 text-xl dark:text-white leading-none mb-1.5">
                      {job.companyName}
                    </h2>
                    <div className="text-gray-600 dark:text-zinc-400 text-sm">
                      {job.location}
                    </div>
                  </div>
                  <div className="hidden md:block text-primary-700 text-sm whitespace-nowrap dark:text-white">
                    {job.period}
                  </div>
                </div>
                <div className="md:hidden mt-2 text-primary-700 text-sm whitespace-nowrap dark:text-white">
                    {job.period}
                  </div>
                {job.projects.map((project) => (
                  <div key={project.role} className="mt-5">
                    <div className="w-full text-lg text-secondary-700 font-semibold dark:text-primary-500 mb-1">
                      {project.role}
                    </div>
                    <div className="my-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <ul className="list-none list-inside">
                        {project.description.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    {project.technologies ? (
                      <div className="mt-3 text-gray-700 dark:text-white text-sm flex flex-wrap">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-gray-100 text-gray-800 text-xs font-medium my-1 me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
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
        </div>
      </article>
    </>
  );
}
