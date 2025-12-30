import AboutImage from "@/assets/about.jpeg?w=80;200;400&format=webp;avif&as=picture";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  HOME_OG_IMAGE_URL,
  MAIN_URL,
  TWITTER_ID,
  TWITTER_USER,
} from "@/utils/constants";
import { getJobExperiences } from "@/utils/work-experience.server";
import { DownloadIcon, Music } from "lucide-react";
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

      <h1 className="mb-24 font-medium text-4xl text-primary-700 tracking-tight md:text-6xl dark:text-white">
        About
      </h1>
      <div className="mb-12 flex flex-col items-start gap-8 lg:flex-row lg:items-stretch">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border-2 border-zinc-700 pb-4 shadow-md lg:items-center">
          <OptimizedImage
            alt="picture of Manu at the beach"
            className="aspect-square w-80 overflow-hidden bg-zinc-100 object-cover lg:w-2xl"
            image={AboutImage}
          />
          <div className="mt-4 flex justify-center gap-4 justify-self-end">
            <SocialMedia />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-3xl">Hola, I'm Manu 👋</h1>
          <h2 className="mb-3 font-semibold text-primary-600 text-xl tracking-tight md:text-2xl dark:text-primary-500">
            Product-driven JavaScript engineer
          </h2>
          <p className="leading-relaxed">
            I specialize in frontend technologies, mostly <strong>React</strong>
            , and have spent over a decade immersed in the tech world.
          </p>
          <p className="leading-relaxed">
            From crafting code to navigating the complexities of management,
            I've worn many hats across diverse companies and personal projects.
          </p>
        </div>
      </div>
      <div className="mt-20 mb-12 items-center justify-between md:flex">
        <h2 className="font-bold text-3xl text-primary-600 tracking-tighter md:text-4xl dark:text-secondary-500">
          Working Experience
        </h2>
        <button
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2 text-center font-medium text-sm text-zinc-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 md:mt-0 md:py-3 md:text-base dark:border-gray-700 dark:text-gray-900 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700"
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
