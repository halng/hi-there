"use client";
import React from "react";
import Box from "@mui/material/Box";
import hljs from "highlight.js";
import "highlight.js/styles/obsidian.css";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import go from "highlight.js/lib/languages/go";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);
hljs.registerLanguage("go", go);
hljs.registerLanguage("bash", bash);

export default function ShowBlogContent({ content }: { content: string }) {
  React.useEffect(() => {
    document.querySelectorAll<HTMLElement>("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });

    document.querySelectorAll<HTMLElement>("p code, h1 code, h2 code").forEach((block) => {
      block.classList.add("language-plaintext");
      block.style.color = "#FF00FF";
    });
    
  }, [content]);
  return (
    <Box sx={{ display: "flex", justifyContent: "left" }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
}
