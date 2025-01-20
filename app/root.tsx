import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import ErrorBoundary from "./components/Utils/ErrorBoundary";

const brandName = process.env.BRAND_NAME || "NotTitle";

export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { title: brandName },
  { viewport: "width=device-width,initial-scale=1" },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swaphttps://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <ErrorBoundary error={error} />;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <Scripts />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
