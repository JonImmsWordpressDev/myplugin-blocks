# MyPlugin Blocks

A professional WordPress plugin for building custom Gutenberg blocks with support for both **static** and **dynamic** blocks.

## 🧱 Features

- **Multiple Block Support**: Modular architecture for multiple blocks
- **Auto-Registration**: Automatically registers blocks using `block.json` API v3
- **Security Hardened**: Input validation, output escaping, and secure file handling
- **Internationalization**: Full i18n support with text domain
- **Modern Build Process**: Webpack 5 with Babel, SCSS, and CSS extraction
- **Development Tools**: Watch mode, source maps, and hot reloading support

### Included Blocks

1. **Alert Box** (static block)
   - Customizable alert types (info, success, warning, error)
   - Optional dismiss functionality
   - Rich text editing
   - Color and spacing controls

2. **Latest Posts** (dynamic block)
   - Displays recent posts with live preview
   - Configurable post count (1-10)
   - Toggle featured images, dates, authors, excerpts
   - Responsive design
   - Server-side rendering with PHP

## 🗂 Directory Structure

```
myplugin-blocks/
├── blocks/
│   ├── alert-box/
│   │   ├── block.json        # Block metadata
│   │   ├── index.js          # Block registration
│   │   ├── edit.js           # Editor component
│   │   ├── save.js           # Frontend save function
│   │   └── style.scss        # Block styles
│   └── latest-posts/
│       ├── block.json        # Block metadata
│       ├── index.js          # Editor component with preview
│       ├── render.php        # Server-side rendering
│       └── style.scss        # Block styles
├── build/                    # Compiled assets (auto-generated)
├── .babelrc                  # Babel configuration
├── .gitignore               # Git ignore rules
├── plugin.php               # Main plugin file
├── webpack.config.js        # Webpack configuration
├── package.json             # Dependencies and scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js v16+ and npm v8+
- WordPress 6.0+ with Gutenberg support
- PHP 7.4+

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build for production:**

   ```bash
   npm run build
   ```

   Or for development with source maps:

   ```bash
   npm run dev
   ```

3. **Watch mode** (auto-rebuild on file changes):

   ```bash
   npm run watch
   # or
   npm start
   ```

4. **Deploy to WordPress:**

   Copy the entire plugin folder to `/wp-content/plugins/` and activate from WP Admin.

## 🔧 Development

### Available Scripts

- `npm run build` - Production build (minified, optimized)
- `npm run dev` - Development build (with source maps)
- `npm run watch` - Watch mode for development
- `npm start` - Alias for watch mode

### Adding New Blocks

1. Create a new folder under `blocks/`
2. Add `block.json` with block metadata
3. Create `index.js` for block registration
4. For static blocks: add `edit.js` and `save.js`
5. For dynamic blocks: add `render.php`
6. Add entry point in `webpack.config.js`

### Code Quality

- **Security**: All output is properly escaped (`esc_html`, `esc_url`, `wp_kses_post`)
- **Input Validation**: Uses `absint`, `sanitize_text_field` for attributes
- **WordPress Coding Standards**: Follows WordPress PHP and JS standards
- **Accessibility**: Proper ARIA labels and semantic HTML

## 📋 What Was Improved

### Critical Fixes

1. **Security Vulnerabilities**:
   - Replaced `glob()` with `scandir()` for safer directory scanning
   - Added ABSPATH check to prevent direct file access
   - Input sanitization and output escaping throughout

2. **Missing Implementations**:
   - All placeholder files now have complete implementations
   - Functional block.json files with proper schema
   - Full React components for editor experience
   - Server-side rendering for dynamic block

3. **Build System**:
   - Added missing Babel configuration
   - Webpack externals for WordPress globals
   - MiniCssExtractPlugin for proper CSS extraction
   - Source maps for development
   - Clean build directory on each build

4. **WordPress Standards**:
   - Complete plugin headers
   - Text domain and i18n support
   - Version constants and plugin URLs
   - Proper hook usage

5. **Developer Experience**:
   - Watch mode for development
   - Proper gitignore
   - Updated dependencies
   - Better project structure

## 📖 Documentation

### Plugin Headers

The plugin includes all required WordPress plugin headers:
- Version tracking
- Minimum WordPress/PHP requirements
- License information
- Text domain for translations

### Block Registration

Blocks are automatically discovered and registered from the `/blocks/` directory. Each block must have a `block.json` file following the WordPress block.json schema.

### Internationalization

All user-facing strings use the `__()` function with the `myplugin-blocks` text domain for translation support.

## 🔐 Security

- No direct file access without ABSPATH check
- Sanitized inputs using WordPress functions
- Escaped outputs in PHP templates
- No eval() or unsafe dynamic code execution
- Secure WP_Query usage with proper arguments

## 📄 License

GPL v2 or later

## 🤝 Contributing

When adding new blocks:
1. Follow WordPress coding standards
2. Use proper escaping functions
3. Add text domain to all translatable strings
4. Test in both editor and frontend
5. Ensure responsive design
