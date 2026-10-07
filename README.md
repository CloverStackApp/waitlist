# CloverStack waitlist

One-page waitlist site for https://cloverstack.app.

Plain HTML and CSS, no build step. Signups are collected with Netlify Forms (free tier), with a honeypot field to filter bots.

## Deploy on Netlify

1. In Netlify, choose **Add new site → Import an existing project** and pick this repo. Leave the build command empty and the publish directory as the repo root.
2. In **Site configuration → Forms**, make sure form detection is on. Signups appear under **Forms → waitlist** and can be exported as CSV.
3. In **Domain management**, add `cloverstack.app` and `joincloverstack.com` (set one as primary; the other redirects). Follow Netlify's DNS instructions at your registrar. HTTPS is issued automatically, which `.app` requires.
