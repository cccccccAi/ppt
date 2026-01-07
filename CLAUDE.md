# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static recipe website ("菜谱展示") showcasing Chinese home cooking recipes with a clean, Feishu-inspired design. The site is built with pure HTML/CSS without any build tools or frameworks.

## Architecture

**Static HTML Structure:**
- `index.html` - Homepage with site overview and recipe cards
- `recipe.html` - 番茄炒蛋 (Tomato and Egg) recipe page
- `recipe_hunan.html` - 辣椒炒肉 (Hunan-style Pepper with Pork) recipe page

**Design System:**
All pages share a consistent CSS architecture embedded in `<style>` tags:
- CSS custom properties (`--bg`, `--fg`, `--primary`, `--border`, `--muted`, `--surface`) for theming
- System font stack with Chinese font support (PingFang SC)
- Mobile-first responsive grid layouts using CSS Grid
- Sticky top navigation bar with blur backdrop
- Accessibility features (skip links, ARIA labels, semantic HTML)

**Key Design Patterns:**
- Card-based layout for content sections (`.card` class)
- Two-column responsive grids that collapse to single column on mobile (`@media max-width: 900px`)
- Media sections with image galleries (3-column grid) and video blocks
- Note callouts with left border accent (`.note` class)
- Inline SVG placeholders for images using data URIs

## Language and Content

All content is in Chinese (zh-CN). When editing text content:
- Maintain formal but approachable tone
- Keep recipe instructions clear and step-by-step
- Use proper Chinese punctuation (、，。)

## Working with Pages

**When adding new recipe pages:**
1. Copy structure from existing recipe pages (recipe.html or recipe_hunan.html)
2. Update navigation links in all pages (topbar `<nav>` section)
3. Customize CSS custom properties if needed (e.g., `--accent` colors for theming)
4. Maintain consistent section structure: title → ingredients/tools → prep → cooking → tips/culture → media

**When modifying styles:**
- All styles are inline in each HTML file (no external CSS)
- Changes must be applied to all pages manually to maintain consistency
- Preserve responsive breakpoints and accessibility features

## Serving the Site

Since this is a static site with no build process:
- Open HTML files directly in browser for local testing
- Or use any static server: `python -m http.server 8000` or `npx serve`
- All paths use relative URLs (e.g., `/recipe.html`) for simple deployment

## Accessibility Considerations

The site includes accessibility features that should be preserved:
- Semantic HTML5 elements (`<main>`, `<section>`, `<nav>`, `<figure>`)
- ARIA labels and roles throughout
- Skip links for keyboard navigation
- Focus styles (`:focus` with visible outlines)
- Alt text for images and aria-labels for media
- Proper heading hierarchy (h1 → h2)
