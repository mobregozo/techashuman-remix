import type { EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext
) {
  const userAgent = request.headers.get("user-agent");

  // Detect if the request is from a bot/crawler
  const isBot = userAgent ? isbot(userAgent) : false;

  const body = await renderToReadableStream(
    <ServerRouter context={entryContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  // For bots, wait for the entire stream to complete for better SEO
  if (isBot) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
