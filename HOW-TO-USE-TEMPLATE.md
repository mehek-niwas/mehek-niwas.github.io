# How to Use the Blog Post Template

This guide will walk you through creating new blog posts for your website using the `blog-post-template.html` file.

## Quick Start (5 Steps)

1. **Copy the template**: Make a copy of `blog-post-template.html`
2. **Rename it**: Use the format `technical-blog-your-topic.html`
3. **Replace placeholders**: Search for `<!-- REPLACE:` and update each section
4. **Add to blog index**: Update `technical-blog.html` with a new blog card
5. **Test it**: Open your new HTML file in a browser to check formatting

---

## Detailed Instructions

### Step 1: Copy and Rename the Template

1. Make a copy of `blog-post-template.html`
2. Rename it to describe your blog post topic. Examples:
   - `technical-blog-aws-strands.html`
   - `technical-blog-rag-tutorial.html`
   - `technical-blog-ml-optimization.html`

### Step 2: Update the Head Section

Find and replace these items in the `<head>` section:

```html
<!-- REPLACE: Update the title with your blog post title -->
<title>Your Blog Post Title | mehek niwas</title>
```
**Change to:**
```html
<title>Multi-Agent BS Card Game with AWS Strands | mehek niwas</title>
```

```html
<!-- REPLACE: Update the canonical URL with your blog post filename (without .html) -->
<link rel="canonical" href="https://mehek-niwas.github.io/your-blog-post-url" />
```
**Change to:**
```html
<link rel="canonical" href="https://mehek-niwas.github.io/technical-blog-aws-strands" />
```

### Step 3: Update the Article Header

Replace the article header information:

```html
<!-- REPLACE: Add your blog post title here -->
<h2>Your Blog Post Title Here</h2>
```
**Change to:**
```html
<h2>Multi-Agent BS Card Game with AWS Strands</h2>
```

```html
<!-- REPLACE: Add a one-sentence description of your blog post -->
<p class="blog-article-kicker">A brief one-sentence description...</p>
```
**Change to:**
```html
<p class="blog-article-kicker">Building a bluffing card game where AI agents learn to lie, call BS, and improve through self-feedback loops.</p>
```

```html
<!-- REPLACE: Update the date and tags -->
<p class="blog-article-meta">
  <span>2026-04-21</span> · <span>tag1, tag2, tag3</span>
</p>
```
**Change to:**
```html
<p class="blog-article-meta">
  <span>2026-04-21</span> · <span>agentic ai, aws strands, multi-agent</span>
</p>
```

### Step 4: Add Your Content

#### Writing Paragraphs

Replace the template sections with your actual content. Each section follows this structure:

```html
<section class="blog-article-section">
  <h3>Your Section Title</h3>
  <p>
    Your paragraph content goes here. You can write multiple paragraphs
    within a single section.
  </p>
  <p>
    This is a second paragraph in the same section.
  </p>
</section>
```

#### Adding Code Blocks

For code examples, use Prism.js which provides automatic syntax highlighting and line numbers:

```html
<pre class="line-numbers"><code class="language-python">import os

# Set your API key
os.environ['MISTRAL_API_KEY'] = ""

model = LiteLLMModel(model_id="mistral/mistral-large-latest")
</code></pre>
```

**Tips for code blocks:**
- Line numbers are added automatically - just paste your code!
- Use `class="line-numbers"` on the `<pre>` tag for line numbers
- Change `language-python` to match your code language:
  - `language-python` for Python
  - `language-javascript` for JavaScript
  - `language-bash` for bash/terminal commands
  - `language-json` for JSON
  - `language-html` for HTML
  - `language-css` for CSS
- Prism.js will automatically syntax highlight your code with colors
- Don't manually add line numbers - Prism does this for you!

#### Adding Inline Code

Use the `<code>` tag for inline code:

```html
<p>
  You can use the <code>@tool</code> decorator to define tools in AWS Strands.
</p>
```

#### Adding Lists

**Unordered lists:**
```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

**Ordered lists:**
```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

#### Adding Tables

Copy and modify the table structure:

```html
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #ffc0da;">
      <th style="padding: 10px; text-align: left; border: 1px solid #eee;">Type</th>
      <th style="padding: 10px; text-align: left; border: 1px solid #eee;">Metric</th>
      <th style="padding: 10px; text-align: left; border: 1px solid #eee;">What it tells you</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #eee;">Quantitative</td>
      <td style="padding: 10px; border: 1px solid #eee;">Bluff success %</td>
      <td style="padding: 10px; border: 1px solid #eee;">Is the agent's lying strategy working?</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #eee;">Quantitative</td>
      <td style="padding: 10px; border: 1px solid #eee;">Win rate across rounds</td>
      <td style="padding: 10px; border: 1px solid #eee;">Is the agent actually improving?</td>
    </tr>
  </tbody>
</table>
```

**Tips for tables:**
- The header row has a pink background (`#ffc0da`) to match your site theme
- Add or remove `<tr>` rows as needed
- Adjust column count by adding/removing `<th>` and `<td>` elements

#### Adding Links

For external links:

```html
<a href="https://example.com" target="_blank" style="color: hotpink; text-decoration: underline;">
  Link text here
</a>
```

The `target="_blank"` opens the link in a new tab.

### Step 5: Add Your Post to the Blog Index

Open `technical-blog.html` and add a new blog card in the appropriate category section.

Find the category section (e.g., `<div class="llm-layer" id="cat-agentic">`):

```html
<div class="llm-layer" id="cat-agentic">
  <div class="layer-label">agentic ai</div>
  <div class="layer-cards">
    <!-- Add your new card here -->
    <article class="blog-card">
      <header>
        <h3>
          <a href="technical-blog-aws-strands.html">
            Multi-Agent BS Card Game with AWS Strands
          </a>
        </h3>
        <p class="blog-card-meta">
          <span>2026-04-21</span> · <span>agentic ai, aws strands, multi-agent</span>
        </p>
      </header>
      <p class="blog-card-blurb">
        Building a bluffing card game where AI agents learn to lie, call BS, and improve through self-feedback loops.
      </p>
    </article>
    
    <!-- Other existing cards... -->
  </div>
</div>
```

**Available category IDs:**
- `cat-agentic` - Agentic AI
- `cat-interpretability` - Interpretability
- `cat-ml` - Machine Learning
- `cat-notes` - Notes

---

## Complete Example: BS Card Game Post

Here's what a small section of your BS card game blog post might look like:

```html
<section class="blog-article-section">
  <h3>What is BS?</h3>
  <p>
    BS is a card game where players take turns placing cards face-down on a pile, 
    claiming they match the current target rank (ex: Ace, 1, Queen). You can lie 
    about your cards. If someone calls "BS!", and the cards don't match your claim, 
    you have to pick up the entire pile. If you were telling the truth, the caller 
    picks it up. The first player to empty their hand wins the game.
  </p>
  <p>
    If agents were to play this game, they need to be able to reason about incomplete 
    information, bluff strategically, and react to the behavior of other agents.
  </p>
</section>

<section class="blog-article-section">
  <h3>What is AWS Strands?</h3>
  <p>
    Strands is an open-source agentic framework from AWS. Instead of writing a ton 
    of JSON schema to describe your tools, Strands allows you to write normal Python 
    functions, simply adding <code>@tool</code> decorator to declare it as such. 
    Strands reads your docstring and type hints to auto-generate the schema for you.
  </p>
  <p>
    Strands also handles the tool-call loop internally, which runs automatically 
    when your agent is called.
  </p>
</section>

<section class="blog-article-section">
  <h3>Install Packages & Model Setup</h3>
  <p>
    Install packages and import them. For your LLM model, you can use one from 
    AWS Bedrock or your own API key. AWS Strands works with both options.
  </p>

  <pre class="line-numbers"><code class="language-python">import os, json, requests

from strands import Agent, tool
from strands.models.litellm import LiteLLMModel

# set your key
os.environ['MISTRAL_API_KEY'] = ""  #@param

# LiteLLM lets you swap model providers without changing your tool code
model = LiteLLMModel(model_id="mistral/mistral-large-latest")
</code></pre>
</section>
```

---

## Prism.js Syntax Highlighting

Your template includes Prism.js for beautiful, automatic syntax highlighting with line numbers!

### How It Works

Just wrap your code in these tags:

```html
<pre class="line-numbers"><code class="language-python">
# Your code here - line numbers appear automatically!
def hello_world():
    print("Hello!")
</code></pre>
```

### Supported Languages

Change `language-python` to any of these:

- `language-python` - Python code
- `language-javascript` or `language-js` - JavaScript
- `language-typescript` or `language-ts` - TypeScript
- `language-bash` or `language-shell` - Terminal commands
- `language-json` - JSON data
- `language-html` - HTML markup
- `language-css` - CSS styles
- `language-java` - Java
- `language-c` - C
- `language-cpp` - C++
- `language-go` - Go
- `language-rust` - Rust
- `language-sql` - SQL queries
- `language-yaml` - YAML config files

### Customization

The template includes custom styling that matches your pink theme:
- Line numbers have a pink border and light pink background
- Code blocks have white backgrounds with rounded corners
- Inline code uses a light pink background
- All colors coordinate with your site's `#ffc0da` and `#ffe6f0` palette

### No Line Numbers?

If you don't want line numbers on a specific code block, just remove `class="line-numbers"`:

```html
<pre><code class="language-python">
# Code without line numbers
print("Simple example")
</code></pre>
```

## Tips and Best Practices

### Content Organization

1. **Start with context**: Begin with an introduction that explains what the post is about
2. **Use clear headings**: Break content into logical sections with descriptive h3/h4 headings
3. **Code explanations**: Always explain code before or after showing it
4. **Visual breaks**: Use lists, code blocks, and tables to break up long paragraphs
5. **Conclusion**: End with a summary or call-to-action

### Formatting

1. **Line breaks**: Keep paragraphs reasonably short (3-5 sentences) for readability
2. **Code comments**: Include helpful comments in your code examples
3. **Consistent style**: Use the same formatting approach for similar elements throughout
4. **Mobile-friendly**: The template is already responsive, but avoid super-wide tables

### Workflow

1. **Draft first**: Write your content in a text editor or markdown file first
2. **Convert to HTML**: Then copy sections into the template
3. **Preview often**: Open the HTML file in your browser frequently to check formatting
4. **Validate links**: Make sure all external links work before publishing

---

## Troubleshooting

### My code isn't formatting correctly
- Make sure you're using `<pre class="line-numbers"><code class="language-python">` tags
- The `line-numbers` class enables automatic line numbering
- Change `language-python` to match your programming language
- Check that indentation is preserved (spaces or tabs both work)
- Verify opening and closing tags match
- Make sure the Prism.js scripts are loaded at the bottom of your page

### Table looks broken
- Ensure every `<tr>` has the same number of `<td>` elements
- Check that all inline styles are present
- Verify the table structure: `<table>` → `<thead>` → `<tbody>`

### Links aren't styled correctly
- Add the inline style: `style="color: hotpink; text-decoration: underline;"`
- Include `target="_blank"` to open in new tab

### Section spacing looks off
- Each section should be wrapped in `<section class="blog-article-section">`
- Paragraphs should be in `<p>` tags
- Headings should use `<h3>` for main sections, `<h4>` for subsections

---

## Need Help?

If you run into issues or want to add new features to the template:
1. Check the existing CSS in `style.css` for available classes
2. Look at the template comments for guidance
3. Reference your other HTML files for examples

Happy blogging!
