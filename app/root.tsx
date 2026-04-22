import "./index.css";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "react-router";
import { Header } from "./components/header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" href="/assets/Geist-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//plausible.io" />
        <link rel="dns-prefetch" href="//techashuman.substack.com" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="application/rss+xml" title="Tech as Human" href="/rss.xml" />
        <Meta />
        <Links />
        <script
          defer={true}
          data-domain="techashuman.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className="bg-white dark:bg-zinc-900"
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  return (
    <main>
      {isNavigating && (
        <div className="fixed top-0 left-0 z-50 h-1 w-full animate-pulse bg-primary-500" />
      )}
      <Header />
      <div className="container relative z-40 mx-auto max-w-3xl px-5 py-8 text-zinc-600 md:py-16 lg:max-w-5xl dark:text-white">
        <Outlet />
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-zinc-900">
      <div className="container relative z-40 mx-auto max-w-3xl px-5 py-8 md:py-16 lg:max-w-5xl dark:text-white">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 font-medium text-4xl text-primary-600 dark:text-white">
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
    </div>
  );
}
