import { JobExperience } from "@/utils/work-experience.server";
import { RichText } from "./post-rich-text";

type ExperienceItemProps = {
  job: JobExperience;
  index: number;
};

export const ExperienceItem = ({ job }: ExperienceItemProps) => {
  const technologies = job.technologies
    ? job.technologies.split(",").map((tech) => tech.trim())
    : [];

  return (
    <div
      key={job.period}
      className="flex flex-col flex-nowrap py-2 md:flex-row"
    >
      <div className="mr-auto flex w-full items-stretch space-x-4">
        <svg
          className=" text-secondary-500"
          style={{
            position: "sticky",
            top: "20px",
            width: "10px",
            overflow: "visible",
          }}
        >
          <line
            x1="5"
            y1="31"
            x2="5"
            y2="100%"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="5"
            cy="10"
            r="2"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <div className="flex-1">
          <div className="flex items-start justify-start align-top">
            <div className="flex flex-1 flex-col">
              <div className="mb-2 w-full font-medium text-primary-600 text-xl leading-none dark:text-primary-500">
                {job.role}
              </div>
              <h2 className="mb-2 font-medium text-lg text-zinc-500 leading-none dark:text-zinc-200">
                {job.company}
              </h2>
              <div className=" text-gray-600 text-sm tracking-tight dark:text-zinc-300">
                {job.location}
              </div>
            </div>
            <div className="hidden items-center gap-3 whitespace-nowrap text-sm text-zinc-700 md:flex dark:text-white">
              {job.period}
            </div>
          </div>
          <div className="mt-2 whitespace-nowrap text-primary-700 text-sm md:hidden dark:text-white">
            {job.period}
          </div>
          <div>
            <div key={job.role} className="mt-5">
              <div className="my-2 text-zinc-600 dark:text-zinc-400">
                <RichText block={job.projects} />
              </div>
              {technologies.length ? (
                <div className="mt-3 flex flex-wrap text-gray-600 text-xs dark:text-zinc-300">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="my-1 me-2 rounded-full bg-gray-100 px-2 py-0.5 font-light text-gray-700 text-xs tracking-wider dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
