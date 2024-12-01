import "./index.css?transform-only";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import Header from "./components/header";

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
        className="h-full flex-col flex w-full bg-white dark:bg-zinc-900"
      >
        <main>
          <Header />
          <div className="container py-8 md:py-16 max-w-4xl mx-auto px-5 dark:text-white relative z-40">
            <Outlet />
          </div>
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}
