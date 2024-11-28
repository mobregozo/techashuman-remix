import { SocialMedia } from "app/components/social-media";
import { generateTags } from "app/utils/generate-tags";
import { ExperienceItem } from "app/components/experience-item";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { EXPERIENCE } from "app/utils/experiences";

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
            <h2 className="mb-1 font-bold text-2xl tracking-tighter">
              Hola, I'm Manu 👋
            </h2>
            <h2 className="mb-3 font-bold tracking-tighter text-xl md:text-2xl text-primary-500">
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
                and creating something impactful never gets old—it's the kind of
                thrill that keeps me hooked.
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

        <h2 className="text-primary-700 text-3xl md:text-4xl mt-32 mb-12 font-bold dark:text-secondary-500 tracking-tighter">
          Working Experience
        </h2>
        <div>
          {EXPERIENCE.map((job, index) => (
            <ExperienceItem key={index} job={job} index={index} />
          ))}
        </div>
      </article>
    </>
  );
}
