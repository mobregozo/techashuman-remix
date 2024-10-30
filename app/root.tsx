import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from "./tailwind.css?url";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import Header from "./components/header";
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./sessions.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="grid min-h-full place-items-center bg-slate-50 px-6 py-24 sm:py-32 lg:px-8 dark:bg-zinc-900">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {isRouteErrorResponse(error) ? (
                <>
                  {error.status === 404
                    ? "Sorry, we couldn’t find the page you’re looking for."
                    : `${error.status} ${error.statusText}`}
                </>
              ) : error instanceof Error ? (
                error.message
              ) : (
                "Unknown Error"
              )}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Go back home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
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
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
      </head>
      <body
        suppressHydrationWarning={true}
        className="h-full flex-col flex w-full"
      >
        <Header />
        <div
          id="main-view"
          className="flex-1 z-10 justify-between w-full mx-auto overflow-y-auto bg-white dark:bg-zinc-900"
        >
          <main className="py-8 md:py-16 flex-1">
            <div className="container max-w-3xl lg:max-w-5xl mx-auto px-5 dark:text-white">
              <Outlet />
            </div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
