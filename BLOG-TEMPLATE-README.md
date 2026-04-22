# Blog Post Template System

This template system makes it super easy to transform your written blog content into beautifully styled HTML pages that match your website's pink pixel aesthetic.

## What You Got

1. **`blog-post-template.html`** - Your reusable template with clear placeholder sections
2. **`HOW-TO-USE-TEMPLATE.md`** - Complete guide with examples and troubleshooting
3. **`technical-blog-aws-strands.html`** - Your BS card game post as a working example

## Quick Start

To create a new blog post:

```bash
1. Copy blog-post-template.html
2. Rename it (e.g., technical-blog-my-new-post.html)
3. Search for "<!-- REPLACE:" and fill in your content
4. Add a blog card to technical-blog.html
5. Done!
```

## What's Included in the Template

- Navigation bar matching your site
- Header with title, date, and tags
- Styled sections with h3/h4 headings
- **Prism.js syntax highlighting** with automatic line numbers
- Code blocks for Python, JavaScript, bash, and more
- Tables with pink headers
- Lists (ordered and unordered)
- External links styled in hotpink
- Scroll-to-top button
- Mobile responsive design

## Example Blog Post

Check out `technical-blog-aws-strands.html` to see:
- How Prism.js syntax highlights Python code with automatic line numbers
- How code blocks are formatted with your pink theme
- How tables look with pink headers
- How to structure sections
- How to add inline code like `this`
- How external links are styled

## Using Code Blocks

Super easy with Prism.js - just paste your code:

```html
<pre class="line-numbers"><code class="language-python">
# Line numbers appear automatically!
def hello():
    print("Hello, World!")
</code></pre>
```

Supported languages: Python, JavaScript, bash, JSON, HTML, CSS, and more!
See `PRISM-QUICK-REFERENCE.md` for details.

## Need Help?

Read `HOW-TO-USE-TEMPLATE.md` for:
- Step-by-step instructions
- Content formatting examples
- Troubleshooting tips
- Best practices

## File Structure

```
mehek-niwas-website/
├── blog-post-template.html          ← Copy this to start new posts
├── HOW-TO-USE-TEMPLATE.md           ← Your instruction manual
├── technical-blog-aws-strands.html  ← Example blog post
├── technical-blog.html              ← Update this to add new posts
└── style.css                        ← Styling (already set up)
```

## Tips

- Keep the same HTML structure for consistency
- Use `<!-- REPLACE:` comments as your guide
- Preview in browser frequently while editing
- Copy sections from the example post as needed
- Tables use inline styles to maintain the pink theme

Happy blogging!
