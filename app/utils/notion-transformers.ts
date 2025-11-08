/**
 * Custom Notion-to-Markdown transformers for specific block types
 */
import type {
  CodeBlockObjectResponse,
  EmbedBlockObjectResponse,
  VideoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { NotionToMarkdown } from "notion-to-md";

export function setupNotionTransformers(n2m: NotionToMarkdown) {
  setupEmbedTransformer(n2m);
  setupCodeTransformer(n2m);
  setupVideoTransformer(n2m);
}

function setupEmbedTransformer(n2m: NotionToMarkdown) {
  n2m.setCustomTransformer("embed", (block) => {
    const { embed } = block as EmbedBlockObjectResponse;
    const url = embed?.url;

    if (url && url.includes("platform.twitter.com")) {
      return `<iframe title="twitter-embed" width="300" height="700" class="mx-auto my-10 aspect-video" src="${url}"></iframe>`;
    }

    return `[${url}](${url})`;
  });
}

function setupCodeTransformer(n2m: NotionToMarkdown) {
  n2m.setCustomTransformer("code", async (block) => {
    const { code } = block as CodeBlockObjectResponse;
    const codeContent = code.rich_text.map((text) => text.plain_text).join("\n");
    const language = code.language || "text";

    const markdownCode = `\`\`\`${language}\n${codeContent}\n\`\`\``;

    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrettyCode, {
        theme: "github-dark",
        keepBackground: false,
        defaultLang: "text",
      })
      .use(rehypeStringify)
      .process(markdownCode);

    return String(file);
  });
}

function setupVideoTransformer(n2m: NotionToMarkdown) {
  n2m.setCustomTransformer("video", async (block) => {
    const { video } = block as VideoBlockObjectResponse;
    if (video.type === "external") {
      const url = video?.external?.url;
      if (url && (url.includes("youtube.com") || url.includes("youtu.be"))) {
        const videoId = extractYoutubeVideoId(url);
        if (videoId) {
          return `<div class="video-container my-6"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full mx-auto rounded-lg shadow-lg"></iframe></div>`;
        }
      }
    }
    const url = video.type !== "external" ? video.file?.url : video.external?.url;
    return url ? `<video controls src="${url}"></video>` : "Video not available";
  });
}

function extractYoutubeVideoId(url: string): string | null {
  try {
    const ytMatch = url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    return ytMatch ? ytMatch[1] : null;
  } catch {
    return null;
  }
}
