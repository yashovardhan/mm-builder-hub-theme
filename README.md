# MetaMask Builder Hub - Discourse Theme

A dark mode Discourse theme for the MetaMask Developer Builder Hub, featuring a custom homepage with configurable category navigation.

## Features

- **Dark Mode**: Uses MetaMask's brand color palette with dark backgrounds
- **Custom Homepage**: Hero section with configurable category grid (6-8 categories)
- **Minimal Design**: Hides default Discourse elements (sidebar, badges, suggested topics)
- **Responsive**: Mobile-optimized layouts
- **Fully Configurable**: Categories configured via Discourse admin panel

## Color Scheme

- **Light Orange**: #FFA680
- **Orange**: #FF5C16 (Primary accent)
- **Dark Orange**: #661800
- **Light Purple**: #EAC2FF
- **Purple**: #d075ff
- **Dark Purple**: #3d065f (Code blocks)
- **Light Green**: #E5FFC3
- **Green**: #BAF24A
- **Dark Green**: #013330
- **Light Blue**: #CCE7FF
- **Blue**: #89B0FF
- **Dark Blue**: #190066

## Installation

1. Download or clone this repository
2. In Discourse admin panel: **Admin → Customize → Themes → Import**
3. Upload the theme files or connect via Git
4. Activate the theme

## Configuration

Navigate to **Admin → Customize → Themes → MetaMask Builder Hub → Settings**

### Homepage Settings

- **Enable custom homepage**: Toggle to show/hide the custom homepage
- **Hero title**: Main heading on homepage (default: "Build the future of Web3 with MetaMask")
- **Hero subtitle**: Subheading text (default: "Join the MetaMask developer community")
- **Homepage categories**: Configure categories in this format (one per line):
  ```
  category-slug|icon|Description text
  ```

### Example Category Configuration

```
getting-started|🚀|Begin your Web3 development journey
sdk-apis|📦|Integrate MetaMask into your dApp
snaps|🔌|Extend wallet functionality with Snaps
security|🔒|Best practices for secure development
smart-contracts|📝|Deploy and interact with contracts
showcase|💡|Share your MetaMask projects
troubleshooting|🛠️|Get help with common issues
announcements|📢|Latest updates and news
```

### Category Format

- **slug**: Discourse category slug (must match existing category)
- **icon**: Emoji or text icon (e.g., 🚀, 📦, or custom text)
- **description**: Short description shown on card (optional)

## Hidden Elements

The theme automatically hides:
- Sidebar navigation
- Categories sidebar widget
- Suggested topics
- User badges/trust levels
- Default header navigation items

## File Structure

```
mm-builder-hub-theme/
├── about.json              # Theme metadata
├── settings.yml            # Configurable settings
├── locales/
│   └── en.yml             # Setting descriptions
├── common/
│   ├── common.scss        # Base styles and colors
│   └── header.html        # Custom header
├── desktop/
│   └── desktop.scss       # Desktop styles and grid
├── mobile/
│   └── mobile.scss        # Mobile responsive styles
└── javascripts/
    └── discourse/
        ├── connectors/
        │   └── above-main-container/
        │       └── homepage-grid.hbs    # Homepage template
        └── initializers/
            └── homepage-setup.js        # Category rendering logic
```

## Development

The theme uses:
- SCSS for styling
- Handlebars templates for homepage
- JavaScript for dynamic category rendering
- Discourse's connector system for homepage injection

## License

[Add your license here]

## Support

For issues or questions, please open an issue in the repository.
