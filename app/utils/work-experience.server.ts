import { Client } from '@notionhq/client'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export type JobExperience = {
  company: string
  period: string
  projects: Array<RichTextItemResponse>
  role: string
  technologies: string
  location: string
  number: number
}

// Function to get job experiences from Notion
export async function getJobExperiences(): Promise<JobExperience[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_EXPERIENCE as string,
    sorts: [
      {
        property: 'number',
        direction: 'descending',
      },
    ],
  })

  return response.results.map((page: any) => {
    return {
      number: page.properties.number.number,
      company: page.properties.company.rich_text[0]?.text.content || '',
      period: page.properties.period.rich_text[0]?.text.content || '',
      projects: page.properties.projects.rich_text,
      role: page.properties.role.rich_text[0]?.text.content || '',
      technologies:
        page.properties.technologies.rich_text[0]?.text.content || '',
      location: page.properties.location.rich_text[0]?.text.content || '',
    }
  })
}
