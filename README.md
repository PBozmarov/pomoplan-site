# PomoPlan website

Static marketing and policy site for `https://pomoplan.io`.

## Test locally

From the repository root:

```sh
python3 -m http.server 4173 --directory website
```

Open [http://localhost:4173](http://localhost:4173). The requested routes are:

- `/`
- `/support/`
- `/privacy/`
- `/terms/`

Stop the server with `Control-C`.

## App Store link

The App Store listing is not available yet, so download calls to action currently link to `#coming-soon`. Once the URL exists, replace those links in `index.html` and the shared navigation in each page.

## Deploy to Cloudflare Pages later

For a Git-connected Pages project:

- Framework preset: `None`
- Build command: leave blank
- Build output directory: `website`
- Production branch: the release branch you choose

After the first deployment, add `pomoplan.io` as the custom domain in Cloudflare Pages. Add `www.pomoplan.io` only if you want it, and redirect it to the apex domain so `https://pomoplan.io` remains canonical.

Cloudflare Pages reads `_headers` automatically. The site has no package manager, framework, build step, analytics script, or contact-form backend.

## Before public release

- Replace the App Store placeholders with the final listing URL.
- Confirm `support@pomoplan.io` receives mail.
- Review the Privacy Policy and Terms with qualified counsel, especially the publisher identity, address, governing law, pricing model, and App Store license choice.
- Confirm the shipped iCloud and data-deletion behavior still matches the policy.
- Update the effective and sitemap dates if the copy changes materially.
