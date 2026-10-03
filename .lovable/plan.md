# Scroll-driven hero animation plan

## Experience
Build a single-page, first-screen automotive animation inspired by the supplied reference, not a pixel-for-pixel copy. The opening view will feature a prominent letter-spaced “WELCOME ITZFIZZ” headline, four concise percentage metrics, a top-view car on a graphic road, and a clear hint that the scene continues below. Use a restrained charcoal and pale-neutral base with sharp lime, blue, and warm accent moments; keep the car as the unmistakable focal point.

## Motion sequence
1. On entry, reveal the headline with a soft stagger and small upward movement; introduce the car/road, then bring metrics in one at a time with subtle offset and opacity changes.
2. As the visitor scrolls, hold the scene in view while the car traverses the road. Tie its position, a colored trail, headline emphasis, and metric transitions to one GSAP ScrollTrigger timeline with scrubbed scroll progress. Scrolling backward must reverse the sequence cleanly.
3. Use transform and opacity for moving layers, measured track bounds for travel distance, and GSAP refresh on resize. Avoid React state updates or layout reads on every scroll frame; clean up GSAP contexts when the page unmounts.
4. Let the scene release naturally into a minimal closing section so the scroll journey has an endpoint. On narrow screens, preserve the car and typography without clipping, adapt metric placement, and reduce travel distance rather than shrinking the desktop composition indiscriminately.
5. Respect reduced-motion preferences: skip decorative entry motion and pin/scrub effects, leaving all headline and metric information readable with a static car composition.

## Implementation details
- Replace the current `/` placeholder in the existing React/TanStack page. Keep Tailwind for layout, with reusable semantic colors and animation-specific styling in the global stylesheet.
- Add GSAP and ScrollTrigger as project dependencies, initialize them only in the browser, and create a focused hero scene component. Use an original, locally stored top-view car visual rather than embedding the reference site's image without permission.
- Add page-specific title, description, and social metadata to the home route. Keep text and metric values aligned to the supplied reference, treating them as demonstration content rather than verified business claims.
- Verify the live page at desktop and mobile widths: initial reveal, forward/reverse scrolling, resize behavior, readable metric transitions, reduced-motion state, and absence of console/runtime errors.

## Delivery boundary
This plan covers the animated page and its validation. Hosting on GitHub Pages or publishing is not included until explicitly requested; the project can be previewed in Lovable first.
