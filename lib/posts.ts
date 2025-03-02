// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import html from "remark-html";
import { Metadata, Params, PostData, RelatedPost } from "./type";
import MappingData from "../posts/config.json";
const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostIds(): Params[] {
  const results: Params[] = [];
  MappingData.forEach((data) => {
    data.posts.forEach((post) => {
      results.push({
        params: {
          slug: post.slug,
          category: data.name,
        },
      });
    });
  });
  return results;
}

const getFileContent = (category: string, slug: string): string => {
  const fullPath = path.join(postsDirectory, category, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return fileContents;
};

export async function getPostDataWithContent(
  category: string,
  slug: string
): Promise<PostData> {
  const fileContents = getFileContent(category, slug);

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .use(remarkToc)
    .use(remarkGfm)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const relates = matterResult.data.relates;
  const relatedContent: RelatedPost[] = [];
  if (relates) {
    for (const relate of relates) {
      const post = getPostMetadata(category, relate);
      relatedContent.push({
        title: post[0],
        slug: relate,
      });
    }
  }

  return {
    title: matterResult.data.title,
    date: matterResult.data.date,
    author: matterResult.data.authors,
    contentHtml: contentHtml,
    relates: relatedContent,
  };
}

export const getMetadata = (category: string | null): Metadata[] => {
  const results: Metadata[] = [];
  let data = [...MappingData];
  if (category) {
    data = data.filter((ob) => ob.name === category);
  }

  // only get post with isPublished = true

  data.forEach((object) => {
    object.posts.forEach((post) => {
      if (!post.isPublished) {
        return;
      }

      const fileContent = getFileContent(object.name, post.slug);
      const matterResult = matter(fileContent);
      results.push({
        title: post.title,
        description: post.description,
        slug: post.slug,
        tag: object.name,
        date: matterResult.data.date,
        authors: matterResult.data.authors,
      });
    });
  });

  // Sort posts by date
  results.sort((a, b) => b.date.localeCompare(a.date));
  return results;
};

export function getPostMetadata(category: string, slug: string): string[] {
  const associatedPost = MappingData.find(
    (data) => data.name === category
  )?.posts.find((post) => post.slug === slug);
  if (associatedPost) {
    return [
      associatedPost.title,
      associatedPost.tags.join(","),
      associatedPost.description,
    ];
  }
  return [
    "Hi There",
    "A blog post about common topic in web development",
    "A blog post about common topic in web development",
  ];
}

export function getSupportedCategory(): string[] {
  const categories: string[] = [];
  MappingData.forEach((data) => {
    categories.push(data.name);
  });

  return categories;
}
