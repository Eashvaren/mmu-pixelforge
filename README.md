# PixelForge Studio Website

This project is a simple one-page business website for **PixelForge Studio**.
It was built using only:

- HTML
- CSS
- JavaScript

There are no frameworks, no backend, and no database. This makes the project easier
to understand, edit, and present for a student assignment.

## How To Open The Website

Open the `index.html` file in a web browser.

You do not need to run any installation command.

## Project Files

### `index.html`

This file contains the main content of the website.

Edit this file when you want to change:

- Page text
- Section headings
- Navigation links
- Services
- Customer cards
- Contact form labels
- Footer text

The main website sections are:

- Header and navigation
- Hero section
- About section
- Services section
- Process section
- Customers section
- Contact section
- Footer

### `style.css`

This file controls how the website looks.

Edit this file when you want to change:

- Colors
- Font sizes
- Spacing
- Card design
- Button styles
- Mobile layout
- Section backgrounds

Useful CSS classes to know:

- `.hero` controls the first main section
- `.section` controls common section spacing
- `.card-grid` controls the card layout
- `.card` controls service and customer cards
- `.card-icon` controls the icons inside cards
- `.contact-form` controls the contact form design

### `script.js`

This file adds small interactive features.

It currently controls:

- The mobile navigation menu
- The contact form thank-you message

The form does not send real email because this project has no backend. It only shows
a message on the page after the user clicks the send button.

## How The Page Is Organized

The website is built as one long page. Navigation links use section IDs to jump to
different parts of the page.

Example:

```html
<a href="#services">Services</a>
```

This link moves the page to:

```html
<section class="section section-muted" id="services">
```

If you add a new navigation link, make sure the `href` value matches a section `id`.

## How To Edit The Services

In `index.html`, find the Services section:

```html
<section class="section section-muted" id="services">
```

Each service is inside an `<article class="card">`.

To change a service, edit the `<h3>` title and the `<p>` description.

## How To Edit The Customers

In `index.html`, find the Customers section:

```html
<section class="section" id="customers">
```

Each customer type is also inside an `<article class="card">`.

To change a customer type, edit the card title and description.

## How To Change The Colors

Most colors are in `style.css`.

The main dark color is:

```css
#0f172a
```

The main accent color is:

```css
#0ea5a4
```

You can use Find/Search in your editor to locate these colors and replace them.

## Student Notes

- Keep file names the same: `index.html`, `style.css`, and `script.js`.
- Test the website after every major change by refreshing the browser.
- If the layout looks broken, check for missing closing tags such as `</div>`,
  `</section>`, or `</article>`.
- If the mobile menu or contact message stops working, check `script.js`.
- If the design changes do not appear, make sure `style.css` is linked correctly
  inside `index.html`.
