import { Link } from "react-router";
import { generateTags } from "../../utils/generate-tags";
import { SocialMedia } from "../../components/social-media";
import { ExperienceItem } from "../../components/experience-item";
import { EXPERIENCE } from "../../utils/experiences";
import { DownloadIcon } from "lucide-react";
import { Route } from "./+types/about";

export const meta = ({ data }: Route.MetaArgs) => {
  const { siteUrl } = data;
  const tags = generateTags({ title: "About Me", siteUrl });
  return tags;
};

export const loader = ({ request }: Route.LoaderArgs) => {
  const requestUrl = new URL(request.url);
  const siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return { siteUrl };
};

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
        <div className="mb-8 flex w-full space-x-20 text-gray-700 dark:text-white">
          <div>
            <h2 className="mb-1 text-2xl font-semibold tracking-tight">
              Hola, I&apos;m Manu 👋
            </h2>
            <h2 className="text-primary-500 mb-3 text-xl font-semibold tracking-tight md:text-2xl">
              Product-driven JavaScript engineer
            </h2>
            <div className="space-y-2 dark:text-zinc-400">
              <p className="mb-2">
                I specialize in frontend technologies and have spent over a
                decade immersed in the tech world. From crafting clean,
                intuitive code to navigating the complexities of management,
                I've worn many hats across diverse companies.
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
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover blur-xs transition-all duration-300 hover:scale-120 hover:blur-none"
              sizes="(min-width: 1024px) 32rem, 20rem"
              src="/assets/about.jpeg"
            ></img>
          </div>
        </div>
        <h2 className="text-primary-700 dark:text-secondary-500 mt-16 mb-12 text-3xl font-bold tracking-tighter md:text-4xl">
          Top Skills
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="bg-primary-800 inline-block rounded-full px-3.5 py-2 text-sm font-semibold text-white"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-20 mb-12 items-center justify-between md:flex">
          <h2 className="text-primary-700 dark:text-secondary-500 text-3xl font-bold tracking-tighter md:text-4xl">
            Working Experience
          </h2>
          <button
            className="mt-4 inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 md:mt-0 md:py-3 md:text-base dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            onClick={() => window.open("/assets/resume.pdf", "_blank")}
          >
            <DownloadIcon className="g-4 mr-2 w-4 md:h-6 md:w-6" />
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
