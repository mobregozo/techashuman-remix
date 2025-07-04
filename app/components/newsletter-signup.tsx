import React from 'react'

export function NewsletterSignup() {
  return (
    <div className="mt-8 rounded-lg bg-primary-50 p-6 dark:bg-primary-900/20">
      <h3 className="mb-2 font-semibold text-lg">Get posts in your inbox</h3>
      <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
        Subscribe to my Substack newsletter for the latest posts and updates.
      </p>
      <a
        href="https://techashuman.substack.com"
        className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        Subscribe on Substack
      </a>
    </div>
  )
}
