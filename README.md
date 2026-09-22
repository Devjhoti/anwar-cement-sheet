# Anwar Cement Sheet – Website

Static site (no build step). Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8080
# then open http://localhost:8080
```

## Structure

```
index.html          – all sections (header, hero carousel, trust strip, why, products,
                      roof finder, solutions, story, support, contact, footer)
css/style.css       – theme (colours pulled from the logo), layout, responsive rules
js/main.js          – hero carousel, mobile menu, scroll-spy, roof finder, counters,
                      reveal-on-scroll, contact form (demo only)
assets/
  logo.png          – logo with transparent background (full size)
  logo-512.png      – logo, 512px (used in navbar / favicon)
  hero/hero-1.jpg   – original hero photo (lightly graded)
  hero/hero-2.jpg   – golden-hour variant, cropped toward the house
  hero/hero-3.jpg   – blue-hour / monsoon variant, cropped toward the family
  solution-*.jpg    – crops used on the Solutions cards
```

## Theme tokens (css/style.css `:root`)

| token        | value   | use                       |
|--------------|---------|---------------------------|
| `--red`      | #eb1d27 | primary (from logo)       |
| `--red-dark` | #b8121b | hover / gradients         |
| `--ink`      | #111111 | black (from logo), footer |
| `--cream`    | #f7f4ee | light section background  |

## To do before launch
- Replace phone, email and address placeholders in `index.html` (search `XXXX`).
- Replace the trust-strip figures (`data-count`) with verified numbers.
- Connect the contact form to a backend or email service.
- Generate the site images with the prompts in image-prompts.md and drop them into assets/.
