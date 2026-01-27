# Theme Setup Complete - Ready for Testing

## ✅ Completed Steps

1. **Ruby 3.2.10 Installed** - Successfully installed via rbenv
2. **Local Ruby Version Set** - Project now uses Ruby 3.2.10
3. **discourse_theme Gem Installed** - Version 2.1.6 ready to use

## 🚀 Next Steps: Connect to Theme Creator

The theme watcher is ready to run, but requires your Theme Creator API key.

### Step 1: Get Your API Key

1. Go to **https://discourse.theme-creator.io**
2. Log in or create an account
3. Navigate to: **Admin → API Keys → New API Key**
4. Copy the generated API key

### Step 2: Run Theme Watcher

Open a terminal in the project directory and run:

```bash
cd /Users/yashovardhanagrawal/GitHub/mm-builder-hub-theme
discourse_theme watch .
```

When prompted, enter:
- **Discourse URL:** `https://discourse.theme-creator.io`
- **API Key:** [paste your key from Step 1]
- **Create new theme:** Yes

### Step 3: Preview Your Theme

After connecting, the CLI will output:
```
Preview: https://discourse.theme-creator.io/?preview_theme_id=XXX
Manage: https://discourse.theme-creator.io/admin/customize/themes/XXX
```

Open the preview URL in your browser to see your theme!

## 🔍 What to Test

### Theme Settings
- Go to **Admin → Customize → Themes → [Your Theme] → Settings**
- Verify these settings appear:
  - `enable_custom_homepage` (boolean)
  - `hero_title` (string)
  - `hero_subtitle` (string)
  - `homepage_categories` (list)

### Homepage
- Visit the homepage (`/`)
- Check if hero section displays with title/subtitle
- Verify category grid appears (if categories are configured)
- Check that category cards have clipped corners and accent bars

### Styling
- Verify dark mode colors (black backgrounds, green accents)
- Check MetaMask font (Euclid Circular B) loads
- Test responsive design (resize browser window)
- Verify buttons, links, and cards have hover effects

### Browser Console
- Open browser DevTools (F12)
- Check Console tab for JavaScript errors
- Look for any missing category data or API errors

## 🐛 Debugging Tips

### Categories Not Showing?
1. Configure `homepage_categories` in theme settings
2. Format: `slug|icon|description` (one per line)
3. Ensure category slugs match existing categories in Theme Creator
4. Check browser console for errors

### Styling Not Applied?
1. Clear browser cache (Cmd+Shift+R on Mac)
2. Ensure theme is set as default in settings
3. Check that SCSS files uploaded correctly

### JavaScript Errors?
1. Check browser console for specific error messages
2. Verify `homepage-setup.js` file exists and uploaded
3. Check that connector template `homepage-grid.hbs` exists

## 📁 Files Created

All theme files are in place:
- ✅ `settings.yml` - Theme configuration
- ✅ `javascripts/discourse/initializers/homepage-setup.js` - Homepage logic
- ✅ `javascripts/discourse/connectors/above-main-container/homepage-grid.hbs` - Template
- ✅ `common/header.html` - Header customizations
- ✅ `locales/en.yml` - Setting descriptions (updated)

## 🔄 Live Development

Once `discourse_theme watch` is running:
- Any file changes automatically sync to Theme Creator
- Refresh browser to see updates
- No need to manually upload files

## 📝 Example Category Configuration

In theme settings, configure `homepage_categories` like this:

```
getting-started|🚀|Begin your Web3 development journey
sdk-apis|📦|Integrate MetaMask into your dApp
snaps|🔌|Extend wallet functionality with Snaps
security|🔒|Best practices for secure development
smart-contracts|📝|Deploy and interact with contracts
showcase|💡|Share your MetaMask projects
```

**Format:** `category-slug|icon|description`
- The slug must match an existing category in Theme Creator
- Icon can be emoji or text
- Description is optional but recommended

## ✨ Ready to Go!

Everything is set up and ready. Just get your API key and run `discourse_theme watch .` to start testing!
