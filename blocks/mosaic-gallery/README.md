# Mosaic Gallery Block

A dynamic mosaic gallery block for displaying artwork in an asymmetrical grid layout.

## Features

- **Multiple Layout Patterns**: Choose between Dynamic Mosaic, Uniform Grid, or Featured First layouts
- **Responsive Design**: Adapts beautifully to different screen sizes
- **Hover Effects**: Smooth image scaling and overlay animations
- **Customizable Content**: Toggle titles and metadata display
- **Category Filtering**: Filter works by category
- **Flexible Grid**: Supports various aspect ratios and sizes

## Block Settings

### Gallery Settings
- **Heading**: Main gallery title (default: "Gallery")
- **Subheading**: Gallery description (default: "Selected Works")
- **Number of Works**: 4-16 works to display (default: 8)
- **Category Filter**: Filter by work category

### Layout Options
- **Mosaic Pattern**: 
  - Dynamic Mosaic: Varied sizes creating visual interest
  - Uniform Grid: All items same size
  - Featured First: Large featured piece followed by smaller items
- **Show Titles**: Display work titles on hover
- **Show Metadata**: Display material/edition info on hover

## Usage

1. Add the "Mosaic Gallery" block to your page
2. Configure the settings in the block inspector
3. Choose your preferred mosaic pattern
4. Toggle title and metadata display as needed
5. Set the number of works and category filter

## Frontend Output

The block renders a responsive mosaic grid with:
- Smooth hover effects
- Clickable links to individual work pages
- Elegant typography
- Consistent with the site's design system

## Technical Notes

- Uses CSS Grid for layout
- Built with WordPress Gutenberg block editor
- Integrates with custom 'work' post type
- Respects work categories taxonomy
- Fully responsive design with mobile optimizations