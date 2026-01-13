import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "mm-homepage-setup",
  initialize() {
    withPluginApi("0.8.31", (api) => {
      api.onPageChange(() => {
        if (window.location.pathname === "/") {
          setTimeout(renderHomepage, 500);
        }
      });
      
      if (window.location.pathname === "/") {
        setTimeout(renderHomepage, 500);
      }
    });
  },
};

function renderHomepage() {
  const containerEl = document.getElementById("mm-homepage-container");
  if (!containerEl) return;
  
  // Get settings from Discourse's theme settings
  const settings = getThemeSettings();
  
  const enabled = settings.homepage_enabled !== false;
  if (!enabled) {
    containerEl.innerHTML = "";
    return;
  }
  
  const heroTitle = settings.hero_title || "Build the future of Web3 with MetaMask";
  const heroSubtitle = settings.hero_subtitle || "Join the MetaMask developer community";
  const categoriesSetting = settings.homepage_categories || "";
  
  let html = `
    <div class="mm-homepage-hero">
      <div class="mm-hero-content">
        <h1 class="mm-hero-title">${escapeHtml(heroTitle)}</h1>
        <p class="mm-hero-subtitle">${escapeHtml(heroSubtitle)}</p>
      </div>
    </div>
  `;
  
  const categoryItems = parseCategories(categoriesSetting);
  
  if (categoryItems.length > 0) {
    html += '<div class="mm-category-grid-container"><div class="mm-category-grid">';
    categoryItems.forEach(item => {
      html += `
        <a href="/c/${escapeHtml(item.slug)}" class="mm-category-card">
          <div class="mm-category-icon">${escapeHtml(item.icon)}</div>
          <h3 class="mm-category-title">${escapeHtml(item.title)}</h3>
          <p class="mm-category-description">${escapeHtml(item.description)}</p>
        </a>
      `;
    });
    html += '</div></div>';
  }
  
  containerEl.innerHTML = html;
}

function getThemeSettings() {
  // Try to get settings from meta tag (Discourse injects theme settings)
  const metaTag = document.querySelector('meta[name="discourse-theme-settings"]');
  if (metaTag) {
    try {
      return JSON.parse(metaTag.content);
    } catch (e) {
      console.error("Failed to parse theme settings", e);
    }
  }
  
  // Fallback: try to get from window object
  if (window.themeSettings) {
    return window.themeSettings;
  }
  
  // Try to get from data attribute on container
  const containerEl = document.getElementById("mm-homepage-container");
  if (containerEl && containerEl.dataset.themeSettings) {
    try {
      return JSON.parse(containerEl.dataset.themeSettings);
    } catch (e) {
      console.error("Failed to parse settings from data attribute", e);
    }
  }
  
  // Default fallback
  return {
    homepage_enabled: true,
    hero_title: "Build the future of Web3 with MetaMask",
    hero_subtitle: "Join the MetaMask developer community",
    homepage_categories: ""
  };
}

function parseCategories(setting) {
  if (!setting) return [];
  
  return setting.split("\n")
    .filter(line => line.trim())
    .map(line => {
      const parts = line.split("|").map(p => p.trim());
      if (parts.length < 2) return null;
      
      const slug = parts[0];
      const icon = parts[1] || "📁";
      const description = parts[2] || "";
      const title = slug.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      return { slug, icon, title, description };
    })
    .filter(item => item !== null);
}

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
