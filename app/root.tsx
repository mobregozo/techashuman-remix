import "./index.css";
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
        className="flex h-full w-full flex-col bg-white dark:bg-zinc-900"
      >
        <main>
          <Header />
          <div className="relative z-40 container mx-auto max-w-3xl px-5 py-8 md:py-16 lg:max-w-4xl dark:text-white">
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
