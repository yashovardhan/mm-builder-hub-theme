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
    this.loadCategories();
  }

  get themeSettings() {
    return this.args.themeSettings || (typeof settings !== "undefined" ? settings : {});
  }

  get shouldDisplay() {
    const routeName = this.router.currentRouteName;
    const enabled = this.themeSettings.enable_custom_homepage;
    return routeName === "discovery.categories" && enabled;
  }

  get hasCategories() {
    return Array.isArray(this.categories) && this.categories.length > 0;
  }

  get heroTitle() {
    return this.themeSettings.hero_title || "Build the future of Web3 with MetaMask";
  }

  get heroSubtitle() {
    return this.themeSettings.hero_subtitle || "Join the MetaMask developer community and start building today";
  }

  async loadCategories() {
    if (!this.shouldDisplay) {
      this.categories = [];
      return;
    }

    this.isLoading = true;

    try {
      const categorySettings = this.themeSettings.homepage_categories || "";
      const categoryLines = categorySettings.split("\n").filter((line) => line.trim());

      if (categoryLines.length === 0) {
        this.categories = [];
        this.isLoading = false;
        return;
      }

      const result = await ajax("/categories.json");
      const allCategories = result.category_list?.categories || [];

      const homepageCategories = categoryLines
        .map((line) => {
          const [slug, icon, description] = line.split("|").map((s) => s.trim());

          const category = allCategories.find((cat) => cat.slug === slug);

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
              url: `/c/${category.slug}/${category.id}`,
            };
          }

          return null;
        })
        .filter(Boolean);

      this.categories = homepageCategories;
    } catch (error) {
      console.error("Error loading homepage categories:", error);
      this.categories = [];
    } finally {
      this.isLoading = false;
    }
  }

  <template>
    {{#if this.shouldDisplay}}
      {{#if this.isLoading}}
        <div class="loading-container">
          <div class="spinner"></div>
        </div>
      {{else if this.hasCategories}}
        <div class="custom-search-banner-wrap">
          <div class="custom-search-banner-content">
            {{#if this.heroTitle}}
              <h1 class="custom-search-banner-headline">{{this.heroTitle}}</h1>
            {{/if}}
            {{#if this.heroSubtitle}}
              <p>{{this.heroSubtitle}}</p>
            {{/if}}
          </div>
        </div>

        <div class="homepage-categories-wrapper">
          <div class="category-boxes">
            {{#each this.categories as |category|}}
              <div class="category-box">
                <div class="category-box-inner">
                  <a href={{category.url}} class="category-details">
                    <div class="category-icon">{{category.icon}}</div>
                    <h3 class="category-title">
                      <span class="category-title-link">{{category.name}}</span>
                    </h3>
                    {{#if category.description}}
                      <p class="category-description">{{category.description}}</p>
                    {{/if}}
                  </a>
                </div>
              </div>
            {{/each}}
          </div>
        </div>
      {{/if}}
    {{/if}}
  </template>
}
