import './index.css'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { Header } from './components/header'

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          defer
          data-domain="techashuman.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className="flex h-full w-full flex-col bg-white dark:bg-zinc-900"
      >
        <main>
          <Header />
          <div className="container relative z-40 mx-auto max-w-3xl px-5 py-8 md:py-16 lg:max-w-4xl dark:text-white">
            <Outlet />
          </div>
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full w-full flex-col bg-white dark:bg-zinc-900">
        <div className="container relative z-40 mx-auto max-w-3xl px-5 py-8 md:py-16 lg:max-w-4xl dark:text-white">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 font-bold text-4xl text-primary-600 dark:text-white">
              Oops! Something went wrong
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              We're sorry, but an unexpected error has occurred. Our team has
              been notified and is working to fix the issue.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-3 text-center font-medium text-base text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Return to Homepage
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
