# SEO Peek
A browser extension for Chrome

Just one click to get a quick peek into on-page SEO factors of the web page you visit in the browser.

## Checking the DOM
SEO Peek is a Chrome extension that checks the Document Object Model (DOM) of a page. There is no need to view the HTML source (View Source for SEO is dead) or inspect the DOM in the elements tab of Chrome DevTools.

SEO Peek checks the most relevant content elements and robot directives inside the DOM of both traditional server-side generated pages and client-side rendered pages like Single Page Applications (SPA).

## Server response
Besides a check of HTML elements the extension also sends a request to the server to check the HTTP Status and several HTTP Response Headers like the HTTP Canonical header, X-Robots-Tag header and Vary header.

The HTTP Status contains an additional remark when the server supports HTTP/2.

## Link elements and headers
For all link elements and link headers the extension checks if the URL of a link element or link header refers to the URL of the current page (self-referential).

The HTTP status for the canonical URL is also being checked. When the response contains a redirect the extension detects the redirect and shows the response URL and its HTTP status.

## What is being checked?
The extension gives you insights into several relevant content elements and robot directives.

### Content elements
* Page title
* Meta description
* Meta keywords
* Meta news keywords
* H1 headings

### Robot directives
* HTTP status
* Meta robots (Meta robots tag, X-Robots-Tag header)
* Canonicalization annotations (Canonical link tag, Canonical link header)
* Pagination annotations (Prev link tag, Next link tag)
* Mobile annotations (Rel-alternate-media annotation, Vary HTTP header, AMP HTML annotation)
* International annotations (Rel-alternate-hreflang annotation)

## Settings
You can control the display settings of some of the elements or directives. Open the extension options in the Chrome Extensions settings.

## Installation
Download and install the Chrome extension from the [Chrome Web Store][1].

## Usage
### Windows & MacOS
* Open a tab and visit a web page
* Click the extension icon<sup>∗</sup> in the browser toolbar to inspect the page
* Chrome will open a popup screen which shows all page results

<sup>∗</sup> instead of clicking the extension icon, it's possible to assign a shortcut

## Issues
Have a bug? Please create an [issue][2] here on GitHub!

## Contributing
Want to contribute? Great! Just fork the project, work on new features or bug fixes using feature branches and open [pull-requests][3] with concise but complete descriptions of your changes.

If you are unsure about a proposal, you can just open an issue to discuss it before writing actual code.

## Changelog
See [changelog][5] for details.

[1]: https://chrome.google.com/webstore/detail/seo-peek/lkkpfhgjmocgneajknedjhodkjkkclod
[2]: https://github.com/sanderheilbron/seo-peek/issues
[3]: https://github.com/sanderheilbron/seo-peek/pulls
[4]: https://www.sanderheilbron.nl
[5]: https://github.com/sanderheilbron/seo-peek/blob/master/CHANGELOG.md
