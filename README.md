# PomoPlan website

Static marketing and policy site for `https://pomoplan.io`.

## Test locally

From the repository root:

```sh
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173). The requested routes are:

- `/`
- `/support/`
- `/privacy/`
- `/terms/`

Stop the server with `Control-C`.

## App Store link

The App Store listing is not available yet, so download calls to action currently link to `#coming-soon`. Once the URL exists, replace those links in `index.html` and the shared navigation in each page.

## Deployment

Deployed on **GitHub Pages** from the `main` branch of
[`PBozmarov/pomoplan-site`](https://github.com/PBozmarov/pomoplan-site), served from the
repository root. There is no build step: pushing to `main` republishes in about a minute.

- Custom domain `pomoplan.io`, bound by the `CNAME` file. Deleting that file detaches the domain.
- HTTPS enforced; the certificate covers both the apex and `www`.
- `www.pomoplan.io` redirects to the apex, so `https://pomoplan.io` stays canonical.
- DNS is hosted at **Dynadot** (`ns1`/`ns2.dyna-ns.net`), not by the site host. Records are changed there.

**`_headers` has no effect on GitHub Pages.** It supports no custom response headers, so the
CSP, HSTS, frame and referrer policies in that file are not being applied. The file is kept
for a possible future move behind a CDN that reads it; until then, treat those protections as
absent. The privacy policy's hosting disclosure must name whoever actually serves the site.

The site has no package manager, framework, build step, analytics script, or contact-form backend.

## Before public release

- Replace the App Store placeholders with the final listing URL.
- Confirm `support@pomoplan.io` receives mail.
- Review the Privacy Policy and Terms with qualified counsel, especially the publisher identity, address, governing law, pricing model, and App Store license choice.
- Confirm the shipped iCloud and data-deletion behavior still matches the policy.
- Update the effective and sitemap dates if the copy changes materially.
