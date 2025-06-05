// Direct server-rendered route for LLMs.txt
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function loader() {
  const llmsFilePath = join(process.cwd(), 'public', 'llms.txt')
  const content = readFileSync(llmsFilePath, 'utf-8')

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=600, s-maxage=86400',
      'x-content-type-options': 'nosniff',
    },
  })
}
