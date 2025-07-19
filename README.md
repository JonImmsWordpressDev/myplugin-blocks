# MyPlugin Blocks Starter

This is a boilerplate WordPress plugin for building **custom Gutenberg blocks**, with support for both **static** and **dynamic** blocks.

## 🧱 Features

- Supports multiple blocks under `/blocks/`
- Auto-registers blocks using `block.json`
- Includes:
  - `alert-box`: static block
  - `latest-posts`: dynamic block rendered with PHP
- Webpack build setup with SCSS and JS support

## 🗂 Directory Structure

```
myplugin-blocks/
├── blocks/
│   ├── alert-box/
│   │   ├── block.json
│   │   ├── edit.js
│   │   ├── save.js
│   │   └── style.scss
│   └── latest-posts/
│       ├── block.json
│       ├── index.js
│       ├── render.php
│       └── style.scss
├── build/
├── plugin.php
├── webpack.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build assets:

   ```bash
   npm run build
   ```

3. Copy the `myplugin-blocks` folder to your WordPress `/wp-content/plugins/` directory.

4. Activate the plugin from the WP Admin.

## 🛠 Requirements

- Node.js (v16+ recommended)
- WordPress 6.0+ with Gutenberg support
- Webpack + Babel

## ✅ Notes

- Use `register_block_type()` with `block.json` to register blocks.
- Dynamic blocks must include a `render.php` file referenced in `block.json`.
