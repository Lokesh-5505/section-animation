<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the automotive motion experience on the `/` route with GSAP and ScrollTrigger initialized after browser mount, because scroll animation depends on the DOM and must remain safe during server rendering.
- Define reusable visual roles in `src/styles.css` and keep the car as a local generated asset, because the experience should theme consistently and not depend on the reference website's media.
