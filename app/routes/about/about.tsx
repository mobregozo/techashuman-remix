import AboutImage from "@/assets/about.jpeg?w=80;200;400&format=webp;avif&as=picture";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  HOME_OG_IMAGE_URL,
  MAIN_URL,
  TWITTER_ID,
  TWITTER_USER,
} from "@/utils/constants";
import { getJobExperiences } from "@/utils/work-experience.server";
import { DownloadIcon } from "lucide-react";
import { ExperienceItem } from "../../components/experience-item";
import { SocialMedia } from "../../components/social-media";
import { Route } from "./+types/about";

export const meta = () => {
  const canonicalUrl = `${MAIN_URL}/about`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manuel Obregozo",
    url: canonicalUrl,
    description:
      "Product-driven JavaScript engineer. I specialize in frontend technologies, mostly React, and have spent over a decade immersed in the tech world.",
    jobTitle: "JavaScript Engineer",
    knowsAbout: [
      "React",
      "Frontend Development",
      "JavaScript",
      "Web Development",
    ],
  };

  return [
    {
      "script:ld+json": structuredData,
    },
  ];
};

export const loader = async () => {
  const experiences = await getJobExperiences();

  return { experiences };
};

export default function Index({ loaderData }: Route.ComponentProps) {
  const { experiences } = loaderData;
  const title = "About Me | TechAsHuman";
  const description =
    "Product-driven JavaScript engineer specializing in frontend technologies. Over a decade of experience in the tech world.";
  const canonicalUrl = `${MAIN_URL}/about`;
  const image = HOME_OG_IMAGE_URL;
  return (
    <article>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Tech as Human" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TWITTER_USER} />
      <meta name="twitter:site" content={TWITTER_USER} />
      <meta name="twitter:creator:id" content={TWITTER_ID} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Other */}
      <meta name="author" content="Manuel Obregozo" />
      <link rel="canonical" href={canonicalUrl} />
      <div className="mt-28 mb-36">
        <div className="mb-12">
          <div className="mb-8 ">
            <h1 className="font-medium text-6xl">Hola, I'm Manu</h1>
            <h2 className="mt-1 text-2xl text-primary-600 tracking-tight md:text-2xl dark:text-primary-500">
              Product-driven JavaScript engineer
            </h2>
          </div>
          <div className="max-w-2xl space-y-1 text-gray-500 text-lg leading-relaxed dark:text-gray-300">
            <p className="">
              I build frontend platforms and I've spent a decade shipping on the
              web.
            </p>
            <p>
              From hands-on coding to product leadership, I've worn many hats
              across teams and projects.
            </p>
          </div>
        </div>
        <SocialMedia />
      </div>
      <div className="mt-12 border-gray-700/50 border-t" />

      <div className="mt-20 mb-12 items-center justify-between md:flex">
        <h2 className="font-medium text-3xl text-primary-600 tracking-tighter md:text-5xl dark:text-secondary-500">
          Working Experience
        </h2>
        <button
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2 text-center font-medium text-sm text-zinc-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 md:mt-0 md:py-3 md:text-base dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700"
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
  );
}
