# D Edwards Theme

A custom Gutenberg block theme with TailwindCSS integration and custom blocks for portfolio management.

## Installation

1. Upload the theme to your WordPress site's `wp-content/themes/` directory
2. Navigate to the theme directory in your terminal
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start development with file watching (both TailwindCSS and blocks):

```bash
npm run dev
```

This will watch for changes in:

- CSS source files and compile TailwindCSS
- Block JavaScript files and rebuild blocks

## Build for Production

To build minified CSS and blocks for production:

```bash
npm run build
```

## Custom Post Type: Work

The theme includes a custom post type called "Work" for managing portfolio items.

### Features:

- **Custom Fields:**

  - Material (e.g., "Bronze", "Marble")
  - Year (e.g., "2024")
  - Dimensions (e.g., "24 x 18 x 12 inches")
  - Edition (e.g., "Edition of 15")

- **Taxonomies:**
  - Work Categories (hierarchical)
  - Work Tags (non-hierarchical)

### Adding Work Items:

1. Go to **Portfolio → Add New** in WordPress admin
2. Add title, content, and featured image
3. Fill in Work Details (material, year, dimensions, edition)
4. Assign categories and tags
5. Publish

## Custom Gutenberg Blocks

### 1. Hero Section Block

**Block Name:** `dedwards/hero-section`

A customizable hero section with:

- Background image upload
- Editable heading and subheading
- Call-to-action button with custom URL
- Adjustable overlay opacity
- Configurable minimum height

**Usage:**

1. Add block in editor: `/hero-section`
2. Upload background image
3. Edit text content inline
4. Configure settings in the sidebar

**Attributes:**

- Heading text
- Subheading text
- Button text & URL
- Background image
- Overlay opacity (0-100)
- Min height (50-100vh)

### 2. Work Grid Block

**Block Name:** `dedwards/work-grid`

Display portfolio work items in a customizable grid.

**Features:**

- Adjustable number of posts (1-12)
- Column count (1-4)
- Category filter
- Order by date, title, or random
- Toggle display options:
  - Show/hide excerpt
  - Show/hide material
  - Show/hide year

**Usage:**

1. Add block in editor: `/work-grid`
2. Configure grid settings in sidebar:
   - Number of posts
   - Columns
   - Category filter
   - Display options
3. Block automatically queries and displays work items

## Templates

### Front Page Template

[templates/front-page.html](templates/front-page.html) - Custom homepage layout

### Single Work Template

[templates/single-work.html](templates/single-work.html) - Individual work item display with:

- Featured image
- Work details
- Categories and tags
- Related works section

## Theme Structure

```
dedwards/
├── assets/
│   └── css/
│       ├── src/
│       │   └── style.css          # TailwindCSS source
│       └── style.css               # Compiled CSS
├── blocks/
│   ├── hero-section/
│   │   ├── block.json             # Block configuration
│   │   └── index.js               # Block JavaScript
│   └── work-grid/
│       ├── block.json
│       ├── index.js
│       └── render.php             # Server-side rendering
├── build/                          # Compiled block assets
├── parts/
│   ├── header.html
│   ├── header-blend.html          # Navigation with blend mode
│   └── footer.html
├── patterns/                       # Block patterns
├── templates/
│   ├── index.html
│   ├── single.html
│   ├── page.html
│   ├── front-page.html
│   └── single-work.html
├── functions.php                   # Theme functions
├── theme.json                      # Theme configuration
├── tailwind.config.js              # TailwindCSS config
└── package.json                    # Dependencies

```

## Styling

### TailwindCSS Classes

All TailwindCSS utility classes are available. Custom configuration includes:

- Stone color palette (50-900)
- Inter and Playfair Display fonts
- Custom animations (fade-in)
- Mix-blend-difference utilities

### Custom CSS Classes

- `.nav-blend-difference` - Mix blend mode for navigation
- `.animate-fade-in` - Fade-in animation
- `.pointer-events-none/auto` - Pointer event controls

## Block Development

### Creating New Blocks

1. Create block directory: `blocks/your-block/`
2. Add `block.json` configuration
3. Create `index.js` for editor interface
4. Optional: Add `render.php` for server-side rendering
5. Register block in [functions.php](functions.php)

### Block Registration

Blocks are registered in `functions.php`:

```php
register_block_type( get_template_directory() . '/blocks/your-block' );
```

## License

GPL-2.0-or-later
