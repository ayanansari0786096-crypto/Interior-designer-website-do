MOLECULE ARCHITECTS & INTERIOR DESIGNERS
Luxury Architecture & Interior Design Studio Website
================================================================

A complete, self-contained static website. No build step, no server,
no dependencies to install. Upload the folder and it works.

----------------------------------------------------------------
FOLDER STRUCTURE
----------------------------------------------------------------
molecule-architects/
├── index.html          Main page (all sections)
├── css/
│   └── style.css       All styling, animations, responsive rules
├── js/
│   └── main.js         Slider, scroll reveals, filters, lightbox, share
├── images/             19 optimised JPEG photographs
└── README.txt          This file

Keep this exact structure. index.html references css/style.css,
js/main.js and images/*.jpg by relative path — moving files out of
these folders will break the page.

----------------------------------------------------------------
HOW TO HOST IT
----------------------------------------------------------------
Option 1 — Any static host (recommended)
  Upload the whole folder to Netlify, Vercel, Cloudflare Pages,
  GitHub Pages, Firebase Hosting or any cPanel / shared hosting.
  Set index.html as the entry point. Done.

Option 2 — Your own server
  Copy the folder into your web root (e.g. /var/www/html/).
  Point the domain at it. No PHP, Node or database required.

Option 3 — Test locally
  Open index.html directly in a browser, or run:
      python3 -m http.server 8000
  then visit http://localhost:8000

----------------------------------------------------------------
CUSTOMISING
----------------------------------------------------------------
Phone number
  Search index.html for  8707039155  and replace every occurrence
  (appears in tel: links and wa.me WhatsApp links).
  Also update the visible text  +91 87070 39155.

Address
  Search index.html for  UG-23  and edit the address block.
  Update the Google Maps link in the "Get Directions" anchor too.

Colours
  Open css/style.css and edit the variables at the top (:root):
      --black, --cream, --beige, --gold, --gold-2, --white
  Changing these updates the whole site consistently.

Fonts
  Cormorant Garamond (headings) + Jost (body), loaded from Google
  Fonts in the <head>. To self-host, download the woff2 files and
  replace the <link> with a local @font-face block in style.css.

Hero slider images
  Replace images/hero-1.jpg … hero-4.jpg (keep the same filenames
  and a 16:9-ish ratio, ~1920px wide). No code change needed.

Portfolio images
  Replace images/p-*.jpg. Each gallery item in index.html carries
  data-title, data-cat-label and data-img attributes — edit those
  to change the caption, category and lightbox image.

Services images
  Replace images/svc-*.jpg (six files, one per service).

----------------------------------------------------------------
IMPORTANT NOTE ON PORTFOLIO CONTENT
----------------------------------------------------------------
All portfolio images are SAMPLE PLACEHOLDERS. They are illustrative
visuals, not completed client projects, and the page states this
explicitly under the gallery. Replace them with real project
photography before publishing commercially. No awards, testimonials,
client names or credentials have been invented anywhere on the site.

----------------------------------------------------------------
FEATURES
----------------------------------------------------------------
- Animated hero slider: 4 slides, 6.5s auto-rotate, crossfade + zoom,
  prev/next arrows, clickable progress indicators, per-slide text
  animation, pauses on hover.
- Scroll reveals: fade-up, slide-in, staggered card entrances,
  subtle parallax on large background images.
- Portfolio: 8 projects, 5 category filters, hover zoom, full-screen
  lightbox with prev/next, keyboard arrows and Esc to close.
- Services: 6 image cards with lift + image zoom on hover.
- Sticky navbar that changes on scroll, smooth anchor scrolling,
  responsive mobile drawer menu.
- Share button (header, share band, mobile drawer, footer) using the
  Web Share API with a copy-link fallback, plus a WhatsApp share link.
- Floating WhatsApp button, back-to-top button, loading animation.
- Contact: tel: call button, WhatsApp enquiry button, Get Directions,
  and a front-end enquiry form.
- Accessibility: prefers-reduced-motion support (all animation,
  auto-rotation and parallax disabled), ARIA labels, keyboard
  navigable lightbox, focus states.
- Performance: lazy-loaded images with explicit width/height to
  prevent layout shift, compressed JPEGs (~2.7 MB total).

----------------------------------------------------------------
ENQUIRY FORM
----------------------------------------------------------------
The form is front-end only — it validates input and shows a
confirmation message, but does not send data anywhere. Visitors are
directed to WhatsApp and phone for an immediate response.

To make it functional, either:
  a) Point it at a form service (Formspree, Netlify Forms, etc.) by
     adding an action/method to the <form id="leadForm"> tag, or
  b) Wire it to your own backend endpoint in js/main.js.

----------------------------------------------------------------
BROWSER SUPPORT
----------------------------------------------------------------
Chrome, Edge, Safari, Firefox — current versions. Mobile responsive
from 320px upward. Tested at 1440px, 1080px, 860px, 620px and 390px.

================================================================
