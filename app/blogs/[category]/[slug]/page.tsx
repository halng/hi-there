// app/blog/[id]/page.tsx
import {
  getAllPostIds,
  getPostDataWithContent,
  getPostMetadata,
} from "../../../../lib/posts";
import { PostData } from "../../../../lib/type";
import "./styles.css";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import ShowBlogContent from "@/components/ShowBlogContent";
import GithubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import { Metadata } from "next";
interface Params {
  params: {
    category: string;
    slug: string;
  };
}

// Generates static paths for each post at build time
export async function generateStaticParams(): Promise<Params[]> {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    params: {
      category: path.params.category,
      slug: path.params.slug,
    },
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data: string[] = getPostMetadata(params.category, params.slug);
  return {
    title: data[0],
    keywords: data[1],
    description: data[2],
  };
}

// Fetches the content for each post based on the ID
export default async function Post({ params }: Params) {
  const postData: PostData = await getPostDataWithContent(
    params.category,
    params.slug
  );

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "left" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Blogs
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/blogs/${params.category}`}
            >
              {params.category.charAt(0).toUpperCase() +
                params.category.slice(1)}
            </Link>
            <Typography sx={{ color: "text.primary" }}>
              {postData.title}
            </Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontStyle: "oblique",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            {postData.title}
          </Typography>
        </Box>

        <Divider />

        <ShowBlogContent content={postData.contentHtml} />

        <Divider />

        {/* // Show related posts */}
        {postData.relates.length > 0 && (
          <Typography
            variant="h5"
            sx={{
              fontStyle: "oblique",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            Related Posts
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {postData.relates.length > 0 &&
            postData.relates.map((relate, index) => (
              <Link
                key={relate.slug}
                href={`/blogs/${params.category}/${relate.slug}`}
                sx={{ padding: "0 0rem" }}
              >
                {index + 1}. {relate.title}
              </Link>
            ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            padding: "1rem 0 0 0",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="text"
            size="small"
            aria-label="There is something wrong with this page?"
            startIcon={<GithubIcon />}
            component="a"
            href={`https://github.com/halng/hi-there/blob/main/posts/${params.category}/${params.slug}.md`}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            Edit this page
          </Button>
        </Box>
      </Box>
    </>
  );
}
