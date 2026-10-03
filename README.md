# Nostra - E-commerce Website

A responsive e-commerce front-end built with plain HTML, CSS, and JavaScript.

## Objective

Build a multi-page e-commerce site with working search and filter functionality, fully responsive across devices, using no frameworks or build tools.

## Pages

- `index.html` - Home page with hero banner and featured products.
- `collections.html` - Full product grid with live search and category filtering.
- `contact.html` - Contact form with client-side validation and a success message.

## Features

- Semantic HTML layout with a shared responsive navigation bar (collapses to a hamburger menu on mobile).
- Product data stored as an array of objects in `script.js`.
- Search box filters products by name as you type.
- Category filter buttons (All / Men / Women / Accessories) combine with search.
- Contact form validates name, email format, and message length before showing a success message.
- Responsive layout using CSS Grid/Flexbox and media queries for mobile, tablet, and desktop breakpoints.

## Tech

- HTML5
- CSS3 (Grid, Flexbox, media queries)
- Vanilla JavaScript (DOM APIs, `addEventListener`)

## Running locally

Just open `index.html` in a browser, or serve the folder with any static file server:

```
npx serve .
```

## Live demo

See `proof/live_link.txt` for the deployed GitHub Pages URL.
