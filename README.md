# ShikshaOS — Showcase

The public showcase page for **ShikshaOS**, an AI teaching assistant that turns the
textbooks teachers already use into quizzes, exam papers, chapter summaries and lesson
plans — automatically in the language of the book.

**Live:** https://van007.github.io/shikshaos-showcase/

This repository contains only the showcase page: a single static page, no build step,
no framework, no backend. The ShikshaOS product source is private and not published here.
The demo on the page runs on canned data and makes no network calls.

## Running it locally

No dependencies. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

## What's here

```
index.html        the page
404.html          not-found page (self-contained)
css/main.css      tokens + components
js/               theme toggle, scroll reveals, mock demo
assets/           screenshots, social card
```

## License

Content and design © ShikshaOS. All rights reserved. The ShikshaOS product itself is
proprietary and separately licensed; nothing here grants a license to it.
