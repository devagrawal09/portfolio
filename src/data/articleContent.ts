import { marked } from "marked";

export interface MarkdownArticleContent {
  frontmatter: Record<string, string | string[]>;
  body: string;
  html: string;
}

const markdownFiles = import.meta.glob("../../content/writing/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function normalizePath(path: string) {
  return path.replace("../../content/", "");
}

function parseScalar(value: string) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseFrontmatter(raw: string): MarkdownArticleContent {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const frontmatter: Record<string, string | string[]> = {};
  const body = match ? match[2].trim() : raw.trim();

  if (match) {
    const lines = match[1].split("\n");

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const scalar = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

      if (!scalar) continue;

      const [, key, value] = scalar;

      if (value.trim()) {
        frontmatter[key] = parseScalar(value);
        continue;
      }

      const list: string[] = [];
      while (lines[i + 1]?.match(/^\s+-\s+/)) {
        i += 1;
        list.push(parseScalar(lines[i].replace(/^\s+-\s+/, "")));
      }
      frontmatter[key] = list;
    }
  }

  return {
    frontmatter,
    body,
    html: marked.parse(body, { async: false }) as string,
  };
}

const parsedContent = new Map(
  Object.entries(markdownFiles).map(([path, raw]) => [normalizePath(path), parseFrontmatter(raw)])
);

export function getMarkdownArticleContent(path: string | undefined) {
  if (!path) return undefined;
  return parsedContent.get(path);
}
