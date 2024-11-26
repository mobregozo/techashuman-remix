import type { MetaFunction } from "@remix-run/node";
import { SocialMedia } from "../components/social-media";
import { EXPERIENCE } from "../utilities/experiences";
import { generateTags } from "../utilities/generate-tags";
import { Link } from "@remix-run/react";
import { ExperienceItem } from "../components/experience-item";

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
              <p className="mb-2">
                This blog idea popped up during a chat with my therapist about
                overthinking. I started turning those thoughts into articles,
                and being a web dev, bingo, it became a blog.
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
