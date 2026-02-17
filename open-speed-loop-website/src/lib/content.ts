import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import type { Root } from "mdast";

export interface CaseStudyMeta {
  title: string;
  loop: number;
  status: "approved" | "rejected" | "in-progress" | "skipped";
  improvement: string;
  baseline_ms: number;
  result_ms: number | null;
  date: string;
  tags: string[];
  slug: string;
}

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface FlowData {
  before: {
    nodes: FlowNode[];
    edges: FlowEdge[];
  };
  after: {
    nodes: FlowNode[];
    edges: FlowEdge[];
  };
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    duration?: string;
    highlight?: boolean;
    removed?: boolean;
    added?: boolean;
    error?: boolean;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  animated: boolean;
  sourceHandle?: string;
  targetHandle?: string;
}

const CASE_STUDIES_DIR = path.join(
  process.cwd(),
  "content",
  "case-studies"
);

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

function extractHeadings(tree: Root): TocEntry[] {
  const headings: TocEntry[] = [];
  for (const node of tree.children) {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      const text = node.children
        .filter((c) => c.type === "text" || c.type === "inlineCode")
        .map((c) => ("value" in c ? c.value : ""))
        .join("");
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text, level: node.depth });
    }
  }
  return headings;
}

async function renderMarkdown(
  content: string
): Promise<{ html: string; toc: TocEntry[] }> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm);

  const tree = processor.parse(content);
  const mdast = await processor.run(tree);
  const toc = extractHeadings(mdast as Root);

  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return { html: String(html), toc };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  const files = fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.startsWith("loop-") && f.endsWith(".md"))
    .sort();

  return files.map((filename) => {
    const filePath = path.join(CASE_STUDIES_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const slug = filename.replace(".md", "");
    return {
      title: data.title,
      loop: Number(data.loop),
      status: data.status,
      improvement: data.improvement,
      baseline_ms: Number(data.baseline_ms),
      result_ms: data.result_ms != null ? Number(data.result_ms) : null,
      date: data.date,
      tags: data.tags || [],
      slug,
    } as CaseStudyMeta;
  });
}

export async function getCaseStudy(slug: string) {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Strip the H1 title since we render it separately
  const bodyContent = content.replace(/^#\s+.+\n/, "").trim();
  // Strip the Status/Improvement lines since we render them in the header
  const cleanContent = bodyContent
    .replace(/^\*\*Status:\*\*.+\n/m, "")
    .replace(/^\*\*Improvement:\*\*.+\n/m, "")
    .trim();

  const { html, toc } = await renderMarkdown(cleanContent);

  return {
    meta: {
      title: data.title,
      loop: Number(data.loop),
      status: data.status,
      improvement: data.improvement,
      baseline_ms: Number(data.baseline_ms),
      result_ms: data.result_ms != null ? Number(data.result_ms) : null,
      date: data.date,
      tags: data.tags || [],
      slug,
    } as CaseStudyMeta,
    html,
    toc,
  };
}

export function getCaseStudyFlow(slug: string): FlowData | null {
  const flowPath = path.join(CASE_STUDIES_DIR, "flows", `${slug}.json`);
  if (!fs.existsSync(flowPath)) return null;
  const raw = fs.readFileSync(flowPath, "utf-8");
  return JSON.parse(raw) as FlowData;
}

export async function getCaseStudySummary() {
  const filePath = path.join(CASE_STUDIES_DIR, "summary.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Strip the H1 title since we render it separately
  const bodyContent = content.replace(/^#\s+.+\n/, "").trim();

  const { html, toc } = await renderMarkdown(bodyContent);
  return {
    meta: {
      title: data.title || "Summary",
    },
    html,
    toc,
  };
}

export async function getDocsPage(slug: string) {
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const { html, toc } = await renderMarkdown(content);
  return {
    meta: {
      title: data.title || slug,
      description: data.description || "",
    },
    html,
    toc,
  };
}
