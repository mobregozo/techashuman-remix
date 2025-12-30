import { JobExperience } from '@/utils/work-experience.server'
import { Calendar } from 'lucide-react'
import { RichText } from './post-rich-text'

type ExperienceItemProps = {
  job: JobExperience
  index: number
}

export const ExperienceItem = ({ job }: ExperienceItemProps) => {
  return (
    <div
      key={job.period}
      className="flex flex-col flex-nowrap py-2 md:flex-row"
    >
      <div className="mr-auto flex w-full items-stretch space-x-4">
        <svg
          className="text-primary-600 dark:text-secondary-500"
          style={{
            position: 'sticky',
            top: '20px',
            width: '10px',
            overflow: 'visible',
          }}
        >
          <line
            x1="5"
            y1="0"
            x2="5"
            y2="100%"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex-1">
          <div className="flex items-stretch justify-start align-top">
            <div className="flex flex-1 flex-col">
              <h2 className="mb-1.5 font-bold text-gray-700 text-xl leading-none dark:text-white">
                {job.company}
              </h2>
              <div className="mb-1 w-full font-medium text-lg text-secondary-600 dark:text-primary-500">
                {job.role}
              </div>
              <div className="text-gray-600 text-sm dark:text-zinc-400">
                {job.location}
              </div>
            </div>
            <div className="hidden gap-3 whitespace-nowrap text-primary-700 text-sm md:flex dark:text-white">
              <Calendar className="size-4" />
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
              {job.technologies ? (
                <div className="mt-3 flex flex-wrap text-gray-700 text-sm dark:text-white">
                  {job.technologies.split(',').map((tech) => (
                    <span
                      key={tech}
                      className="my-1 me-2 rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-800 text-xs dark:bg-gray-700 dark:text-gray-300"
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
  )
}
