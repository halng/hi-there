"use client";
import React from "react";
import Box from "@mui/material/Box";
import hljs from "highlight.js";
import "highlight.js/styles/obsidian.css";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import go from "highlight.js/lib/languages/go";
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import sql from "highlight.js/lib/languages/sql";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);
hljs.registerLanguage("go", go);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("python", python);
hljs.registerLanguage("css", css);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("yaml", yaml);

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
