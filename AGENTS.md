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

- Reuse the shared contact form on the home and contact pages; submit enquiries to the same-origin PHP API and confirm success only after the API saves them.
- Keep MySQL credentials and the CRUD administrator token outside the public website directory; only POST creation is public, and every read, update, and delete operation must be administrator-authenticated.
