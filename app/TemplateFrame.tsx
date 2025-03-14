"use client";
import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  styled,
} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ToggleColorMode from "@components/ToggleColorMode";
import getBlogTheme from "@theme/getBlogTheme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

interface TemplateFrameProps {
  supportedCategory: string[];
  children: React.ReactNode;
}

export default function TemplateFrame({
  supportedCategory,
  children,
}: TemplateFrameProps) {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };

  return (
    <ThemeProvider theme={blogTheme}>
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: "8px 12px",
            }}
          >
            <Button
              variant="text"
              size="small"
              aria-label="Home Page"
              startIcon={<HomeOutlinedIcon />}
              component="a"
              href="/"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              hi-there.me
            </Button>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {supportedCategory.map((category, index) => (
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  href={`/blogs/${category}`}
                  component="a"
                  key={`${index}-${category}`}
                >
                  {category.toUpperCase()}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <ToggleColorMode
                data-screenshot="toggle-mode"
                mode={mode}
                toggleColorMode={toggleColorMode}
              />
            </Box>
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}
