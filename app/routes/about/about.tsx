import { Link } from "react-router";
import { generateTags } from "../../utils/generate-tags";
import { SocialMedia } from "../../components/social-media";
import { ExperienceItem } from "../../components/experience-item";
import { EXPERIENCE } from "../../utils/experiences";
import { DownloadIcon } from "lucide-react";
import { Route } from "./+types/about";

export const meta = ({data}: Route.MetaArgs ) => {
  const { siteUrl } = data;
  const tags = generateTags({title: "About Me", siteUrl});
  return tags;
};

export const loader = ({request}: Route.LoaderArgs) => {
  const requestUrl = new URL(request.url);
  const siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return { siteUrl };
}


export default function Index() {
  const topSkills = [
    "JavaScript",
    "TypeScript",
    "React, Remix & Next",
    "Product Management",
  ];
  return (
    <>
      <article>
        <h1 className="text-primary-700 mb-24 text-4xl font-medium tracking-tight md:text-6xl dark:text-white">
          About
        </h1>
        <div className="mb-8 text-gray-700 dark:text-white flex space-x-20 w-full">
          <div>
            <h2 className="mb-1 font-semibold text-2xl tracking-tight">
              Hola, I&apos;m Manu 👋
            </h2>
            <h2 className="mb-3 font-semibold tracking-tight text-xl md:text-2xl text-primary-500">
              Product-driven JavaScript engineer
            </h2>
            <div className="dark:text-zinc-400 space-y-2">
              <p className="mb-2">
                I specialize in frontend technologies and have spent over a
                decade immersed in the tech world. From crafting clean,
                intuitive code to navigating the complexities of management,
                I’ve worn many hats across diverse companies.
              </p>
              <p>
                Yet, after all these years, the excitement of solving problems
                and creating something impactful never gets old—it&apos;s the
                kind of thrill that keeps me hooked.
              </p>
              <p>
                This website is an open source project, in case you are
                interested,{" "}
                <Link
                  to="/about/blog"
                  className="text-secondary-500 hover:underline"
                >
                  here
                </Link>{" "}
                is more information about it.{" "}
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
              className="aspect-square bg-zinc-100 dark:bg-zinc-800 object-cover rotate-3 rounded-2xl transition-transform duration-300 hover:scale-105 hover:opacity-80 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500"
              sizes="(min-width: 1024px) 32rem, 20rem"
              src="/assets/about.jpeg"
            ></img>
          </div>
        </div>
        <h2 className="text-primary-700 text-3xl md:text-4xl mt-16 mb-12 font-bold dark:text-secondary-500 tracking-tighter">
          Top Skills
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="inline-block bg-primary-800 text-white text-sm font-semibold px-3.5 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="md:flex items-center justify-between mt-20 mb-12">
          <h2 className="text-primary-700 text-3xl md:text-4xl font-bold dark:text-secondary-500 tracking-tighter">
            Working Experience
          </h2>
          <button
            className="mt-4 md:mt-0 inline-flex items-center justify-center px-5 py-2 md:py-3 text-sm md:text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            onClick={() => window.open("/assets/resume.pdf", "_blank")}
          >
            <DownloadIcon className="w-4 g-4 md:w-6 md:h-6 mr-2" />
            Download Resume
          </button>
        </div>

        <div>
          {EXPERIENCE.map((job, index) => (
            <ExperienceItem key={index} job={job} index={index} />
          ))}
        </div>
      </article>
    </>
  );
}
