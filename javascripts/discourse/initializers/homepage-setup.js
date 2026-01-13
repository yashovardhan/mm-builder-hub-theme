import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "mm-homepage-setup",
  initialize(container) {
    withPluginApi("0.8.31", (api) => {
      const siteSettings = container.lookup("service:site-settings");
      
      // Only run on homepage
      if (window.location.pathname === "/" && siteSettings.homepage_enabled) {
        api.onPageChange(() => {
          renderHomepage(container);
        });
        
        // Run immediately if already on homepage
        setTimeout(() => renderHomepage(container), 100);
      }
    });
  },
};

function renderHomepage(container) {
  const siteSettings = container.lookup("service:site-settings");
  const store = container.lookup("service:store");
  
  const containerEl = document.getElementById("mm-homepage-container");
  if (!containerEl) return;
  
  const categoriesSetting = siteSettings.homepage_categories || "";
  const categoryItems = [];
  
  if (categoriesSetting) {
    const lines = categoriesSetting.split("\n").filter(line => line.trim());
    
    lines.forEach((line) => {
      const parts = line.split("|").map(p => p.trim());
      if (parts.length >= 2) {
        const slug = parts[0];
        const icon = parts[1] || "📁";
        const description = parts[2] || "";
        
        // Try to get category from Discourse
        let title = slug;
        if (store) {
          const categories = store.findAll("category");
          const category = categories.find(c => c.slug === slug);
          if (category) {
            title = category.name;
          }
        }
        
        // Fallback: capitalize slug
        if (title === slug) {
          title = slug.split("-").map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(" ");
        }
        
        categoryItems.push({
          slug,
          icon,
          title,
          description
        });
      }
    });
  }
  
  // Render homepage HTML
  const heroTitle = siteSettings.hero_title || "Build the future of Web3 with MetaMask";
  const heroSubtitle = siteSettings.hero_subtitle || "Join the MetaMask developer community";
  
  let html = `
    <div class="mm-homepage-hero">
      <div class="mm-hero-content">
        <h1 class="mm-hero-title">${heroTitle}</h1>
        <p class="mm-hero-subtitle">${heroSubtitle}</p>
      </div>
    </div>
  `;
  
  if (categoryItems.length > 0) {
    html += `
      <div class="mm-category-grid-container">
        <div class="mm-category-grid">
    `;
    
    categoryItems.forEach(item => {
      html += `
        <a href="/c/${item.slug}" class="mm-category-card">
          <div class="mm-category-icon">${item.icon}</div>
          <h3 class="mm-category-title">${item.title}</h3>
          <p class="mm-category-description">${item.description}</p>
        </a>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  }
  
  containerEl.innerHTML = html;
}
