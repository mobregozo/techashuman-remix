import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

type ExperienceItemProps = {
  job: {
    companyName: string;
    location: string;
    period: string;
    logo: string;
    projects: {
      role: string;
      description: string[];
      technologies?: string[];
    }[];
  };
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
      className="flex flex-nowrap flex-col md:flex-row mb-16 py-2"
    >
      <div className="mr-auto w-full flex items-stretch space-x-4">
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
