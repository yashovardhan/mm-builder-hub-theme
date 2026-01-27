# Testing Guide for MetaMask Builder Hub Theme

## Theme Files Status ✅

All required theme files have been created:

- ✅ `settings.yml` - Homepage configuration
- ✅ `javascripts/discourse/initializers/homepage-setup.js` - Category rendering logic
- ✅ `javascripts/discourse/connectors/above-main-container/homepage-grid.hbs` - Homepage template
- ✅ `common/header.html` - Custom header
- ✅ `locales/en.yml` - Setting descriptions (updated)

## Ruby Version Requirement ⚠️

The `discourse_theme` CLI requires **Ruby 3.2 or higher**.

**Current system Ruby version:** 2.7.5

### Option 1: Upgrade Ruby (Recommended)

Using rbenv:
```bash
# Install rbenv if not installed
brew install rbenv

# Install Ruby 3.2+
rbenv install 3.2.2

# Set as local version for this project
cd /Users/yashovardhanagrawal/GitHub/mm-builder-hub-theme
rbenv local 3.2.2

# Verify
ruby -v  # Should show 3.2.2

# Install discourse_theme gem
gem install discourse_theme
```

Using RVM:
```bash
# Install RVM if not installed
\curl -sSL https://get.rvm.io | bash

# Install Ruby 3.2+
rvm install 3.2.2

# Use it
rvm use 3.2.2

# Install gem
gem install discourse_theme
```

### Option 2: Use Theme Creator Without CLI

You can manually upload the theme to Theme Creator:

1. **Create a ZIP file:**
   ```bash
   cd /Users/yashovardhanagrawal/GitHub/mm-builder-hub-theme
   zip -r mm-builder-hub-theme.zip . -x "*.git*" -x "*.DS_Store"
   ```

2. **Upload to Theme Creator:**
   - Go to https://discourse.theme-creator.io
   - Log in or create account
   - Navigate to **Admin → Customize → Themes → Import**
   - Select "From file" and upload the ZIP

3. **Configure Categories:**
   - Go to **Admin → Customize → Themes → [Your Theme] → Settings**
   - Enable custom homepage
   - Configure the `homepage_categories` setting with your category slugs

## Testing with discourse_theme CLI (After Ruby Upgrade)

### Step 1: Register on Theme Creator

Visit https://discourse.theme-creator.io and create an account.

### Step 2: Generate API Key

1. Go to Theme Creator admin
2. Navigate to: **Settings → API Keys → New API Key**
3. Copy the generated key

### Step 3: Initialize Theme Sync

```bash
cd /Users/yashovardhanagrawal/GitHub/mm-builder-hub-theme
discourse_theme watch .
```

When prompted:
- **URL:** `https://discourse.theme-creator.io`
- **API Key:** [paste your key]
- **Create new theme:** Yes

### Step 4: Live Preview

The CLI will output a preview URL:
```
Preview: https://discourse.theme-creator.io/?preview_theme_id=XXX
```

Any file changes will automatically sync and refresh in your browser.

## What to Test

### Visual Elements
- [ ] Dark mode colors (black backgrounds, green accents)
- [ ] Clipped corners on cards and buttons
- [ ] MetaMask font (Euclid Circular B)
- [ ] Accent bars (orange, green, purple, blue rotation)

### Homepage
- [ ] Hero section displays with configured title/subtitle
- [ ] Category grid shows configured categories
- [ ] Category cards are clickable
- [ ] Icons display correctly

### Responsive Design
- [ ] Desktop layout (1440px+ screens)
- [ ] Tablet layout (768px - 1440px)
- [ ] Mobile layout (< 768px)
- [ ] Touch targets are at least 44x44px on mobile

### Interactive Elements
- [ ] Buttons have hover states
- [ ] Links change color on hover
- [ ] Category cards lift on hover (desktop)
- [ ] Navigation works correctly

## Configuration Example

In Theme Settings (`homepage_categories`):

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

**Format:** `category-slug|icon|description`
- **category-slug:** Must match an existing Discourse category
- **icon:** Emoji or text (e.g., 🚀 or "START")
- **description:** Short text shown on the card

## Troubleshooting

### Categories Not Showing
1. Verify category slugs match exactly in Discourse
2. Check that categories exist in Theme Creator
3. Look at browser console for JavaScript errors

### Styling Issues
1. Clear browser cache (Cmd+Shift+R on Mac)
2. Check that theme is set as default in settings
3. Verify SCSS files were uploaded correctly

### API Connection Issues
1. Verify API key is valid
2. Check Theme Creator is accessible
3. Ensure `discourse_theme` CLI has correct permissions

## Next Steps

After testing the theme:

1. **Create GitHub Repository Issues** for any bugs found
2. **Document Theme Settings** in the main README
3. **Take Screenshots** of the theme in action
4. **Deploy to Production** Discourse instance when ready

## Support

For issues with:
- **Theme functionality:** Check browser console and Discourse logs
- **discourse_theme CLI:** Visit https://github.com/discourse/discourse_theme
- **Theme Creator:** Check https://meta.discourse.org/t/discourse-theme-creator/103428
