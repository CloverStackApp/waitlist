# What this site connects to

A plain-language list of every outside service cloverstack.app talks to, so anyone can check that there are no hidden ads, trackers, or backdoors.

Last checked: 2026-10-13, by reading every file in this repository (`index.html`, `thanks.html`, `styles.css`, `signup-source.js`, `clover.svg`, `og-image.png`, `email-logo.png`, `_headers`). The site has no build step, so these files are exactly what visitors get.

## The short version

When you visit, your browser talks to **three** places, and only three:

| Who | What for | What they can see |
|---|---|---|
| **cloverstack.app** (hosted by Netlify) | The page itself, the logo, the stylesheet, and the signup form | Your IP address and browser type (every website sees this). If you sign up: your email, plus where you came from (see below). |
| **fonts.googleapis.com** (Google) | The font's stylesheet (Nunito) | Your IP address, browser type, and that you are on cloverstack.app. |
| **fonts.gstatic.com** (Google) | The font files themselves | Same as above. |

There are **no** ad networks, analytics, tracking pixels, cookies, social media buttons, embedded videos, or chat widgets. Nothing on the page sends data anywhere in the background.

## Every outside address in the code

Found by searching every file for `http`, `//`, `src=`, `href=`, `url(` and `@import`.

| Address | Where | Does the browser contact it? |
|---|---|---|
| `https://fonts.googleapis.com/css2?family=Nunito...` | `index.html`, `thanks.html` | Yes, loads the font stylesheet. |
| `https://fonts.gstatic.com` | `index.html`, `thanks.html` (preconnect) | Yes, downloads the font files. |
| `https://fonts.googleapis.com` | `index.html`, `thanks.html` (preconnect) | Yes, same as the stylesheet above. |
| `https://cloverstack.app` and `https://cloverstack.app/og-image.png` | `index.html` (`og:` tags) | No. These tell Facebook, LinkedIn, etc. which picture to show when someone shares the link. Those sites fetch the image themselves; the visitor's browser does not. |
| `http://www.w3.org/2000/svg` | `clover.svg` | No. A standard label that says "this is an SVG image." Never fetched. |
| `http://c2pa.org/manifest` | `clover.svg` | No. A label for the "content credentials" block described below. Never fetched. |

`styles.css` contains no outside addresses.

## The one script

`signup-source.js` (10 lines) is the only script on the site. It reads the page's own address for `?utm_source=` or `?ref=` (or, if neither is there, the name of the website that linked you) and copies that into two hidden fields of the signup form, so we know which posts bring people in. It does not contact anything. It only matters if you submit the form.

## The signup form

The form sends to `/thanks.html` on cloverstack.app itself. Netlify Forms receives it and stores it in the Netlify account. What is sent: your email, the two "where you came from" fields above, and an empty hidden field used to catch spam bots.

Netlify runs its own spam filtering on submissions on their servers. That happens after the form leaves your browser, so it won't show up in DevTools; see Netlify's own privacy policy for details.

## The email logo

`email-logo.png` is the clover logo used in CloverStack email signatures. No page on this site loads it. Email apps fetch it from cloverstack.app when someone opens an email with the signature, the same way they load any picture in an email. It has no tracking code and the file is the same for everyone.

## Content credentials in the image files

`clover.svg` and `og-image.png` each contain a signed "content credentials" (C2PA) block. It's an industry standard label that records the file was made with help from an AI tool (Claude, by Anthropic). It's inert data, like a photo's camera information: it contains no web addresses, no code, and makes no connections. Many image tools can show it (search "C2PA verify").

## The lockdown header

`_headers` tells Netlify to send a **Content-Security-Policy** with every page. Browsers enforce it, and it blocks anything not on this list:

- Scripts: only from cloverstack.app itself. No inline scripts, no outside scripts.
- Styles: cloverstack.app and fonts.googleapis.com.
- Fonts: fonts.gstatic.com.
- Images: cloverstack.app only.
- Background connections (fetch, beacons, websockets): **none at all.**
- Forms: may only submit to cloverstack.app.
- The site can't be embedded in someone else's page.

So even if a tracker were somehow added to the page later, visitors' browsers would refuse to load it or send it data. If you add a new outside service on purpose, it has to be added to `_headers` **and** to this file.

The same file also sets a few standard safety headers: a referrer policy, `nosniff`, and a policy turning off camera, microphone, location and ad-interest tracking.

## How to check it yourself

You don't need to trust this document. In Chrome, Edge or Firefox on a computer:

1. **See every connection.** Open cloverstack.app, press F12 (or right-click and choose **Inspect**), go to the **Network** tab, then reload the page. Each row is something the page loaded. The **Domain** column (right-click the column headers to add it) should show only `cloverstack.app`, `fonts.googleapis.com`, and `fonts.gstatic.com`.
2. **See the lockdown header.** In the same Network tab, click the first row (the page itself) and look under **Response Headers** for `content-security-policy`. It should match `_headers` in this repo.
3. **Check for cookies.** Go to the **Application** tab (Firefox: **Storage**) and look under **Cookies** and **Local Storage**. Both should be empty.
4. **Check for blocked attempts.** Open the **Console** tab. If anything tried to break the rules above, you'd see a red "Content Security Policy" error there.

Without a browser, `curl -sI https://cloverstack.app` prints the response headers, including the policy.

A developer can read this whole repository in well under an hour. Before the full CloverStack app launches, it should get an independent security review.
