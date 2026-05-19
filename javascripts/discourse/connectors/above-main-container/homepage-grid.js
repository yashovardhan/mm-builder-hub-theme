import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import { ajax } from "discourse/lib/ajax";

export default class HomepageGrid extends Component {
  @service router;
  
  @tracked categories = null;
  @tracked isLoading = false;
  
  constructor() {
    super(...arguments);
    this._onRouteChange = () => this.loadCategories();
    if (typeof this.router.on === "function") {
      this.router.on("routeDidChange", this._onRouteChange);
    }
    this.loadCategories();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    if (typeof this.router.off === "function") {
      this.router.off("routeDidChange", this._onRouteChange);
    }
  }
  
  get themeSettings() {
    // Settings are provided via args or as a global
    return this.args.themeSettings || (typeof settings !== 'undefined' ? settings : {});
  }
  
  get heroRoutes() {
    const raw =
      this.themeSettings.hero_routes ||
      "discovery.categories,discovery.latest,discovery.top";
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  get shouldDisplayHero() {
    const enabled = this.themeSettings.enable_custom_homepage;
    return (
      enabled && this.heroRoutes.includes(this.router.currentRouteName)
    );
  }

  get shouldDisplayCategoryGrid() {
    return (
      this.shouldDisplayHero &&
      this.router.currentRouteName === "discovery.categories"
    );
  }
  
  get heroTitle() {
    return this.themeSettings.hero_title || "Build the future of Web3 with MetaMask";
  }
  
  get heroSubtitle() {
    return this.themeSettings.hero_subtitle || "Join the MetaMask developer community and start building today";
  }
  
  async loadCategories() {
    if (!this.shouldDisplayCategoryGrid) {
      this.categories = [];
      this.isLoading = false;
      return;
    }
    
    this.isLoading = true;
    
    try {
      const categorySettings = this.themeSettings.homepage_categories || "";
      const categoryLines = categorySettings.split("\n").filter(line => line.trim());
      
      if (categoryLines.length === 0) {
        this.categories = [];
        this.isLoading = false;
        return;
      }
      
      // Fetch categories from Discourse
      const result = await ajax("/categories.json");
      const allCategories = result.category_list?.categories || [];
      
      // Parse and match configured categories
      const homepageCategories = categoryLines.map(line => {
        const [slug, icon, description] = line.split("|").map(s => s.trim());
        
        // Find matching category
        const category = allCategories.find(cat => cat.slug === slug);
        
        if (category) {
          return {
            id: category.id,
            name: category.name,
            slug: category.slug,
            color: category.color,
            text_color: category.text_color,
            description: description || category.description || "",
            icon: icon || "📁",
            topic_count: category.topic_count,
            post_count: category.post_count,
            url: `/c/${category.slug}/${category.id}`
          };
        }
        
        return null;
      }).filter(Boolean);
      
      this.categories = homepageCategories;
    } catch (error) {
      console.error("Error loading homepage categories:", error);
      this.categories = [];
    } finally {
      this.isLoading = false;
    }
  }
}
