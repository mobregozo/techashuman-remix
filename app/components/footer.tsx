import { SocialMedia } from './social-media'

export const Footer = () => {
  return (
    <div className="rounded-lg border border-gray-400 p-8 text-gray-600 dark:text-gray-300">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold tracking-wider dark:text-gray-200">
            Written by Manu
          </h2>
          <p className="prostext-sm">
            I am a product-driven JavaScript developer, passionate about sharing
            experiences in the IT world, from a human-centric perspective.
          </p>
        </div>
        <div className="mt-6 lg:mt-0">
          <h2 className="mb-4 text-xl font-semibold tracking-wider dark:text-gray-200">
            Follow Me
          </h2>
          <div className="flex gap-4">
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  )
}
