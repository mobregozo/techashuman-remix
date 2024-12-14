import { Link } from "react-router";
import { generateTags } from "../../utils/generate-tags";
import { SocialMedia } from "../../components/social-media";
import { ExperienceItem } from "../../components/experience-item";
import { DownloadIcon, Music } from "lucide-react";
import { Route } from "./+types/about";
import { getJobExperiences } from "@/utils/work-experience.server";

export const meta = ({ data }: Route.MetaArgs) => {
  const { siteUrl } = data;
  const tags = generateTags({ title: "About Me", siteUrl });
  return tags;
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const requestUrl = new URL(request.url);
  const siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  const experiences = await getJobExperiences();

  return { siteUrl, experiences };
};

export default function Index({ loaderData }: Route.ComponentProps) {
  const { experiences } = loaderData;
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
        <div className="mb-12 flex flex-col items-start gap-8 lg:flex-row lg:items-stretch">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border-2 border-zinc-700 pb-4 shadow-md lg:items-center">
            <img
              alt="picture of Manu at the beach"
              loading="lazy"
              className="aspect-square w-80 overflow-hidden bg-zinc-100 object-cover lg:w-2xl"
              src="/assets/about.jpeg"
            />
            <div className="mt-4 flex gap-4 justify-self-end justify-center">
              <SocialMedia />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Hola, I'm Manu 👋</h1>
            <h2 className="text-primary-500 mb-3 text-xl font-semibold tracking-tight md:text-2xl">
              Product-driven JavaScript engineer
            </h2>
            <p className="leading-relaxed">
              I specialize in frontend technologies, mostly{" "}
              <strong>React</strong>, and have spent over a decade immersed in
              the tech world. From crafting code to navigating the complexities
              of management, I've worn many hats across diverse companies and
              personal projects.
            </p>
            <p>
              Yet, after all these years, the excitement of creating something
              impactful never gets old—it&apos;s the kind of thrill that keeps
              me hooked.
            </p>
          </div>
        </div>

        <div className="highlight-white/10 relative z-10 flex gap-4 rounded-xl bg-slate-800 p-4 text-lg ring-2 shadow-xl ring-slate-500">
          <Music aria-hidden="true" className="text-secondary-500 size-12" />
          <p className="text-gray-300">
            I believe our music taste says a lot about us. Explore my collection
            and maybe get a glimpse of the soundtracks that have shaped my
            journey &#8226;{" "}
            <Link
              to="/about/vinyls"
              className="text-secondary-500 hover:underline"
            >
              Check out my vinyl collection.
            </Link>
          </p>
        </div>
        <h2 className="text-primary-700 dark:text-secondary-500 mt-30 mb-12 text-3xl font-bold tracking-tighter md:text-4xl">
          Top Skills
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="bg-primary-800 inline-block rounded-md px-3.5 py-1.5 text-sm font-semibold text-white"
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
          {experiences.map((job, index) => (
            <ExperienceItem key={index} job={job} index={index} />
          ))}
        </div>
      </article>
    </>
  );
}
