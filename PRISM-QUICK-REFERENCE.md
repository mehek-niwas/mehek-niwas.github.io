# Prism.js Quick Reference

Your blog template uses Prism.js for automatic syntax highlighting and line numbers.

## Basic Usage

```html
<pre class="line-numbers"><code class="language-python">
# Your Python code here
# Line numbers appear automatically!
import numpy as np
print("Hello, World!")
</code></pre>
```

## Common Languages

| Language | Class Name |
|----------|------------|
| Python | `language-python` |
| JavaScript | `language-javascript` or `language-js` |
| Bash/Shell | `language-bash` or `language-shell` |
| JSON | `language-json` |
| HTML | `language-html` |
| CSS | `language-css` |
| TypeScript | `language-typescript` or `language-ts` |
| Java | `language-java` |
| SQL | `language-sql` |
| Go | `language-go` |
| Rust | `language-rust` |

## Examples

### Python with Line Numbers (Default)

```html
<pre class="line-numbers"><code class="language-python">
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
</code></pre>
```

### JavaScript

```html
<pre class="line-numbers"><code class="language-javascript">
const greet = (name) => {
    console.log(`Hello, ${name}!`);
};

greet("World");
</code></pre>
```

### Bash Commands

```html
<pre class="line-numbers"><code class="language-bash">
# Install dependencies
npm install

# Run development server
npm run dev
</code></pre>
```

### JSON Data

```html
<pre class="line-numbers"><code class="language-json">
{
    "name": "my-project",
    "version": "1.0.0",
    "dependencies": {
        "prismjs": "^1.29.0"
    }
}
</code></pre>
```

### Code Without Line Numbers

Just remove the `line-numbers` class:

```html
<pre><code class="language-python">
print("Simple one-liner")
</code></pre>
```

## What You Get

- **Automatic line numbers** - No need to manually add them
- **Syntax highlighting** - Keywords, strings, comments are color-coded
- **Pink theme** - Matches your website's aesthetic
- **Copy-friendly** - Line numbers don't get copied when users select code
- **Mobile responsive** - Horizontal scrolling on small screens

## File Locations

The template includes these Prism.js files from CDN:

**In `<head>`:**
- `prism.min.css` - Base styles
- `prism-line-numbers.min.css` - Line number styles
- Custom `<style>` block - Pink theme customization

**Before `</body>`:**
- `prism.min.js` - Core Prism library
- `prism-python.min.js` - Python syntax support
- `prism-line-numbers.min.js` - Line number plugin

## Adding More Languages

To support additional languages, add the corresponding component script before `</body>`:

```html
<!-- Add support for more languages -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
```

Check the [Prism.js website](https://prismjs.com/) for a full list of supported languages.

## Tips

1. **Paste clean code** - Prism handles formatting, so paste your code as-is
2. **Use consistent spacing** - 2 or 4 spaces for indentation (not tabs)
3. **Test locally** - Open your HTML file in a browser to verify highlighting
4. **Inline code** - Use `<code>function_name</code>` for inline mentions
5. **Comments work** - Code comments will be syntax highlighted too

## Color Customization

The template includes custom pink styling. To change colors, edit the `<style>` block in your template's `<head>`:

```css
.line-numbers .line-numbers-rows {
  border-right: 1px solid #ffc0da;  /* Pink border */
  background: #ffe6f0;               /* Light pink background */
}
```

That's it! Just paste your code and Prism does the rest.
