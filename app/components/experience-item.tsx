import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { RichText } from "./post-rich-text";
import { JobExperience } from "@/utils/work-experience.server";
import { Calendar } from "lucide-react";

type ExperienceItemProps = {
  job: JobExperience;
  index: number;
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const ExperienceItem = ({ job, index }: ExperienceItemProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      key={job.period}
      ref={ref}
      custom={index}
      className="mb-16 flex flex-col flex-nowrap py-2 md:flex-row"
    >
      <div className="mr-auto flex w-full items-stretch space-x-4">
        <svg
          className="text-primary-600 dark:text-secondary-500"
          style={{
            position: "sticky",
            top: "20px",
            width: "10px",
            overflow: "visible",
          }}
        >
          <motion.line
            x1="5"
            y1="0"
            x2="5"
            y2="100%"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              pathLength: progress,
            }}
            viewport={{ once: true }}
          />
        </svg>
        <div className="flex-1">
          <div className="flex items-stretch justify-start align-top">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 shadow-md shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <img
                alt={job.company}
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                data-nimg="1"
                className="h-8 w-8 rounded-full object-cover"
                src={`/assets/companies/${job.company.toLowerCase()}.webp`}
                style={{ color: "transparent" }}
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <h2 className="mb-1.5 text-xl leading-none font-bold text-gray-700 dark:text-white">
                {job.company}
              </h2>
              <div className="text-sm text-gray-600 dark:text-zinc-400">
                {job.location}
              </div>
            </div>
            <div className="text-primary-700 hidden text-sm whitespace-nowrap dark:text-white md:flex items-center gap-3">
              <Calendar className="size-4" />
              {job.period}
            </div>
          </div>
          <div className="text-primary-700 mt-2 text-sm whitespace-nowrap md:hidden dark:text-white">
            {job.period}
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <div key={job.role} className="mt-5">
              <div className="text-secondary-700 dark:text-primary-500 mb-1 w-full text-lg font-semibold">
                {job.role}
              </div>
              <div className="my-2 text-sm text-zinc-600 dark:text-zinc-400">
                <RichText block={job.projects} />
              </div>
              {job.technologies ? (
                <div className="mt-3 flex flex-wrap text-sm text-gray-700 dark:text-white">
                  {job.technologies.split(",").map((tech) => (
                    <span
                      key={tech}
                      className="my-1 me-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
